import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import CMSService from "../../services/CMSService";
import {mapdata} from "./assets/maptest.js";
import {
  getSugessions,
  setResult,
  setSearchResults,
  putSearchParam,
} from "../../store/actions/search/searchAction";
mapboxgl.accessToken =
  "pk.eyJ1IjoiaXFiYWx1a2thZGFuYWxsc29wcCIsImEiOiJja3dic2c4am4wM3NrMnR0M2RpZHp3ZTcxIn0.72GJXrCeX6faI_6QfdeQwg";

class mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      situmMap: null,
      isBuildingSet: false,
      lng: 55.266242,
      lat: 25.226123,
      zoom: 15,
      buildi: [],
    };
  }
  async componentDidMount() {
    await this.renderMap();
  }
  async setData() {
    if (this.state.situmMap !== null) {
      if (this.state.situmMap.getSource("composite")) {
        this.state.situmMap.setFeatureState(
          {
            source: "composite",
            sourceLayer: "building",
            id: "*",
          },
          {
            hover: false,
          }
        );
        const cmsServices = new CMSService();
        const resultArray = await Promise.all(this.props.searchData.data.hits.map(async (searchItem, searchIndex) => {
          var buildings = await cmsServices.MapService(searchItem["fields"]["pba__longitude_pb__c"], searchItem["fields"]["pba__latitude_pb__c"])
          buildings.props.data.features.map((building, bui) => {
            // console.log(building.id,)
            this.state.situmMap.getCanvasContainer().style.cursor = "pointer";
            this.state.situmMap.setFeatureState(
              {
                source: "composite",
                sourceLayer: "building",
                id: building.id,
              },
              {
                hover: true,
              }
            );
          })
          // console.log("abc", buildings.props.data.features);

        })
        )
      }
    }
  }
  componentDidUpdate() {
    try {
      if (this.props.searchData.data.hits) {

        if (this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"] != "" && this.props.searchData.data.hits["0"]["fields"]["pba__longitude_pb__c"]["0"] !== "" && this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"].substring(0, 2) == "25") {
          // console.log(this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"].substring(0, 2), "subst")
          this.mapfly(this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"], this.props.searchData.data.hits["0"]["fields"]["pba__longitude_pb__c"]["0"]);
          // console.log(this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"],this.props.searchData.data.hits["0"]["fields"]["pba__longitude_pb__c"]["0"], "hua",this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"].substring(0, 2));
        }

      }
      // console.log()
      this.setData();
    } catch (exception) {
      console.log("error")
    }
    // console.log(this.props.searchParams.inAreas, "filtered");
  }
  mapfly(lng, lat) {
    if (this.situmMap !== null) {
      // this.state.situmMap.setCenter([65.468754, 44.57875])
      this.state.situmMap.flyTo({
        center: [lat, lng],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 16,
        pitch: 60,
        bearing: 20,
      });
    }
  }
  renderMap() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: "mapbox://styles/iqbalspotnik/ckwrs8e8m2j0x14mk62rz5swk",
      style: "mapbox://styles/iqbalukkadanallsopp/ckx5omlkz79zs14pat88r18gw",
      center: [55.266241, 25.186175],
      zoom: 16,
      pitch: 20,
      width: "100%",
      bearing: -20,
      //   hash: false,
      antialias: false,
      hash: false,
    });
    // load 2
    map.on("load", function () {
      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.flyTo({
        center: [55.266241, 25.186175],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 16,
        pitch: 60,
        bearing: 10,
      });
    });
    map.on('zoom',function(){
      console.log(map.getZoom())
    })
    map.on("style.load", function () {
      if (map.getSource("composite")) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            'filter': ['==', 'extrude', 'true'],
            type: "fill-extrusion",
            minzoom: 15,
            'layout': {
              // Make the layer visible by default.
              'visibility': 'visible',
            },
            paint: {
              "fill-extrusion-color": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                "#0f0",
                "#AED0EC",

              ],
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                16,
                0,
                16.1,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                16,
                0,
                16.1,
                ['get', 'min_height']
              ],
              "fill-extrusion-opacity": 1,
            },
          },
          "poi-label"
        );
      }
      map.getCanvasContainer().style.cursor = "pointer";
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "building",
          id: "4411722601841895",
        },
        {
          hover: true,
        }
      );
      map.getCanvasContainer().style.cursor = "pointer";
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "building",
          id: "1315660041727095",
        },
        {
          hover: true,
        }
      );
      map.getCanvasContainer().style.cursor = "pointer";
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "building",
          id: "3957345234349675",
        },
        {
          hover: true,
        }
      );
      map.getCanvasContainer().style.cursor = "pointer";
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "building",
          id: "5328485811",
        },
        {
          hover: true,
        }
      );

      let fHover;

      var layers = map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      map.addLayer(
        {
          'id': '3dbuildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 17,
          pitch: 60,
          bearing: -60,
          'paint': {
            'fill-extrusion-color': '#AED0EC',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              17,
              0,
              17.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              17,
              0,
              17.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 1
          }
        },
        labelLayerId
      );

      map.addSource('currentBuildings', {
        type: 'geojson',
        data: {
          "type": "FeatureCollection",
          "features": []
        }
      });

      map.addLayer(
        {
          'id': 'highlight',
          'source': 'currentBuildings',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 17,
          maxzoom:16,
          pitch: 60,
          bearing: -60,

          'paint': {
            'fill-extrusion-color': '#0f0',
            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4,
              0,
              17.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4,
              0,
              17.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 1
          }
        },
        labelLayerId
      );
      map.getSource('currentBuildings').setData({
        "type": "FeatureCollection",
        "features": mapdata
      });
      // map.on('mousemove', '3dbuildings', function (e) {
      //   console.log(e.features, "features e")
      //   map.getSource('currentBuildings').setData({
      //     "type": "FeatureCollection",
      //     "features": e.features
      //   });
      // });
    });

    this.setState({ situmMap: map });
    function rotateCamera(timestamp) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }
  }
  render() {
    return (
      <div className="content h-100 p-0">
        <main className="h-100 col p-0">
          <div
            ref={(el) => (this.mapContainer = el)}
            className="osmmapFull col h-100"
          ></div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    searchData: state.searchReducer.searchData,
    suggestions: state.searchReducer.suggestions,
    searchParams: state.searchReducer.searchParams,
    isSearched: state.searchReducer.isSearched,
    isSuggested: state.searchReducer.isSuggested,
    total: state.searchReducer.searchData.total,
    filters: state.searchReducer.filterData,
  };
};
const mapDispachToProps = (dispatch) => {
  return {
    putSearchParam: (paramKey, paramValue) =>
      dispatch(putSearchParam(paramKey, paramValue)),
    getSugessions: (data, search) => dispatch(getSugessions(data, search)),
    setResult: (data) => dispatch(setResult(data)),
    setSearchResults: (data) => dispatch(setSearchResults(data)),
  };
};
export default connect(mapStateToProps, mapDispachToProps)(mapbox);
