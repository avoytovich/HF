import React, { Component } from 'react';
import get from 'lodash/get';
import keys from 'lodash/keys';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Map,
  FeatureGroup,
  ZoomControl,
  ImageOverlay,
} from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

import {
  dispatchBodyModelWired,
  T,
  clearBodyAreaWired,
  getBodyAreaById,
  getAllSideAreasWired,
  deletePolygonWired,
} from '../../../../../actions'

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

export const GET_IMAGE = 'imageOverlay.leafletElement._image';

// to move zero point fom bottom left to top left
L.CRS.Simple = L.extend({}, L.CRS.Simple, {
  projection: L.Projection.LonLat,
  transformation: new L.Transformation(1, 0, 1, 0), // this line is changed!!
});

class BodyModel extends Component {
  state = {
    bounds: [1000, 1000],
  };

  componentWillMount() {
    getAllSideAreasWired(this.props.side, this.props.id)
      .then(() => this._drawExistingPolygons());
    if (this.props.id) {
      getBodyAreaById('diagnostics', 'areas', this.props.id).then(() => {
        this._drawingNewOrEditingPolygons();
        this._onChange();
      });
    }
  }

  componentDidMount() {
    this._drawingNewOrEditingPolygons();
  }

  componentDidUpdate({ url }) {
    if (url !== this.props.url) {
      this.layerContainer().clearLayers();
      this._drawingNewOrEditingPolygons();
      this._drawExistingPolygons();
      getAllSideAreasWired(this.props.side, this.props.id)
        .then(() => this._drawExistingPolygons());
      this._onChange();
    }
  }

  componentWillUnmount() {
    clearBodyAreaWired();
  }

  _editableFG = null;

  _onFeatureGroupReady = (reactFGref) => this._editableFG = reactFGref;

  layerContainer = () => get(this.editControl, 'context.layerContainer');

  _onMounted = () => {
    this._updateBounds();
    this._onChange();
  };

  _drawExistingPolygons() {
    setTimeout(() => {
      const {
        bodyModelReducer: {
          existingPolygons = [],
        },
        sex,
        side,
      } = this.props;
      existingPolygons.forEach(existingPolygon => {
        const currentPolygons = [get(existingPolygon, `${side}.${sex}`, false)];
        if (currentPolygons[0]) {
          const tooltip = existingPolygon.title;
          const layer = new L.Polygon(currentPolygons).bindTooltip(tooltip, {
            sticky: true // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
          });

          layer.setStyle({ color: 'gray', fillColor: 'gray' });
          this.layerContainer().addLayer(layer);
        }
      });
    }, 10);
  }

  _drawingNewOrEditingPolygons = () => {
    setTimeout(() => {
      const {
        bodyModelReducer: {
          currentlyDrawingPolygon,
        },
        sex,
        side,
      }                     = this.props;
      const currentPolygons = [get(currentlyDrawingPolygon, `${side}.${sex}`, [])];
      let layer = new L.Polygon(currentPolygons);
      this.layerContainer().addLayer(layer);
    }, 10);
  };

  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  _onEditStart = () => {
    console.log('edit started');
    setTimeout(() => {
      this.layerContainer().clearLayers();
      this._drawingNewOrEditingPolygons();
    }, 10);
  };

  _onEditStop = () => {
    console.log('edit stopped');
    this._drawExistingPolygons();
  };

  _onDeleteStart = () => {
    setTimeout(() => {
      console.log('delete started');
      this.layerContainer().clearLayers();
      this._drawingNewOrEditingPolygons();
    }, 10);
  };

  _onDeleteStop = () => {
    console.log('delete stopped');
    this._drawExistingPolygons();
  };

  _onEdited = (e) => {
    const currentlyDrawingPolygon = this._editableFG.leafletElement.toGeoJSON();
    const { sex, side } = this.props;

    currentlyDrawingPolygon.features.forEach((polygon, i) => {
      let latlng = cloneDeep(polygon.geometry.coordinates);
      // last element need to be removed (spot the same as the first one due to leaflat stupid nature ->
      // http://leafletjs.com/reference-1.3.0.html#polygon
      latlng[0].pop();
      if (latlng[0].length) {
        dispatchBodyModelWired({
          // saving polygon for each side.sex : [[lat, lan][...][...]], reversing due to leaflat stupid nature
          [`currentlyDrawingPolygon.${side}.${sex}`]: latlng[0].map(ll => new L.LatLng(...ll.reverse())),
        });
      }
    });
    this._onChange();
  };

  _onCreated = (e) => {
    const currentlyDrawingPolygon = this._editableFG.leafletElement.toGeoJSON();
    const { sex, side } = this.props;

    currentlyDrawingPolygon.features.forEach((polygon, i) => {
      let latlng = cloneDeep(polygon.geometry.coordinates);
      // last element need to be removed (spot the same as the first one due to leaflat stupid nature ->
      // http://leafletjs.com/reference-1.3.0.html#polygon
      latlng[0].pop();
      dispatchBodyModelWired({
        // saving polygon for each side.sex : [[lat, lan][...][...]], reversing due to leaflat stupid nature
        [`currentlyDrawingPolygon.${side}.${sex}`]: latlng[0].map(ll => new L.LatLng(...ll.reverse())),
      });
    });
    this._onChange();
  };

  _onDeleted = (e) => {
    const {
      sex,
      side,
      bodyModelReducer: {
        currentlyDrawingPolygon,
      }
    } = this.props;
    if (!this._editableFG.leafletElement.toGeoJSON().features.length) {
      if (keys(get(currentlyDrawingPolygon, side)).length > 1) {
        deletePolygonWired(`currentlyDrawingPolygon.${side}.${sex}`);
      } else {
        deletePolygonWired(`currentlyDrawingPolygon.${side}`);
      }
    }
    this._onChange()
  };

  _onChange = () => {
    const {
      bodyModelReducer,
      bodyModelReducer: {
        side,
        sex
      }
    } = this.props;
    if (isEmpty(get(bodyModelReducer, `currentlyDrawingPolygon.${side}.${sex}`, {}))) {
      dispatchBodyModelWired({ showPolygonTool: true })
    } else {
      dispatchBodyModelWired({ showPolygonTool: false })
    }
    // const geojsonData = this._editableFG.leafletElement.toGeoJSON();
  };

  _updateBounds = () => {
    var poll = setInterval(() => {
      let DOMImage = get(this, GET_IMAGE);
      if (get(DOMImage, 'naturalHeight')) {
        this.setState({ bounds: [DOMImage.naturalHeight, DOMImage.naturalWidth] });
        clearInterval(poll);
      }
    }, 100);
  };

  render() {
    const {
      url,
      bodyModelReducer: {
        showEditTool,
        showPolygonTool,
      }
    } = this.props;
    return (
      <Map
        style={{ height: 'calc(100vh - 180px)', background: '#c2dfdc' }}
        maxNativeZoom={18}
        zoomControl={false}
        minZoom={-2}
        zoom={1000}
        bounds={[[0, 0], this.state.bounds]}
        crs={L.CRS.Simple}
        ref={map => this.map = map}
      >
        <ImageOverlay
          url={url}
          bounds={[[0, 0], this.state.bounds]}
          ref={imageOverlay => this.imageOverlay = imageOverlay}
        />
        <FeatureGroup ref={ (reactFGref) => this._onFeatureGroupReady(reactFGref)}>
          <EditControl
            ref={elem => this.editControl = elem}
            position='topleft'
            onEditStart={this._onEditStart}
            onEditStop={this._onEditStop}
            onEdited={this._onEdited}
            onCreated={this._onCreated}
            onDeleteStart={this._onDeleteStart}
            onDeleteStop={this._onDeleteStop}
            onDeleted={this._onDeleted}
            onMounted={this._onMounted}
            draw={{
              polygon: showPolygonTool,
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
            edit={{
              remove: !showPolygonTool,
              // edit: !showPolygonTool,
              allowIntersection: false,
              actions: { clearAll: false }
            }}
          />
        </FeatureGroup>
        <ZoomControl position='topright'/>
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  bodyModelReducer: state.bodyModelReducer,
  side: state.bodyModelReducer.side,
  sex: state.bodyModelReducer.sex,
  url: state.bodyModelReducer.url,
  existingPolygons: state.bodyModelReducer.existingPolygons,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BodyModel);
