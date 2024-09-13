import React, { Component } from "react";
import { connect } from "react-redux";
// import mapstyles from "./assets/styles/googlemap";
class locationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
    };
  }
  componentDidMount() {
    if (!this.state.map && this.props.location.lat > 19) {
      this.renderMap();
    }
  }

  // call google map api
  async renderMap() {
    // await loadScript(
    //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8a-3Q9A81eHdjF7uvsBoY_xQD72BPDKg&libraries=places&callback=initMap"
    // );
    // if (loadScript) window.initMap = this.initMap;
  }
  initMap = () => {
    var position = new window.google.maps.LatLng(
      this.props.location.lat,
      this.props.location.lng
    );
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.props.location.lat, lng: this.props.location.lng },
      zoom: 13,
      mapTypeId: "roadmap",
      // styles: mapstyles,
    });
    var iconMan = "https://www.allsoppandallsopp.com/icons/map-pin.svg";
    var marker = new window.google.maps.Marker({
      position: position,
      title: "iqbal",
      map,
      icon: iconMan,
    });

    marker.addListener("click", function () {
      // window.open("/admin/staffs");
      // infowindow.open(map, marker);
    });

    marker.addListener("mouseover", function () {
      // infowindow.open(map, marker);
    });
    // this.setState({ map: map });
  };
  render() {
    return (
      <div className="content h-100">
        <main className="h-100">
          <div
            id="map"
            className="sitummap"
            style={{ width: "100%", height: "400px" }}
          ></div>
        </main>
      </div>
    );
  }
}

function loadScript(url) {
  var tag = window.document.getElementById("google");
  if (!tag) {
    // var index = window.document.getElementsByTagName("script")[0];
    // var script = window.document.createElement("script");
    // script.src = url;
    // script.id = "google";
    // script.async = true;
    // script.defer = true;
    // index.parentNode.insertBefore(script, index);
    return false;
  } else {
    return true;
  }
}
export default locationMap;
