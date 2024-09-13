import React, { Component } from "react";
class StreetView extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.renderMap();
    this.streetView();
  }

  // call google map api
  async renderMap() {
    // await loadScript(
    //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8a-3Q9A81eHdjF7uvsBoY_xQD72BPDKg&libraries=places&v=weekly&channel=2&callback=initMap"
    // );
    // window.initMap = this.initMap;
    return;
  };
 
  streetView() {
    const street = new window.google.maps.StreetViewPanorama(
      document.getElementById("street"),
      {
        position: {
          lat: parseFloat(this.props.location.lat),
          lng: parseFloat(this.props.location.lng),
        },
        zoom: 1,
        pov: {
          heading: 34,
          pitch: 10,
        },
      }
    );
  }

  render() {
    return (
      <div className="content col-12 h-100">
        <main className="h-100 col-12">
          <div id="street" style={{ width: "100%", height: "800px" }}></div>
        </main>
      </div>
    );
  }
}
async function loadScript(url) {
  // var tag = window.document.getElementById("google");
  // if (!tag) {
  //   var index = window.document.getElementsByTagName("script")[0];
  //   var script = window.document.createElement("script");
  //   script.src = url;
  //   script.id = "google";
  //   script.async = true;
  //   script.defer = true;
  //   index.parentNode.insertBefore(script, index);
  // }
}
export default StreetView;
