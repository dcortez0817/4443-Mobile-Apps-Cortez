import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;//prevents any warnings from TypeScript about the google object

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad(){ //calls loadMap() function when the view is loaded
    this.loadMap(); 
  }

  //creates a new map and loads it into our map div
  loadMap(){

    // (=>) runs when the position has been successfully retrieved
    // these functions replace the callback function
    this.geolocation.getCurrentPosition().then((position) =>{
  
      //sets location to Adelaide
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      //defines some options for our map
      let mapOptions = {
        center: latLng, //supplies the center coordinates
        zoom: 15, //supplies the initial zoom level
        mapTypeId: google.maps.MapTypeId.SATELLITE //supplies the type of map
      }

      //keeps reference to our map
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });

  }

  //creates the marker variable and automatically adds the marker to the map
  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";          
    this.addInfoWindow(marker, content);
  }

  //creates a new info window
  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

}
