import { Component, OnInit, Input } from '@angular/core';

// import { AppStateService } from '../state/appstate.service';
// import { Map, layer, View, proj, source, geom, Feature, style } from 'openlayers';


import { Map,  View, Feature } from 'ol';

// import Layer from 'ol/layer/Layer';
import { transform } from 'ol/proj';
import Point from 'ol/geom/Point';
import { OSM, Vector } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Tile,  Vector as VectorLayer} from 'ol/layer';
import { Style, Icon, IconImage } from 'ol/style';


const INITIAL_OPACITY = 1;
const DIMMED_OPACITY = 0.3;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private map: Map;

  @Input() lat: number;
  @Input() long: number;

  constructor() { }

  markerSource = new VectorSource();

  markerStyle = new Style({
    image: new Icon( ({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      opacity: 0.75,
      src: 'https://openlayers.org/en/v5.3.0/examples/data/icon.png',
    }))
  });


  addMarker(lon, lat) {
    console.log('lon:', lon);
    console.log('lat:', lat);
    var iconFeatures = [];

    var iconFeature = new Feature({
      geometry: new Point(transform([lon, lat], 'EPSG:4326', 'EPSG:3857')),
      name: 'Null Island',
      population: 4000,
      rainfall: 500
    });

    this.markerSource.addFeature(iconFeature);
  }



  ngOnInit() {
    this.addMarker(this.lat, this.long);
    this.map = new Map({
      layers: [
        new Tile({ source: new OSM(), opacity: INITIAL_OPACITY }),
        new VectorLayer({ source: this.markerSource, style: this.markerStyle })
      ],
      target: document.getElementById('map'),
      view: new View({
        center: transform([this.lat, this.long], 'EPSG:4326',
         'EPSG:3857'),
        zoom: 7
      })
    });

  }
}




