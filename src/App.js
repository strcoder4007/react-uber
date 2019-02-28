import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './Map';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };
  onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
        <div className="container-fluid">
          <h1 className="mt-5">React Uber App</h1>
          <div className="row mt-5">
            <div className="col-6" style={{height: '600px'}}>
              <CurrentLocation
                  centerAroundCurrentLocation
                  google={this.props.google}
              >
                <Marker onClick={this.onMarkerClick} name={'current location'} />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
              </CurrentLocation>
            </div>
            <div className="col-6">
            </div>
          </div>
        </div>

    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCzQY5M0PXWp23jVGg8E2hAjUSxauJarOo'
})(MapContainer);
