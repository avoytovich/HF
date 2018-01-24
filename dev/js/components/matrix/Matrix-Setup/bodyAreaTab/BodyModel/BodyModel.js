import React, { Component } from 'react';
import get from 'lodash/get';
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

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
});

export const GET_IMAGE = 'imageOverlay.leafletElement._image';

export default class BodyModel extends Component {
  state = {
    bounds: [1000, 1000],
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
    if (type === 'marker') {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
    }
    else {
      console.log("_onCreated: something else created:", type, e);
    }
    // Do whatever else you need to. (save to db; etc)
    console.log('================');
    console.log('_editableFG:', this._editableFG.leafletElement.toGeoJSON());
    console.log('================');
    this._onChange();
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
    console.log('_onMounted', drawControl);
    this.updateBounds()
  }

  _onEditStart = (e) => {
    console.log('_onEditStart', e);
  }

  _onEditStop = (e) => {
    console.log('_onEditStop', e);
  }

  _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  }

  _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
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
    onChange(geojsonData);
  }

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
            position='topleft'
            onEdited={this._onEdited}
            onCreated={this._onCreated}
            onDeleted={this._onDeleted}
            onMounted={this._onMounted}
            onEditStart={this._onEditStart}
            onEditStop={this._onEditStop}
            onDeleteStart={this._onDeleteStart}
            onDeleteStop={this._onDeleteStop}
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
