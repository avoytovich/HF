import React, { Component } from 'react';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
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

import { dispatchBodyModelWired, T } from '../../../../../actions'

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl      : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl    : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

export const GET_IMAGE = 'imageOverlay.leafletElement._image';

class BodyModel extends Component {
  state = {
    bounds: [1000, 1000],
  };

  componentDidMount() {
    console.log('mounted');
    setTimeout(() => this._drawExistingShapes(), 100)
  }

  componentWillUpdate({ url }){
    console.log('updated');
    if (url !== this.props.url) {
      setTimeout(() => this._drawExistingShapes(), 100)
    }
  }

  _drawExistingShapes = () => {
    this.layerContainer().clearLayers();
    const { polygons }    = this.props.bodyModelReducer;
    const { sex, side }   = this.props;
    const currentPolygons = get(polygons, `${sex}.${side}`, []);

    currentPolygons.forEach(shape => {
      shape     = cloneDeep(shape);
      let layer = new L.Polygon(shape);

      layer.setStyle({ color: 'gray', fillColor: 'gray' });
      this.layerContainer().addLayer(layer);
    });
  };

  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  _onEdited = (e) => this._onChange();

  _onCreated = (e) => {
    const polygons      = this._editableFG.leafletElement.toGeoJSON();
    const { sex, side } = this.props;

    polygons.features.forEach((polygon, i) => {
      let latlng = cloneDeep(polygon.geometry.coordinates);
      // last element need to be removed (spot the same as the first one due to leaflat stupid nature ->
      // http://leafletjs.com/reference-1.3.0.html#polygon
      latlng[0].pop();
      dispatchBodyModelWired({
        // saving polygon for each sex.side : [0: [0: [lat, lan][...][...]]], reversing due to leaflat stupid nature
        [`polygons.${sex}.${side}[${i}]`]: [latlng[0].map(ll => new L.LatLng(...ll.reverse()))],
      });
    });
    this._onChange();
  };

  _onDeleted = (e) => dispatchBodyModelWired({ polygons: {} });

  _onMounted = (drawControl) => this.updateBounds();

  _editableFG = null;

  _onFeatureGroupReady = (reactFGref) => this._editableFG = reactFGref;

  _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
    const { onChange } = this.props;

    if (!this._editableFG || !onChange) {
      return;
    }
    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    console.log('gegoegoegoe', geojsonData);
    // onChange(geojsonData);
  };

  layerContainer = () => get(this.editControl, 'context.layerContainer');

  // get layerContainer() {
  //   return get(this.editControl, 'context.layerContainer;')
  // }

  updateBounds = () => {
    var poll = setInterval(() => {
      let DOMImage = get(this, GET_IMAGE);
      if (get(DOMImage, 'naturalHeight')) {
        this.setState({ bounds: [DOMImage.naturalHeight, DOMImage.naturalWidth] });
        clearInterval(poll);
      }
    }, 100);
  };

  render() {
    const { url } = this.props;
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
        <FeatureGroup ref={ (reactFGref) => {this._onFeatureGroupReady(reactFGref);} }>
          <EditControl
            ref={elem => this.editControl = elem}
            position='topleft'
            onEdited={this._onEdited}
            onCreated={this._onCreated}
            onDeleted={this._onDeleted}
            onMounted={this._onMounted}
            onEditStop={this._onEditStop}
            draw={{
              polygon     : true,
              rectangle   : false,
              polyline    : false,
              circle      : false,
              circlemarker: false,
              marker      : false,
            }}
            edit={{
              // remove: false,
              // edit: false,
              allowIntersection: false,
              actions: { clearAll: false }
            }}
          />
        </FeatureGroup>
        <ZoomControl/>
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  bodyModelReducer: state.bodyModelReducer,
  side: state.bodyModelReducer.side,
  sex: state.bodyModelReducer.sex,
  url: state.bodyModelReducer.url,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BodyModel);
