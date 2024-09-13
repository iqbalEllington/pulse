import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import CMSService from "../../services/CMSService";
import { mapdata } from "./assets/maptest.js";
import {
  getSugessions,
  setResult,
  setSearchResults,
  putSearchParam,
} from "../../store/actions/search/searchAction";
import searchService from "../../services/searchService";
const searchClass = new searchService();

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
      zoom: 10,
      buildi: [],
      mode: "3D"
    };
  }
  async componentDidMount() {
    await this.renderMap();
    if (this.state.mode == "3D") {
      // if (this.state.situmMap !== null) {
      //   if (this.state.situmMap.getSource("composite")) {
      //     console.log(this.state.situmMap.getSource("composite"),"11111122223333")
      //     await this.setData();
      //   }
      // }
    }

    // this.setData();
    // this.setmarkers();
  }
  async setData() {
    if (this.state.situmMap !== null) {
      if (this.state.situmMap.getSource("composite")) {
        const cmsServices = new CMSService();
        const resultArray = await Promise.all(
          this.props.searchData.data.hits.map(
            async (searchItem, searchIndex) => {
              var buildings = await cmsServices.MapService(
                searchItem["fields"]["pba__longitude_pb__c"],
                searchItem["fields"]["pba__latitude_pb__c"]
              );
              var a = 1;
              buildings.props.data.features.map((building, bui) => {
                // console.log(building.id,)
                this.state.situmMap.getCanvasContainer().style.cursor =
                  "pointer";
                var current = this.state.situmMap.getFeatureState(
                  {
                    source: "composite",
                    sourceLayer: "building",
                    id: building.id,

                  }
                );
                // console.log(building.id, a++, "we are here")
                var listings = [];
                if (current.listings != undefined) {
                  //  current.listings.push(searchItem["fields"]["pba__broker_s_listing_id__c"])
                  listings = current.listings.concat([searchItem["fields"]["pba__broker_s_listing_id__c"]]);
                } else {
                  listings = searchItem["fields"]["pba__broker_s_listing_id__c"];//
                }

                this.state.situmMap.setFeatureState(
                  {
                    source: "composite",
                    sourceLayer: "building",
                    id: building.id,

                  },
                  {
                    hover: true,
                    listings: listings,
                  }
                );
              });
              // console.log("abc", buildings.props.data.features);
            }
          )
        );
      }
    }
  }
  async resetmarkers() {
    if (this.state.situmMap !== null) {
      if (this.state.situmMap.getSource('properties')) {
        var mapsdata = await searchClass.mapMarkers()
        // console.log("search map",mapsdata.data.data )
        // this.state.situmMap.on('load', () => {
          // Add a new source from our GeoJSON data and
          // set the 'cluster' option to true. GL-JS will
          // add the point_count property to your source data.
          var datas = {
            "type": "FeatureCollection",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": mapsdata.data.data
          }
          this.state.situmMap.getSource('properties').setData(datas);

          this.state.situmMap.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'properties',
            filter: ['has', 'point_count'],
            paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
              ]
            }
          });
  
          this.state.situmMap.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'properties',
            filter: ['has', 'point_count'],
            layout: {
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12
            }
          });
  
          this.state.situmMap.addLayer({
            id: 'unclustered-point',
            type: 'symbol',
            source: 'properties',
            filter: ['!', ['has', 'point_count']],
            layout: {
              // 'icon-image': `https://cdn-teams-slug.flaticon.com/google.jpg`,
              'text-field': '{price}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold']
            },
            'paint': {
              'text-color': '#202',
              'text-halo-color': '#fff',
              'text-halo-width': 14,
              // "text-fill-color": "#00ffff"
            },
          });
  
          // inspect a cluster on click
          this.state.situmMap.on('click', 'clusters', (e) => {
            const features = this.state.situmMap.queryRenderedFeatures(e.point, {
              layers: ['clusters']
            });
            const clusterId = features[0].properties.cluster_id;
            this.state.situmMap.getSource('properties').getClusterExpansionZoom(
              clusterId,
              (err, zoom) => {
                if (err) return;
                this.state.situmMap.easeTo({
                  center: features[0].geometry.coordinates,
                  zoom: zoom
                });
              }
            );
          });
  
          // When a click event occurs on a feature in
          // the unclustered-point layer, open a popup at
          // the location of the feature, with
          // description HTML from its properties.
          this.state.situmMap.on('click', 'unclustered-point', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const mag = e.features[0].properties.mag;
            const tsunami =
              e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
  
            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
  
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(
                `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
              )
              .addTo(this.state.situmMap);
          });
  
          this.state.situmMap.on('mouseenter', 'clusters', () => {
            this.state.situmMap.getCanvas().style.cursor = 'pointer';
          });
          this.state.situmMap.on('mouseleave', 'clusters', () => {
            this.state.situmMap.getCanvas().style.cursor = '';
          });
          
      }
    }
  }
  async setmarkers() {

    if (this.state.situmMap !== null) {
      var mapsdata = await searchClass.mapMarkers()
      // console.log("search map",mapsdata.data.data )
      this.state.situmMap.on('load', () => {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        var datas = {
          "type": "FeatureCollection",
          "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
          "features": mapsdata.data.data
        }
        this.state.situmMap.addSource('properties', {
          type: 'geojson',
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data: [],//'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });
        // this.state.situmMap.getSource('properties').setData(datas)
        // this.state.situmMap.addLayer({
        //   id: 'clusters',
        //   type: 'circle',
        //   source: 'properties',
        //   filter: ['has', 'point_count'],
        //   paint: {
        //     // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        //     // with three steps to implement three types of circles:
        //     //   * Blue, 20px circles when point count is less than 100
        //     //   * Yellow, 30px circles when point count is between 100 and 750
        //     //   * Pink, 40px circles when point count is greater than or equal to 750
        //     'circle-color': [
        //       'step',
        //       ['get', 'point_count'],
        //       '#51bbd6',
        //       100,
        //       '#f1f075',
        //       750,
        //       '#f28cb1'
        //     ],
        //     'circle-radius': [
        //       'step',
        //       ['get', 'point_count'],
        //       20,
        //       100,
        //       30,
        //       750,
        //       40
        //     ]
        //   }
        // });

        // this.state.situmMap.addLayer({
        //   id: 'cluster-count',
        //   type: 'symbol',
        //   source: 'properties',
        //   filter: ['has', 'point_count'],
        //   layout: {
        //     'text-field': '{point_count_abbreviated}',
        //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        //     'text-size': 12
        //   }
        // });

        // this.state.situmMap.addLayer({
        //   id: 'unclustered-point',
        //   type: 'symbol',
        //   source: 'properties',
        //   filter: ['!', ['has', 'point_count']],
        //   layout: {
        //     // 'icon-image': `https://cdn-teams-slug.flaticon.com/google.jpg`,
        //     'text-field': '{price}',
        //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        //     'text-size': 12,
        //     'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold']
        //   },
        //   'paint': {
        //     'text-color': '#202',
        //     'text-halo-color': '#fff',
        //     'text-halo-width': 14,
        //     // "text-fill-color": "#00ffff"
        //   },
        // });

        // // inspect a cluster on click
        // this.state.situmMap.on('click', 'clusters', (e) => {
        //   const features = this.state.situmMap.queryRenderedFeatures(e.point, {
        //     layers: ['clusters']
        //   });
        //   const clusterId = features[0].properties.cluster_id;
        //   this.state.situmMap.getSource('properties').getClusterExpansionZoom(
        //     clusterId,
        //     (err, zoom) => {
        //       if (err) return;
        //       this.state.situmMap.easeTo({
        //         center: features[0].geometry.coordinates,
        //         zoom: zoom
        //       });
        //     }
        //   );
        // });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        this.state.situmMap.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const mag = e.features[0].properties.mag;
          const tsunami =
            e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
            )
            .addTo(this.state.situmMap);
        });

        this.state.situmMap.on('mouseenter', 'clusters', () => {
          this.state.situmMap.getCanvas().style.cursor = 'pointer';
        });
        this.state.situmMap.on('mouseleave', 'clusters', () => {
          this.state.situmMap.getCanvas().style.cursor = '';
        });
      })
    }
  }
  componentDidUpdate() {
    try {
      if (this.props.searchData.data.hits) {
        if (
          this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"][
          "0"
          ] != "" &&
          this.props.searchData.data.hits["0"]["fields"][
          "pba__longitude_pb__c"
          ]["0"] !== "" &&
          this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"][
            "0"
          ].substring(0, 2) == "25"
        ) {
          // console.log(this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"].substring(0, 2), "subst")
          this.mapfly(
            this.props.searchData.data.hits["0"]["fields"][
            "pba__latitude_pb__c"
            ]["0"],
            this.props.searchData.data.hits["0"]["fields"][
            "pba__longitude_pb__c"
            ]["0"]
          );
          // console.log(this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"],this.props.searchData.data.hits["0"]["fields"]["pba__longitude_pb__c"]["0"], "hua",this.props.searchData.data.hits["0"]["fields"]["pba__latitude_pb__c"]["0"].substring(0, 2));
        } else if (this.props.searchData.total > 1 && this.props.searchData.data.hits["1"]["fields"]["pba__latitude_pb__c"][
          "0"
        ] != "" &&
          this.props.searchData.data.hits["1"]["fields"][
          "pba__longitude_pb__c"
          ]["0"] !== "" &&
          this.props.searchData.data.hits["1"]["fields"]["pba__latitude_pb__c"][
            "0"
          ].substring(0, 2) == "25") {
          this.mapfly(
            this.props.searchData.data.hits["1"]["fields"][
            "pba__latitude_pb__c"
            ]["0"],
            this.props.searchData.data.hits["1"]["fields"][
            "pba__longitude_pb__c"
            ]["0"]
          );
        } else if (this.props.searchData.total > 2 && this.props.searchData.data.hits["2"]["fields"]["pba__latitude_pb__c"][
          "0"
        ] != "" &&
          this.props.searchData.data.hits["2"]["fields"][
          "pba__longitude_pb__c"
          ]["0"] !== "" &&
          this.props.searchData.data.hits["2"]["fields"]["pba__latitude_pb__c"][
            "0"
          ].substring(0, 2) == "25") {
          this.mapfly(
            this.props.searchData.data.hits["2"]["fields"][
            "pba__latitude_pb__c"
            ]["0"],
            this.props.searchData.data.hits["2"]["fields"][
            "pba__longitude_pb__c"
            ]["0"]
          );
        }
        // console.log(this.props.searchData.total, "total result")
      }
      // console.log()
      this.setData();

      // this.setmarkers()
      this.resetmarkers();
    } catch (exception) {
      console.log("error");
    }
    // console.log(this.props.searchParams.inAreas, "filtered");
  }
  mapfly(lng, lat) {
    if (this.situmMap !== null) {
      // this.state.situmMap.setCenter([65.468754, 44.57875])
      this.state.situmMap.flyTo({
        center: [lat, lng],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 15.9,
        pitch: 60,
        bearing: 20,
      });
    }
  }
  async renderMap() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: "mapbox://styles/iqbalspotnik/ckwrs8e8m2j0x14mk62rz5swk",
      style: "mapbox://styles/iqbalukkadanallsopp/ckx5omlkz79zs14pat88r18gw",
      center: [55.266241, 25.186175],
      zoom: 10,
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
        zoom: 12,
        pitch: 60,
        bearing: 10,
      });
    });
     map.on("style.load", function () {
      if (map.getSource("composite")) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 16,
            layout: {
              // Make the layer visible by default.
              visibility: "visible",
            },
            state: {
              listings: ["0"],
            },
            paint: {
              "fill-extrusion-color": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                "#0f0",
                "#AED0EC",
              ],
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15.7,
                0,
                16,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15.7,
                0,
                16,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 1,
            },
          },
          "poi-label"
        );
      }
      map.on('mousemove', '3d-buildings', function (e) {
        // console.log(e.features, "features e")
        // map.getSource('currentBuildings').setData({
        //   "type": "FeatureCollection",
        //   "features": e.features
        // });
      });
      let fHover;

      var layers = map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
          labelLayerId = layers[i].id;
          break;
        }
      }
     this.props.searchData.data.hits.map(
        async (searchItem, searchIndex) => {
          var buildings = await cmsServices.MapService(
            searchItem["fields"]["pba__longitude_pb__c"],
            searchItem["fields"]["pba__latitude_pb__c"]
          );
          var a = 1;
          buildings.props.data.features.map((building, bui) => {
            // console.log(building.id,)
            this.state.situmMap.getCanvasContainer().style.cursor =
              "pointer";
            var current = this.state.situmMap.getFeatureState(
              {
                source: "composite",
                sourceLayer: "building",
                id: building.id,

              }
            );
            // console.log(building.id, a++, "we are here")
            var listings = [];
            if (current.listings != undefined) {
              //  current.listings.push(searchItem["fields"]["pba__broker_s_listing_id__c"])
              listings = current.listings.concat([searchItem["fields"]["pba__broker_s_listing_id__c"]]);
            } else {
              listings = searchItem["fields"]["pba__broker_s_listing_id__c"];//
            }

            this.state.situmMap.setFeatureState(
              {
                source: "composite",
                sourceLayer: "building",
                id: building.id,

              },
              {
                hover: true,
                listings: listings,
              }
            );
          });

      await this.setData();
      await this.setmarkers();
          // console.log("abc", buildings.props.data.features);
        }
      )

      // );
      // this.setData();
    });

    this.setState({ situmMap: map });
    function rotateCamera(timestamp) {
      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }
    return "True";

  }
  setMap(mode) {
    if (this.state.situmMap !== null) {
      // if (this.state.situmMap.getSource("composite")) {
      if (mode == "Satellite") {
        this.state.situmMap.setStyle('mapbox://styles/mapbox/satellite-v9');
        this.setState({ mode: "Satellite" })
      } else {
        this.state.situmMap.setStyle('mapbox://styles/iqbalukkadanallsopp/ckx5omlkz79zs14pat88r18gw');
        this.setState({ mode: "3D" })
      }
      // }
    }
  }
  render() {
    return (
      <div className="content h-100 p-0">
        <main className="h-100 col p-0">
          <div
            ref={(el) => (this.mapContainer = el)}
            className="osmmapFull col h-100"
          >
            <ul className="map-switcher">
              {this.state.mode !== "3D" &&
                <li>
                  <span onClick={() => this.setMap("3D")}>3D</span>
                </li>
              }
              {this.state.mode !== "Satellite" &&
                <li>
                  <span onClick={() => this.setMap("Satellite")}>Satellite</span>
                </li>
              }
            </ul>
          </div>
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
