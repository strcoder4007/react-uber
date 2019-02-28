import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';

import CurrentLocation from './Map';
// import SearchBox from "./SearchBox";

const mapStyles = {
  width: '100%',
  height: '100%'
};

const btn =  {
  borderRadius: '0px'
}


export class MapContainer extends Component {
  state = {
    input: '',
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
  onBtnClick = () => {
    this.setState({ input: document.getElementById('searchBox').value });
  }
  render() {
    return (
        <div className="container-fluid">
          <h1 className="mt-3">React Uber App</h1>
          <div className="row mt-3">
            <div className="col-8" style={{height: '500px'}}>
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
              <div className="mt-3">
                {/*<SearchBox input={this.state.input}/>*/}
              </div>
            </div>
            <div className="col-4">
              <div className="m-2">
                <input id="searchBox" className="input p-2 w-100" placeholder="search location..." />
                <button className="button btn btn-info mt-1" style={btn}>search</button>
              </div>
            </div>
          </div>
        </div>

    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCzQY5M0PXWp23jVGg8E2hAjUSxauJarOo'
})(MapContainer);
