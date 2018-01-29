import React, { Component } from 'react';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Map,
  TileLayer,
  FeatureGroup,
  ZoomControl,
  ImageOverlay,
} from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

import { assets } from '../../../../../config'
import { dispatchBodyModelWired, T } from '../../../../../actions'

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

export const GET_IMAGE = 'imageOverlay.leafletElement._image';

class BodyModel extends Component {
  state = {
    bounds: [1000, 1000],
  };

  componentWillMount() {
    // this.props.dispatch({ type: `${T.BODY_MODEL}_` })
  }

  componentDidMount() {

    setTimeout(() => {
      this._drawExistingShapes();
      console.log(this.layerContainer);
    }, 100)
  }

  _drawExistingShapes = () => {
    this.editControl.context.layerContainer.clearLayers();
    this.props.bodyModelReducer.shapes.features.forEach(shape => {
      // console.log(shape);
      let layer = new L.Polygon(
        [shape.geometry.coordinates[0].map(latlng => new L.LatLng(...latlng.reverse()))]
      );
      console.log(cloneDeep(shape.geometry));
      // layer.setStyle({ color: 'red', fillColor: 'red' });
      let addLayer = this.editControl.context.layerContainer.addLayer.bind(this.editControl.context.layerContainer);
      addLayer(layer);
    });
    // L.geoJSON(this.props.bodyModelReducer.shapes).addTo(this.map);
  };

  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  _onEdited = (e) => {

    let numEdited = 0;
    e.layers.eachLayer( (layer) => {
      numEdited += 1;
    })
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    this._onChange();
  }

  _onCreated = (e) => {
    let type = e.layerType;
    let layer = e.layer;
    // console.log(`_onCreated: '''${type}''' created:`, e);
    // Do whatever else you need to. (save to db; etc)
    const shapes = this._editableFG.leafletElement.toGeoJSON()
    dispatchBodyModelWired({ shapes });
    console.log('================');
    console.log('GEOJSON:', shapes);
    console.log('================');
    this._onChange();

    // this.layerContainer.clearLayers();

  }

  _onDeleted = (e) => {

    let numDeleted = 0;
    e.layers.eachLayer( (layer) => {
      numDeleted += 1;
    })
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    this._onChange();
  }

  _onMounted = (drawControl) => {
    this.updateBounds();
    // setTimeout(() => {
    //   this._drawExistingShapes();
    // }, 100);

  }

  _onEditStop = (e) => {
    console.log('_onEditStop', e);
  }

  _editableFG = null

  _onFeatureGroupReady = (reactFGref) => {
    // populate the leaflet FeatureGroup with the geoJson layers
    // store the ref for future access to content

    this._editableFG = reactFGref;
  }

  _onChange = () => {

    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = this.props;

    if (!this._editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    console.log('gegoegoegoe', geojsonData);
    // onChange(geojsonData);
  }

  layerContainer = () =>  get(this.editControl, 'context.layerContainer');

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
  }

  render() {
    const { url } = this.props;
    return (
      <Map
        style={{ height: 'calc(100vh - 180px)', background: '#c2dfdc' }}
        maxNativeZoom={18}
        zoomControl={false}
        minZoom={-2.8}
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
          />
        </FeatureGroup>
        <ZoomControl/>
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  bodyModelReducer: state.bodyModelReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BodyModel);
