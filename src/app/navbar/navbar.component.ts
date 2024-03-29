import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
//import { FormsModule } from '@angular/forms'
//import { AgmCoreModule } from '@agm/core';

import { WorldService } from '../world.service';

// From OpenLayer map
import OlMap from '../../../node_modules/ol/Map';
import OlXYZ from '../../../node_modules/ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { fromLonLat } from 'ol/proj';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  query: string = '';
  res: any = [];
  result: any = [];

  top_list: Array<string> = ['CDG', 'JFK', 'ORY', 'MAD', 'AJA'];

  current: any = {};

  lat: number = 51.678418;
  lng: number = 7.809007;


  closeResult: string;
  // Map
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;

  constructor(private data: WorldService, private modalService: NgbModal) { }

  ngOnInit() {
      this.data.getAirports().subscribe(data => {
        this.res = data;
        console.log(this.res);
        console.log('ok');
        this.result = this.res.filter(airport => this.top_list.indexOf(airport.iata_code.toString()) >= 0 );
        console.log(this.result);
    });


      this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

      this.layer = new OlTileLayer({
      source: this.source
    });

      this.view = new OlView({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 3
    });

      this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
     });

  }


  change(event: string) {
    if(event !== ""){
      this.query = event;
      this.result = this.res.filter(airport => airport.iata_code.toString().includes(this.query.toUpperCase()) 
                                    || airport.municipality.toString().toLowerCase().includes(this.query.toLowerCase()) 
                                    &&  airport.iata_code.toString().length >= 2);
      console.log(this.result)
      console.log(this.result.length) 
    } else {
      this.result = this.res.filter(airport =>   this.top_list.indexOf(airport.iata_code.toString()) >= 0 );
      console.log(this.result) 
    }
  }

  search(){}

  show(airport){
    console.log(airport);
  }

  onSubmit(){
    console.log('OK');
  }



  open(content, airport) {
    this.current = airport;
    let coord: string[] = this.current.coordinates.split(',');
    this.current.lat = parseFloat(coord[0])
    this.current.lng = parseFloat(coord[1])

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


}
