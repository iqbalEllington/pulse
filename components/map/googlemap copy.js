import React, { Component } from "react";
import { connect } from "react-redux";
import mapstyles from "./assets/styles/googlemap";
class Googlemap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      situmMap: null,
      isBuildingSet: false,
      map: null,
      user: null,
    };
  }

  async componentDidMount() {
    await this.renderMap();
  }

  addBuildings() {
    return;
  }

  getdata() {
    return <App />;
  }

  // call google map api
  async renderMap() {
    // await loadScript(
    //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyC8a-3Q9A81eHdjF7uvsBoY_xQD72BPDKg&libraries=places&callback=initMap"
    // );
    window.initMap = this.initMap;
  }

  initMap = () => {
    // Create A Map
    // 25.068688, 55.142429
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 25.068688, lng: 55.142429 },
      zoom: 13,
      mapTypeId: "roadmap",
      styles: mapstyles,
    });
    //Create the search box and link it to the UI element.
    var input = document.getElementById("input");
    var searchBox = new window.google.maps.places.SearchBox(input);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", function () {
      //   searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    searchBox.addListener("places_changed", function () {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function (marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new window.google.maps.LatLngBounds();
      places.forEach(function (place) {
        if (!place.geometry) {
          // console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new window.google.maps.Size(71, 71),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(17, 34),
          scaledSize: new window.google.maps.Size(25, 25),
        };
        var myLatLng = { lat: 25.245149612426758, lng: 55.31127166748047 };

        var marker = new window.google.maps.Marker({
          position: myLatLng,
          title: "Asd",
          map: map,
        });
        // Create a marker for each place.
        markers.push(
          new window.google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: myLatLng,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    var overlay;
    var overlay2;
    // this.state.buildings.map(([key, value]) => {
    //   return console.log("mone nee jayicheda")
    // })

    USGSOverlay.prototype = new window.google.maps.OverlayView();
    var bounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(25.068502, 55.142218),
      new window.google.maps.LatLng(25.068639, 55.142757),
      new window.google.maps.LatLng(25.068316, 55.142475),
      new window.google.maps.LatLng(25.068825, 55.142501)
    );

    this.setState({ situmMap: map });

    // The photograph is courtesy of the U.S. Geological Survey.
    var srcImage =
      "https://dashboard.situm.es/uploads/floor/13664/4e522bb5-7d3a-45f6-aa16-6e0ef0d64cde.jpg";
    // overlay = new USGSOverlay(bounds, srcImage, map, this.imageSize);
    // overlay2 = new USGSOverlay(bounds, srcImage, map, this.imageSize);
    USGSOverlay.prototype.onAdd = function () {
      var div = document.createElement("div");
      div.style.borderStyle = "none";
      div.style.borderWidth = "0";
      div.style.position = "absolute";
      // Create the img element and attach it to the div.
      var img = document.createElement("img");
      img.src = this.image_;
      img.style.opacity = "1";
      img.style.height = "100%";
      img.style.width = "100%";
      // div.style.transform = 'rotate(' + 5.3853595767863 * 180 / Math.PI + 'deg)';

      div.appendChild(img);

      this.div_ = div;

      // Add the element to the "overlayLayer" pane.
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
    };
    USGSOverlay.prototype.draw = function () {
      var div = this.div_;
      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      var overlayProjection = this.getProjection();
      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      var sw = overlayProjection.fromLatLngToDivPixel(
        this.bounds_.getSouthWest()
      );
      var ne = overlayProjection.fromLatLngToDivPixel(
        this.bounds_.getNorthEast()
      );
      var dxO = ne.x - sw.x;
      var dyO = sw.y - ne.y;

      if (Math.abs(dxO) > 10000 || Math.abs(dyO) > 10000) {
        div.style.display = "none";
        return;
      }
      var dxI = this.imageSize.width;
      var dyI = this.imageSize.height;
      var r = Math.atan2(dyO, dxO) - Math.atan2(dyI, dxI);
      var scale =
        Math.sqrt(dxO * dxO + dyO * dyO) / Math.sqrt(dxI * dxI + dyI * dyI);
      //"20.158775085484";
      div.style.display = "block";
      div.style.left = sw.x + "px";
      // div.style.top = ne.y + 'px';
      // Resize the image's div to fit the indicated dimensions.
      div.style.top = sw.y - scale * this.imageSize.height + "px";
      div.style.width = scale * this.imageSize.width + "px";
      div.style.height = scale * this.imageSize.height + "px";

      var transform = "rotate(" + -r + "rad)";
      div.style.WebkitTransform = transform;
      div.style.MozTransform = transform;
      div.style.transform = transform;
      var tOrigin = "center center";
      div.style.transformOrigin = tOrigin;
      div.style.WebkitTransformOrigin = tOrigin;
      div.style.MozTransformOrigin = tOrigin;
      div.style.transform = "rotate(" + this.rotate + "rad)";
    };
    this.addBuildings();
    var icon = "https://i.ibb.co/h1xdr5T/marwan.png";
    var iconMan = "https://i.ibb.co/60D0rQS/iconMan.png";
    try {
      var position = new window.google.maps.LatLng(25.068688, 55.142429);
      var marker = new window.google.maps.Marker({
        position: position,
        title: "Marwans",
        map,
        icon: icon,
      });
      //   var contentString = this.getdata();
      var infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
        // this.setState({ user: "m-3" })
        // this.getdata();
      });

      // this.changeMarkerPosition(marker);
      var position = new window.google.maps.LatLng(25.068688, 55.142429);
      var marker = new window.google.maps.Marker({
        position: position,
        title: "Marwaan B",
        map,
        icon: icon,
      });

      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
      // this.changeMarkerPosition(marker);
    } catch (e) {
      console.log(e);
    }

    try {
      var position = new window.google.maps.LatLng(25.1889094, 55.2637973);
      var marker = new window.google.maps.Marker({
        position: position,
        title: "Marwan A",
        map,
        icon: iconMan,
      });
      var contentString =
        "<div className='marker-wrapper building-livedata userprofile' data-id='sadsad'>" +
        '<div className="userprofile-hover text-center"><img src="/static/media/photo.299c7a58.png"></div>' +
        "<div className='icon-container row'><div className='building-icon'></div></div><div className='content bold'><h3>Allshopp and Allsopp</h3><span className='address'>Property For Rent</span></div>" +
        "<div className='col-12 row pt-4 text-center pl-5'><span className='call-btn ml-5'></span> <span className='chat-btn'></span> <span className='tsk-btn'>Contact an Agent</span></div>" +
        '<div className="col-12 pt-4 pb-4 pl-0 pop-progress">' +
        '<h5>Offer Valid <span> ( 24 Days)</span></h5><div className="progress col-12 pl-0">' +
        '  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>' +
        '</div><span className="lefts">10 Jan 2021</span><span className="rights float-right text-right">20 Aug 2021</span>' +
        '</div><div className="analytics"><h5>Call Now</h5></div></div>';
      var infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });
      marker.addListener("mouseover", function () {
        infowindow.open(map, marker);
      });
      // this.changeMarkerPosition(marker);
      var position = new window.google.maps.LatLng(25.068542, 55.142407);
      var marker = new window.google.maps.Marker({
        position: position,
        title: "Ashraque",
        map,
        icon: iconMan,
      });

      marker.addListener("click", function () {
        window.open("/admin/staffs");
        infowindow.open(map, marker);
      });

      marker.addListener("mouseover", function () {
        infowindow.open(map, marker);
      });
      // this.changeMarkerPosition(marker);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="content h-100">
        <main className="h-100">
          <input
            id="input"
            className="controls"
            type="text"
            placeholder="Search Box"
          />
          <div
            id="map"
            className="sitummap"
            style={{ width: "100%", height: "800px" }}
          ></div>
        </main>
      </div>
    );
  }
}
function USGSOverlay(bounds, image, map, imageSize, rotate) {
  // Initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;
  this.imageSize = imageSize;
  this.rotate = rotate;
  // Define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay.
  this.setMap(map);
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    maploaded: state.searchReducer.searchData,
  };
};

const mapDispachToProps = (dispatch) => {};
function loadScript(url) {
  // var tag = window.document.getElementById("google");
  // if (!tag) {
  //   var index = window.document.getElementsByTagName("script")[0];
  //   var script = window.document.createElement("script");
  //   script.src = url;
  //   script.id = "google";
  //   script.async = true;
  //   script.defer = true;
  //   index.parentNode.insertBefore(script, index);
  //   return true;
  // } else {
  //   return true;
  // }
  return
}
export default connect(mapStateToProps, mapDispachToProps)(Googlemap);
