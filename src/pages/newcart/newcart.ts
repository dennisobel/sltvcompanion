import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from "@angular/http"


@Component({
  selector: 'page-newcart',
  templateUrl: 'newcart.html',
})
export class NewcartPage {
	cart:any;
	movies:any;
	tvshows:any;
	base_url:any;
	poster_sizes:any;
	backdrop_sizes:any;

	constructor(
		public navCtrl: NavController, 
		public viewCtrl:ViewController,
		public http:Http,
		public navParams: NavParams) {
	}

	ionViewDidLoad(){
		this.cart = this.navParams.get("cart")		
		this.tvshows = this.cart.tvshows
		this.movies = this.cart.movies
		console.log(this.tvshows)


		//config
		this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
	  	.map(res => {
	  		this.base_url = res.json().images.base_url
	  		this.poster_sizes = res.json().images.poster_sizes[0]
	  		this.backdrop_sizes = res.json().images.poster_sizes[2]
	  	})
	  	.subscribe(tmdbConfig => {
		})
	
	}

  	//close modal
	onClose(remove = false){
	    this.viewCtrl.dismiss(remove);
	}

}
