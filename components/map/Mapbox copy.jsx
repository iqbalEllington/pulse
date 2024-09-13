import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import { connect } from "react-redux";
import CMSService from "../../services/CMSService";
import {
  getSugessions,
  setResult,
  setSearchResults,
  putSearchParam,
} from "../../store/actions/search/searchAction";
mapboxgl.accessToken =
  "pk.eyJ1IjoiaXFiYWx1a2thZGFuIiwiYSI6ImNrZGlobTNnZjA0b3Ayc3JvaW1zaDFyZTkifQ.meoolvrCzFL7l-EvflACew";

class mapbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      situmMap: null,
      isBuildingSet: true,
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
      // this.setData();
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
        zoom: 15,
        pitch: 60,
        bearing: 20,
      });
    }
  }
  renderMap() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/iqbalspotnik/ckwrs8e8m2j0x14mk62rz5swk",
      center: [55.266241, 25.186175],
      zoom: 15,
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
        zoom: 15,
        pitch: 60,
        bearing: 10,
      });
    });

    map.on("style.load", function () {
      if (map.getSource("composite")) {
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id;
            break;
          }
        }
        map.addSource('someid', {
          type: 'geojson',
          data: {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  55.2796053,25.198765
                ]
              }
            }]
          }
        });
        console.log(map.getSource('someid'), "some data")
        map.addLayer(
          {
            'id': '3dbuildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            pitch: 60,
            bearing: -60,
            'paint': {
              'fill-extrusion-color': '#aaa',

              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                14,
                0,
                14.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                14,
                0,
                14.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
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
            'minzoom': 14,
            pitch: 60,
            bearing: -60,

            'paint': {
              'fill-extrusion-color': '#f00',
              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                4,
                0,
                14.5,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                4,
                0,
                14.5,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 1
            }
          },
          labelLayerId
        );

        var features = map.queryRenderedFeatures({
          layers:['building'],
          filter: ["==", "id", 4411722601841895]
        })
          

        // map.getCanvasContainer().style.cursor = "pointer";
        // map.setFeatureState(
        //     {
        //         source: "composite",
        //         sourceLayer: "building",
        //         id: "4411722601841895",
   
        const coordinate = [55.278017, 25.196428];
        const point = map.project(coordinate);

        const features2 =map.queryRenderedFeatures(point,{layers:['building']})

        // console.log(features, "ggfgfgfgg",features2)   
        // console.log(point, "lala")
        map.getSource('currentBuildings').setData({
          "type": "FeatureCollection",
          "features": features[0]
        })
        
        // https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/${lng},${lat}.json?layers=contour&limit=50&access_token
        // https://api.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2/tilequery/55.2796053,25.198765.json?radius=30&limit=10&dedupe&access_token=pk.eyJ1IjoiaXFiYWx1a2thZGFuIiwiYSI6ImNrZGlobTNnZjA0b3Ayc3JvaW1zaDFyZTkifQ.meoolvrCzFL7l-EvflACew
        // map.on('mousemove', '3dbuildings', function (e) {
        //   console.log(e.features)
        //         map.getSource('currentBuildings').setData({
        //           "type": "FeatureCollection",
        //           "features": [
        //             {
        //                 "geometry": {
        //                     "type": "Polygon",
        //                     "coordinates": [
        //                         [
        //                             [
        //                                 55.2774041891098,
        //                                 25.1998713859752
        //                             ],
        //                             [
        //                                 55.27752757072449,
        //                                 25.199832554963564
        //                             ],
        //                             [
        //                                 55.27750611305237,
        //                                 25.199791297000118
        //                             ],
        //                             [
        //                                 55.27747929096222,
        //                                 25.199723342676933
        //                             ],
        //                             [
        //                                 55.277449786663055,
        //                                 25.199652961373644
        //                             ],
        //                             [
        //                                 55.27742028236389,
        //                                 25.19958500697325
        //                             ],
        //                             [
        //                                 55.27739614248276,
        //                                 25.199514625589984
        //                             ],
        //                             [
        //                                 55.27737736701965,
        //                                 25.199441817219665
        //                             ],
        //                             [
        //                                 55.27737736701965,
        //                                 25.199419974700092
        //                             ],
        //                             [
        //                                 55.27737468481064,
        //                                 25.19936415491003
        //                             ],
        //                             [
        //                                 55.27738004922867,
        //                                 25.199301054246945
        //                             ],
        //                             [
        //                                 55.277433693408966,
        //                                 25.1992646500034
        //                             ],
        //                             [
        //                                 55.277492702007294,
        //                                 25.199267076953305
        //                             ],
        //                             [
        //                                 55.27754098176956,
        //                                 25.19930590814529
        //                             ],
        //                             [
        //                                 55.277570486068726,
        //                                 25.199344739324857
        //                             ],
        //                             [
        //                                 55.27758926153183,
        //                                 25.199369008805817
        //                             ],
        //                             [
        //                                 55.27766972780228,
        //                                 25.199500063919402
        //                             ],
        //                             [
        //                                 55.277723371982574,
        //                                 25.19946851362718
        //                             ],
        //                             [
        //                                 55.27790039777756,
        //                                 25.19973062349908
        //                             ],
        //                             [
        //                                 55.2779620885849,
        //                                 25.199696646325307
        //                             ],
        //                             [
        //                                 55.27798891067505,
        //                                 25.199737904320813
        //                             ],
        //                             [
        //                                 55.278222262859344,
        //                                 25.199609276406292
        //                             ],
        //                             [
        //                                 55.278195440769196,
        //                                 25.19956801836723
        //                             ],
        //                             [
        //                                 55.27827590703964,
        //                                 25.19952190642462
        //                             ],
        //                             [
        //                                 55.27825713157654,
        //                                 25.19947579446456
        //                             ],
        //                             [
        //                                 55.278321504592896,
        //                                 25.199436963326775
        //                             ],
        //                             [
        //                                 55.27831882238388,
        //                                 25.199497636974144
        //                             ],
        //                             [
        //                                 55.27831882238388,
        //                                 25.199529187258833
        //                             ],
        //                             [
        //                                 55.278348326683044,
        //                                 25.199529187258833
        //                             ],
        //                             [
        //                                 55.27835637331009,
        //                                 25.199262223053438
        //                             ],
        //                             [
        //                                 55.27838587760925,
        //                                 25.199259796103433
        //                             ],
        //                             [
        //                                 55.27839124202728,
        //                                 25.199356874065955
        //                             ],
        //                             [
        //                                 55.27841538190842,
        //                                 25.199415120806336
        //                             ],
        //                             [
        //                                 55.278442203998566,
        //                                 25.19945637889721
        //                             ],
        //                             [
        //                                 55.278485119342804,
        //                                 25.199478221410274
        //                             ],
        //                             [
        //                                 55.27853608131409,
        //                                 25.19948064835593
        //                             ],
        //                             [
        //                                 55.278578996658325,
        //                                 25.19945637889721
        //                             ],
        //                             [
        //                                 55.27861386537552,
        //                                 25.1994879291926
        //                             ],
        //                             [
        //                                 55.27868628501892,
        //                                 25.19953889503708
        //                             ],
        //                             [
        //                                 55.27872383594513,
        //                                 25.199553456703015
        //                             ],
        //                             [
        //                                 55.27875334024429,
        //                                 25.19955102975881
        //                             ],
        //                             [
        //                                 55.27876406908035,
        //                                 25.199541321981542
        //                             ],
        //                             [
        //                                 55.27875870466232,
        //                                 25.199497636974144
        //                             ],
        //                             [
        //                                 55.278726518154144,
        //                                 25.199415120806336
        //                             ],
        //                             [
        //                                 55.27868092060089,
        //                                 25.19936415491003
        //                             ],
        //                             [
        //                                 55.27861922979355,
        //                                 25.199296200348428
        //                             ],
        //                             [
        //                                 55.27862191200256,
        //                                 25.199271930852973
        //                             ],
        //                             [
        //                                 55.27862191200256,
        //                                 25.19922096489674
        //                             ],
        //                             [
        //                                 55.278595089912415,
        //                                 25.199174852822708
        //                             ],
        //                             [
        //                                 55.27854681015015,
        //                                 25.19915058330308
        //                             ],
        //                             [
        //                                 55.27853071689606,
        //                                 25.19915058330308
        //                             ],
        //                             [
        //                                 55.27852535247803,
        //                                 25.19911903292028
        //                             ],
        //                             [
        //                                 55.27857631444931,
        //                                 25.199123886825873
        //                             ],
        //                             [
        //                                 55.27861386537552,
        //                                 25.199155437207367
        //                             ],
        //                             [
        //                                 55.27867019176483,
        //                                 25.199245234402383
        //                             ],
        //                             [
        //                                 55.27869701385498,
        //                                 25.199288919500304
        //                             ],
        //                             [
        //                                 55.278721153736115,
        //                                 25.19927435780275
        //                             ],
        //                             [
        //                                 55.278820395469666,
        //                                 25.19922096489674
        //                             ],
        //                             [
        //                                 55.2788445353508,
        //                                 25.199254942203282
        //                             ],
        //                             [
        //                                 55.27915298938751,
        //                                 25.19908505557582
        //                             ],
        //                             [
        //                                 55.27927100658417,
        //                                 25.199029235632224
        //                             ],
        //                             [
        //                                 55.279461443424225,
        //                                 25.198922449581858
        //                             ],
        //                             [
        //                                 55.279456079006195,
        //                                 25.19891274175444
        //                             ],
        //                             [
        //                                 55.27950435876846,
        //                                 25.19891759566825
        //                             ],
        //                             [
        //                                 55.27959555387497,
        //                                 25.19891274175444
        //                             ],
        //                             [
        //                                 55.27968406677246,
        //                                 25.198890899139954
        //                             ],
        //                             [
        //                                 55.27976721525192,
        //                                 25.198854494773755
        //                             ],
        //                             [
        //                                 55.279802083969116,
        //                                 25.198830225190264
        //                             ],
        //                             [
        //                                 55.279839634895325,
        //                                 25.1988035286428
        //                             ],
        //                             [
        //                                 55.27990400791168,
        //                                 25.198742854649566
        //                             ],
        //                             [
        //                                 55.27995228767395,
        //                                 25.19867247277955
        //                             ],
        //                             [
        //                                 55.279981791973114,
        //                                 25.198606944795003
        //                             ],
        //                             [
        //                                 55.27999520301819,
        //                                 25.198626360497798
        //                             ],
        //                             [
        //                                 55.280180275440216,
        //                                 25.198524428023603
        //                             ],
        //                             [
        //                                 55.280343890190125,
        //                                 25.198429776363994
        //                             ],
        //                             [
        //                                 55.2804109454155,
        //                                 25.198390944892623
        //                             ],
        //                             [
        //                                 55.280453860759735,
        //                                 25.198366675216704
        //                             ],
        //                             [
        //                                 55.28039485216141,
        //                                 25.19827687737383
        //                             ],
        //                             [
        //                                 55.28048872947693,
        //                                 25.19822591100113
        //                             ],
        //                             [
        //                                 55.28049677610397,
        //                                 25.198238045853685
        //                             ],
        //                             [
        //                                 55.28046190738678,
        //                                 25.198259888585298
        //                             ],
        //                             [
        //                                 55.280558466911316,
        //                                 25.19840307972875
        //                             ],
        //                             [
        //                                 55.280716717243195,
        //                                 25.19831570888158
        //                             ],
        //                             [
        //                                 55.28062015771866,
        //                                 25.198170090663652
        //                             ],
        //                             [
        //                                 55.28059333562851,
        //                                 25.19818707946473
        //                             ],
        //                             [
        //                                 55.280585289001465,
        //                                 25.198172517635385
        //                             ],
        //                             [
        //                                 55.28065502643585,
        //                                 25.19813368608196
        //                             ],
        //                             [
        //                                 55.28071403503418,
        //                                 25.19822348403045
        //                             ],
        //                             [
        //                                 55.28121829032898,
        //                                 25.197941955105463
        //                             ],
        //                             [
        //                                 55.28117537498474,
        //                                 25.19787885370539
        //                             ],
        //                             [
        //                                 55.281194150447845,
        //                                 25.197869145794797
        //                             ],
        //                             [
        //                                 55.28129070997238,
        //                                 25.198012337397728
        //                             ],
        //                             [
        //                                 55.28141409158707,
        //                                 25.197946809057953
        //                             ],
        //                             [
        //                                 55.281314849853516,
        //                                 25.19780119039889
        //                             ],
        //                             [
        //                                 55.281341671943665,
        //                                 25.197786628523417
        //                             ],
        //                             [
        //                                 55.2813845872879,
        //                                 25.197849729971267
        //                             ],
        //                             [
        //                                 55.281929075717926,
        //                                 25.197546357326516
        //                             ],
        //                             [
        //                                 55.28215706348419,
        //                                 25.19788613463784
        //                             ],
        //                             [
        //                                 55.28217315673828,
        //                                 25.197881280682935
        //                             ],
        //                             [
        //                                 55.28223216533661,
        //                                 25.197873999750186
        //                             ],
        //                             [
        //                                 55.28229117393494,
        //                                 25.19787642672783
        //                             ],
        //                             [
        //                                 55.282449424266815,
        //                                 25.19787642672783
        //                             ],
        //                             [
        //                                 55.282438695430756,
        //                                 25.197823033208863
        //                             ],
        //                             [
        //                                 55.282548666000366,
        //                                 25.197815752272632
        //                             ],
        //                             [
        //                                 55.28271496295929,
        //                                 25.19771867308144
        //                             ],
        //                             [
        //                                 55.28278470039368,
        //                                 25.197621593812883
        //                             ],
        //                             [
        //                                 55.282816886901855,
        //                                 25.197543930342306
        //                             ],
        //                             [
        //                                 55.28281956911087,
        //                                 25.19742500805698
        //                             ],
        //                             [
        //                                 55.28278738260269,
        //                                 25.197323074577127
        //                             ],
        //                             [
        //                                 55.282723009586334,
        //                                 25.197213860039753
        //                             ],
        //                             [
        //                                 55.282669365406036,
        //                                 25.197150758262396
        //                             ],
        //                             [
        //                                 55.282607674598694,
        //                                 25.197090083445644
        //                             ],
        //                             [
        //                                 55.28270959854126,
        //                                 25.19703183559311
        //                             ],
        //                             [
        //                                 55.282465517520905,
        //                                 25.196667785883605
        //                             ],
        //                             [
        //                                 55.28249502182007,
        //                                 25.19665079687057
        //                             ],
        //                             [
        //                                 55.28251647949219,
        //                                 25.19661439183467
        //                             ],
        //                             [
        //                                 55.28277397155762,
        //                                 25.19700513865139
        //                             ],
        //                             [
        //                                 55.2828249335289,
        //                                 25.196976014708298
        //                             ],
        //                             [
        //                                 55.28252989053726,
        //                                 25.19653915472604
        //                             ],
        //                             [
        //                                 55.28252989053726,
        //                                 25.196522165695043
        //                             ],
        //                             [
        //                                 55.28251111507416,
        //                                 25.196468771582303
        //                             ],
        //                             [
        //                                 55.282449424266815,
        //                                 25.196391107376485
        //                             ],
        //                             [
        //                                 55.28236895799637,
        //                                 25.19632315115578
        //                             ],
        //                             [
        //                                 55.282296538352966,
        //                                 25.196269756955772
        //                             ],
        //                             [
        //                                 55.282234847545624,
        //                                 25.19623820582656
        //                             ],
        //                             [
        //                                 55.28216511011124,
        //                                 25.196218789742986
        //                             ],
        //                             [
        //                                 55.281971991062164,
        //                                 25.195932402150788
        //                             ],
        //                             [
        //                                 55.28195858001709,
        //                                 25.195910559001717
        //                             ],
        //                             [
        //                                 55.28165817260742,
        //                                 25.19546156006929
        //                             ],
        //                             [
        //                                 55.28157502412796,
        //                                 25.195507673549457
        //                             ],
        //                             [
        //                                 55.28154283761978,
        //                                 25.19546156006929
        //                             ],
        //                             [
        //                                 55.28153210878372,
        //                                 25.195444570888
        //                             ],
        //                             [
        //                                 55.28118073940277,
        //                                 25.19492033212879
        //                             ],
        //                             [
        //                                 55.27920126914978,
        //                                 25.19492033212879
        //                             ],
        //                             [
        //                                 55.279193222522736,
        //                                 25.19492275916528
        //                             ],
        //                             [
        //                                 55.279193222522736,
        //                                 25.19492033212879
        //                             ],
        //                             [
        //                                 55.27907520532608,
        //                                 25.19492033212879
        //                             ],
        //                             [
        //                                 55.27902960777283,
        //                                 25.1949518835994
        //                             ],
        //                             [
        //                                 55.27896523475647,
        //                                 25.195036829825852
        //                             ],
        //                             [
        //                                 55.27893304824829,
        //                                 25.19510235973148
        //                             ],
        //                             [
        //                                 55.278925001621246,
        //                                 25.195201868039263
        //                             ],
        //                             [
        //                                 55.27895450592041,
        //                                 25.195296522207798
        //                             ],
        //                             [
        //                                 55.2789169549942,
        //                                 25.195311084381046
        //                             ],
        //                             [
        //                                 55.27882307767868,
        //                                 25.195352343862467
        //                             ],
        //                             [
        //                                 55.27881234884262,
        //                                 25.195308657352285
        //                             ],
        //                             [
        //                                 55.27878552675247,
        //                                 25.19531836546703
        //                             ],
        //                             [
        //                                 55.278731882572174,
        //                                 25.1953402087223
        //                             ],
        //                             [
        //                                 55.27862459421158,
        //                                 25.195388749275622
        //                             ],
        //                             [
        //                                 55.27857095003128,
        //                                 25.195415446571687
        //                             ],
        //                             [
        //                                 55.278469026088715,
        //                                 25.195468841146266
        //                             ],
        //                             [
        //                                 55.27841806411743,
        //                                 25.195497965449803
        //                             ],
        //                             [
        //                                 55.278369784355164,
        //                                 25.195527089746378
        //                             ],
        //                             [
        //                                 55.27827322483063,
        //                                 25.19559019236506
        //                             ],
        //                             [
        //                                 55.27822494506836,
        //                                 25.195624170684653
        //                             ],
        //                             [
        //                                 55.27819275856018,
        //                                 25.19564844090715
        //                             ],
        //                             [
        //                                 55.27815520763397,
        //                                 25.195607181526057
        //                             ],
        //                             [
        //                                 55.27803719043732,
        //                                 25.195650867929132
        //                             ],
        //                             [
        //                                 55.2780881524086,
        //                                 25.19572853260702
        //                             ],
        //                             [
        //                                 55.278117656707764,
        //                                 25.195757656848457
        //                             ],
        //                             [
        //                                 55.27807742357254,
        //                                 25.195786781082916
        //                             ],
        //                             [
        //                                 55.278053283691406,
        //                                 25.195762510888017
        //                             ],
        //                             [
        //                                 55.27802109718323,
        //                                 25.195738240688243
        //                             ],
        //                             [
        //                                 55.27803182601929,
        //                                 25.19572610558656
        //                             ],
        //                             [
        //                                 55.277970135211945,
        //                                 25.195663003038305
        //                             ],
        //                             [
        //                                 55.277937948703766,
        //                                 25.19565814899478
        //                             ],
        //                             [
        //                                 55.2778360247612,
        //                                 25.195641159840918
        //                             ],
        //                             [
        //                                 55.27776628732681,
        //                                 25.19564844090715
        //                             ],
        //                             [
        //                                 55.277696549892426,
        //                                 25.1956727111248
        //                             ],
        //                             [
        //                                 55.27761608362198,
        //                                 25.195713970483666
        //                             ],
        //                             [
        //                                 55.27754366397858,
        //                                 25.195779500024955
        //                             ],
        //                             [
        //                                 55.27749538421631,
        //                                 25.19584988356705
        //                             ],
        //                             [
        //                                 55.27746856212616,
        //                                 25.19592269408504
        //                             ],
        //                             [
        //                                 55.27753829956055,
        //                                 25.1959372561834
        //                             ],
        //                             [
        //                                 55.27751684188843,
        //                                 25.195966380374912
        //                             ],
        //                             [
        //                                 55.277492702007294,
        //                                 25.196017347693314
        //                             ],
        //                             [
        //                                 55.27749001979828,
        //                                 25.195993077544358
        //                             ],
        //                             [
        //                                 55.277460515499115,
        //                                 25.195995504559477
        //                             ],
        //                             [
        //                                 55.27728617191315,
        //                                 25.196269756955772
        //                             ],
        //                             [
        //                                 55.277312994003296,
        //                                 25.196291600040425
        //                             ],
        //                             [
        //                                 55.277235209941864,
        //                                 25.19639838839788
        //                             ],
        //                             [
        //                                 55.277192294597626,
        //                                 25.196374118324883
        //                             ],
        //                             [
        //                                 55.27713060379028,
        //                                 25.196456636553407
        //                             ],
        //                             [
        //                                 55.27699112892151,
        //                                 25.196607110826207
        //                             ],
        //                             [
        //                                 55.27679800987244,
        //                                 25.19676486591254
        //                             ],
        //                             [
        //                                 55.276840925216675,
        //                                 25.1967794279102
        //                             ],
        //                             [
        //                                 55.27689725160599,
        //                                 25.19683282188676
        //                             ],
        //                             [
        //                                 55.27677923440933,
        //                                 25.196844956878166
        //                             ],
        //                             [
        //                                 55.27675241231918,
        //                                 25.196704190903517
        //                             ],
        //                             [
        //                                 55.27663975954056,
        //                                 25.196728460910748
        //                             ],
        //                             [
        //                                 55.27656465768814,
        //                                 25.196757584913044
        //                             ],
        //                             [
        //                                 55.27646005153656,
        //                                 25.196815832896746
        //                             ],
        //                             [
        //                                 55.27635544538498,
        //                                 25.19690077782306
        //                             ],
        //                             [
        //                                 55.276331305503845,
        //                                 25.19687650785015
        //                             ],
        //                             [
        //                                 55.27626425027847,
        //                                 25.196910485810847
        //                             ],
        //                             [
        //                                 55.276199877262115,
        //                                 25.196915339804477
        //                             ],
        //                             [
        //                                 55.27613013982773,
        //                                 25.196883788842527
        //                             ],
        //                             [
        //                                 55.27609795331955,
        //                                 25.19683282188676
        //                             ],
        //                             [
        //                                 55.2760711312294,
        //                                 25.19684738387629
        //                             ],
        //                             [
        //                                 55.27603626251221,
        //                                 25.19677457391117
        //                             ],
        //                             [
        //                                 55.27597188949585,
        //                                 25.196704190903517
        //                             ],
        //                             [
        //                                 55.27589678764343,
        //                                 25.19665322387256
        //                             ],
        //                             [
        //                                 55.2758002281189,
        //                                 25.19662167284271
        //                             ],
        //                             [
        //                                 55.275690257549286,
        //                                 25.196611964831888
        //                             ],
        //                             [
        //                                 55.27556151151657,
        //                                 25.196641088862066
        //                             ],
        //                             [
        //                                 55.275454223155975,
        //                                 25.196706617904468
        //                             ],
        //                             [
        //                                 55.27537375688553,
        //                                 25.196808551900318
        //                             ],
        //                             [
        //                                 55.27541667222977,
        //                                 25.196849810874397
        //                             ],
        //                             [
        //                                 55.275454223155975,
        //                                 25.196883788842527
        //                             ],
        //                             [
        //                                 55.2755132317543,
        //                                 25.196929901784145
        //                             ],
        //                             [
        //                                 55.275564193725586,
        //                                 25.1969808686993
        //                             ],
        //                             [
        //                                 55.27558296918869,
        //                                 25.197017273625605
        //                             ],
        //                             [
        //                                 55.27565270662308,
        //                                 25.197009992641227
        //                             ],
        //                             [
        //                                 55.2756741642952,
        //                                 25.197145904278145
        //                             ],
        //                             [
        //                                 55.27565807104111,
        //                                 25.197344917472847
        //                             ],
        //                             [
        //                                 55.275623202323914,
        //                                 25.19749053667755
        //                             ],
        //                             [
        //                                 55.27557224035263,
        //                                 25.19767498742017
        //                             ],
        //                             [
        //                                 55.27543008327484,
        //                                 25.197917685340087
        //                             ],
        //                             [
        //                                 55.2752611041069,
        //                                 25.198111843327737
        //                             ],
        //                             [
        //                                 55.27521550655365,
        //                                 25.19815310186023
        //                             ],
        //                             [
        //                                 55.27510553598404,
        //                                 25.198235618883274
        //                             ],
        //                             [
        //                                 55.274955332279205,
        //                                 25.198322989787926
        //                             ],
        //                             [
        //                                 55.2748641371727,
        //                                 25.198383663990356
        //                             ],
        //                             [
        //                                 55.274746119976044,
        //                                 25.198471034788753
        //                             ],
        //                             [
        //                                 55.27472734451294,
        //                                 25.19845647299337
        //                             ],
        //                             [
        //                                 55.274598598480225,
        //                                 25.198553551596362
        //                             ],
        //                             [
        //                                 55.274461805820465,
        //                                 25.19868946151051
        //                             ],
        //                             [
        //                                 55.27451008558273,
        //                                 25.198728292886685
        //                             ],
        //                             [
        //                                 55.27466833591461,
        //                                 25.198796247765216
        //                             ],
        //                             [
        //                                 55.274692475795746,
        //                                 25.198839933024246
        //                             ],
        //                             [
        //                                 55.27473270893097,
        //                                 25.19887148347935
        //                             ],
        //                             [
        //                                 55.27478903532028,
        //                                 25.198883618267587
        //                             ],
        //                             [
        //                                 55.274818539619446,
        //                                 25.19887876435243
        //                             ],
        //                             [
        //                                 55.27482658624649,
        //                                 25.198898180011895
        //                             ],
        //                             [
        //                                 55.27474880218506,
        //                                 25.19895400001556
        //                             ],
        //                             [
        //                                 55.27478635311127,
        //                                 25.1990025391284
        //                             ],
        //                             [
        //                                 55.274839997291565,
        //                                 25.199048651267688
        //                             ],
        //                             [
        //                                 55.27490973472595,
        //                                 25.19907292080765
        //                             ],
        //                             [
        //                                 55.274982154369354,
        //                                 25.198997685218004
        //                             ],
        //                             [
        //                                 55.27508407831192,
        //                                 25.199058359084262
        //                             ],
        //                             [
        //                                 55.27523696422577,
        //                                 25.199106898155506
        //                             ],
        //                             [
        //                                 55.27538985013962,
        //                                 25.199126313778578
        //                             ],
        //                             [
        //                                 55.27553468942642,
        //                                 25.19911660596742
        //                             ],
        //                             [
        //                                 55.27553468942642,
        //                                 25.199102044249244
        //                             ],
        //                             [
        //                                 55.27564197778702,
        //                                 25.19907777471508
        //                             ],
        //                             [
        //                                 55.2756741642952,
        //                                 25.199111752061555
        //                             ],
        //                             [
        //                                 55.275690257549286,
        //                                 25.199099617296056
        //                             ],
        //                             [
        //                                 55.275684893131256,
        //                                 25.199089909482765
        //                             ],
        //                             [
        //                                 55.275700986385345,
        //                                 25.19907534776138
        //                             ],
        //                             [
        //                                 55.27571976184845,
        //                                 25.199089909482765
        //                             ],
        //                             [
        //                                 55.27576267719269,
        //                                 25.199109325108566
        //                             ],
        //                             [
        //                                 55.275816321372986,
        //                                 25.199114179014515
        //                             ],
        //                             [
        //                                 55.27587532997131,
        //                                 25.199094763389496
        //                             ],
        //                             [
        //                                 55.27590483427048,
        //                                 25.199060786038274
        //                             ],
        //                             [
        //                                 55.27590751647949,
        //                                 25.19903651649588
        //                             ],
        //                             [
        //                                 55.275937020778656,
        //                                 25.19904137040473
        //                             ],
        //                             [
        //                                 55.275996029376984,
        //                                 25.199065639946184
        //                             ],
        //                             [
        //                                 55.27603358030319,
        //                                 25.199089909482765
        //                             ],
        //                             [
        //                                 55.276052355766296,
        //                                 25.19911903292028
        //                             ],
        //                             [
        //                                 55.276073813438416,
        //                                 25.199109325108566
        //                             ],
        //                             [
        //                                 55.27606576681137,
        //                                 25.199094763389496
        //                             ],
        //                             [
        //                                 55.27615427970886,
        //                                 25.199024381722865
        //                             ],
        //                             [
        //                                 55.276215970516205,
        //                                 25.199053505176053
        //                             ],
        //                             [
        //                                 55.2762508392334,
        //                                 25.199021954768128
        //                             ],
        //                             [
        //                                 55.27628302574158,
        //                                 25.19903408954137
        //                             ],
        //                             [
        //                                 55.276336669921875,
        //                                 25.199055932130193
        //                             ],
        //                             [
        //                                 55.27629911899567,
        //                                 25.199097190342783
        //                             ],
        //                             [
        //                                 55.27629643678665,
        //                                 25.19910447120239
        //                             ],
        //                             [
        //                                 55.27627766132355,
        //                                 25.199145729398552
        //                             ],
        //                             [
        //                                 55.27626425027847,
        //                                 25.19921611099504
        //                             ],
        //                             [
        //                                 55.27626693248749,
        //                                 25.199288919500304
        //                             ],
        //                             [
        //                                 55.2763232588768,
        //                                 25.19935202016967
        //                             ],
        //                             [
        //                                 55.27640908956528,
        //                                 25.199393278281946
        //                             ],
        //                             [
        //                                 55.276462733745575,
        //                                 25.199398132176597
        //                             ],
        //                             [
        //                                 55.27644395828247,
        //                                 25.199509771699994
        //                             ],
        //                             [
        //                                 55.27645468711853,
        //                                 25.199563164479343
        //                             ],
        //                             [
        //                                 55.276468098163605,
        //                                 25.19957772614238
        //                             ],
        //                             [
        //                                 55.27670681476593,
        //                                 25.19967723079317
        //                             ],
        //                             [
        //                                 55.27692407369614,
        //                                 25.19976945454323
        //                             ],
        //                             [
        //                                 55.27698576450348,
        //                                 25.199733050439733
        //                             ],
        //                             [
        //                                 55.276956260204315,
        //                                 25.199446671112383
        //                             ],
        //                             [
        //                                 55.27691870927811,
        //                                 25.1993811435445
        //                             ],
        //                             [
        //                                 55.276950895786285,
        //                                 25.199361727962057
        //                             ],
        //                             [
        //                                 55.2770259976387,
        //                                 25.199388424387124
        //                             ],
        //                             [
        //                                 55.2771520614624,
        //                                 25.199446671112383
        //                             ],
        //                             [
        //                                 55.27739346027374,
        //                                 25.199597141690376
        //                             ],
        //                             [
        //                                 55.277259349823,
        //                                 25.19965538831582
        //                             ],
        //                             [
        //                                 55.27729153633118,
        //                                 25.19972091573611
        //                             ],
        //                             [
        //                                 55.2774041891098,
        //                                 25.1998713859752
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.28189688920975,
        //                                 25.196835248885137
        //                             ],
        //                             [
        //                                 55.28177887201309,
        //                                 25.1966629318801
        //                             ],
        //                             [
        //                                 55.2818888425827,
        //                                 25.196602256820285
        //                             ],
        //                             [
        //                                 55.282092690467834,
        //                                 25.196684774894237
        //                             ],
        //                             [
        //                                 55.28214365243912,
        //                                 25.19668962889685
        //                             ],
        //                             [
        //                                 55.28189688920975,
        //                                 25.196835248885137
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.282355546951294,
        //                                 25.19779876341977
        //                             ],
        //                             [
        //                                 55.28233140707016,
        //                                 25.197796336440604
        //                             ],
        //                             [
        //                                 55.28228044509888,
        //                                 25.19777206664618
        //                             ],
        //                             [
        //                                 55.28208464384079,
        //                                 25.197471120793665
        //                             ],
        //                             [
        //                                 55.282092690467834,
        //                                 25.197398311201482
        //                             ],
        //                             [
        //                                 55.28236627578735,
        //                                 25.197247837906303
        //                             ],
        //                             [
        //                                 55.282570123672485,
        //                                 25.197133769316736
        //                             ],
        //                             [
        //                                 55.282602310180664,
        //                                 25.19717988216368
        //                             ],
        //                             [
        //                                 55.28239846229553,
        //                                 25.197293950710076
        //                             ],
        //                             [
        //                                 55.28241455554962,
        //                                 25.197320647588484
        //                             ],
        //                             [
        //                                 55.28262108564377,
        //                                 25.19720900605803
        //                             ],
        //                             [
        //                                 55.28272032737732,
        //                                 25.19735705241324
        //                             ],
        //                             [
        //                                 55.28279811143875,
        //                                 25.197478401750473
        //                             ],
        //                             [
        //                                 55.28279811143875,
        //                                 25.197541503358053
        //                             ],
        //                             [
        //                                 55.28278738260269,
        //                                 25.197563346214594
        //                             ],
        //                             [
        //                                 55.28276592493057,
        //                                 25.197575481133214
        //                             ],
        //                             [
        //                                 55.28264790773392,
        //                                 25.197395884214288
        //                             ],
        //                             [
        //                                 55.28261572122574,
        //                                 25.19734977144914
        //                             ],
        //                             [
        //                                 55.28257817029953,
        //                                 25.197289096731566
        //                             ],
        //                             [
        //                                 55.282543301582336,
        //                                 25.197308512644483
        //                             ],
        //                             [
        //                                 55.28230458498001,
        //                                 25.197439569975714
        //                             ],
        //                             [
        //                                 55.282181203365326,
        //                                 25.1975075255734
        //                             ],
        //                             [
        //                                 55.28228580951691,
        //                                 25.19766527949332
        //                             ],
        //                             [
        //                                 55.28231531381607,
        //                                 25.197711392139
        //                             ],
        //                             [
        //                                 55.28236895799637,
        //                                 25.19779390946138
        //                             ],
        //                             [
        //                                 55.282355546951294,
        //                                 25.19779876341977
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.282607674598694,
        //                                 25.197090083445644
        //                             ],
        //                             [
        //                                 55.28252184391022,
        //                                 25.197053678541067
        //                             ],
        //                             [
        //                                 55.28228849172592,
        //                                 25.196704190903517
        //                             ],
        //                             [
        //                                 55.282344818115234,
        //                                 25.19670904490536
        //                             ],
        //                             [
        //                                 55.282465517520905,
        //                                 25.19684738387629
        //                             ],
        //                             [
        //                                 55.282607674598694,
        //                                 25.197090083445644
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.28111904859543,
        //                                 25.197298804688415
        //                             ],
        //                             [
        //                                 55.280984938144684,
        //                                 25.197099791418353
        //                             ],
        //                             [
        //                                 55.281057357788086,
        //                                 25.196971160717112
        //                             ],
        //                             [
        //                                 55.28112709522247,
        //                                 25.197073094491515
        //                             ],
        //                             [
        //                                 55.281314849853516,
        //                                 25.196971160717112
        //                             ],
        //                             [
        //                                 55.28142213821411,
        //                                 25.19713134232431
        //                             ],
        //                             [
        //                                 55.28111904859543,
        //                                 25.197298804688415
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.27950704097748,
        //                                 25.198109416354797
        //                             ],
        //                             [
        //                                 55.279434621334076,
        //                                 25.198005056472837
        //                             ],
        //                             [
        //                                 55.279971063137054,
        //                                 25.19770896515807
        //                             ],
        //                             [
        //                                 55.28003811836243,
        //                                 25.197813325293794
        //                             ],
        //                             [
        //                                 55.27971088886261,
        //                                 25.197995348572306
        //                             ],
        //                             [
        //                                 55.2796196937561,
        //                                 25.198046315041523
        //                             ],
        //                             [
        //                                 55.27950704097748,
        //                                 25.198109416354797
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.27841806411743,
        //                                 25.198713731122083
        //                             ],
        //                             [
        //                                 55.278342962265015,
        //                                 25.19860209086883
        //                             ],
        //                             [
        //                                 55.278836488723755,
        //                                 25.198330270693802
        //                             ],
        //                             [
        //                                 55.27890890836716,
        //                                 25.198441911196255
        //                             ],
        //                             [
        //                                 55.27877479791641,
        //                                 25.198517147129323
        //                             ],
        //                             [
        //                                 55.27861386537552,
        //                                 25.198606944795003
        //                             ],
        //                             [
        //                                 55.27854681015015,
        //                                 25.198643349235226
        //                             ],
        //                             [
        //                                 55.27847170829773,
        //                                 25.198684607587623
        //                             ],
        //                             [
        //                                 55.27841806411743,
        //                                 25.198713731122083
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.27898132801056,
        //                                 25.19840307972875
        //                             ],
        //                             [
        //                                 55.27890622615814,
        //                                 25.198291439190683
        //                             ],
        //                             [
        //                                 55.27906984090805,
        //                                 25.198204068263408
        //                             ],
        //                             [
        //                                 55.27914226055145,
        //                                 25.198313281912718
        //                             ],
        //                             [
        //                                 55.27898132801056,
        //                                 25.19840307972875
        //                             ]
        //                         ],
        //                         [
        //                             [
        //                                 55.27670681476593,
        //                                 25.199563164479343
        //                             ],
        //                             [
        //                                 55.27665585279465,
        //                                 25.199490356138057
        //                             ],
        //                             [
        //                                 55.276688039302826,
        //                                 25.19947579446456
        //                             ],
        //                             [
        //                                 55.27663707733154,
        //                                 25.19938599743962
        //                             ],
        //                             [
        //                                 55.27671754360199,
        //                                 25.199373862701435
        //                             ],
        //                             [
        //                                 55.27680605649948,
        //                                 25.19952190642462
        //                             ],
        //                             [
        //                                 55.27672827243805,
        //                                 25.19955102975881
        //                             ],
        //                             [
        //                                 55.27670681476593,
        //                                 25.199563164479343
        //                             ]
        //                         ]
        //                     ]
        //                 },
        //                 "type": "Feature",
        //                 "properties": {
        //                     "extrude": "true",
        //                     "iso_3166_1": "AE",
        //                     "underground": "false",
        //                     "height": 62,
        //                     "type": "building",
        //                     "min_height": 0
        //                 },
        //                 "layer": {
        //                     "id": "3dbuildings",
        //                     "type": "fill-extrusion",
        //                     "source": "composite",
        //                     "source-layer": "building",
        //                     "minzoom": 15,
        //                     "filter": [
        //                         "==",
        //                         "extrude",
        //                         "true"
        //                     ],
        //                     "paint": {
        //                         "fill-extrusion-color": {
        //                             "r": 0.6666666666666666,
        //                             "g": 0.6666666666666666,
        //                             "b": 0.6666666666666666,
        //                             "a": 1
        //                         },
        //                         "fill-extrusion-height": 62,
        //                         "fill-extrusion-base": 0,
        //                         "fill-extrusion-opacity": 0.6
        //                     },
        //                     "layout": {}
        //                 },
        //                 "source": "composite",
        //                 "sourceLayer": "building",
        //                 "state": {}
        //             }
        //         ]

        //   // });
        // });
        this.setState({ situmMap: map });
        function rotateCamera(timestamp) {
          // clamp the rotation between 0 -360 degrees
          // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
          map.rotateTo((timestamp / 100) % 360, { duration: 0 });
          // Request the next frame of the animation.
          requestAnimationFrame(rotateCamera);
        }
      }
    })
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
