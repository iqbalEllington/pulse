import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>

  <img style={{width: "30px"}} src='https://www.allsoppandallsopp.com/images/icons/map-pin.png' />

</div>;

class locationMap extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    zoom: 14
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100%', width: '100%' }}>
        <a className='get-direction' href={"https://www.google.com/maps/dir//" + this.props.location.lat + "," + this.props.location.lng} target="_blank">Open in Google Map</a>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyC8a-3Q9A81eHdjF7uvsBoY_xQD72BPDKg",
            libraries: ['places'],
            featureType: "poi",
            stylers: [
              { "visibility": "simplified" }
            ]
          }
          }
          defaultCenter={{ lat: this.props.location.lat, lng: this.props.location.lng }}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.location.lat}
            lng={this.props.location.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default locationMap;