import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilsProvider {

	constructor(
		public http: Http
	){}

	//get carts posted
	getCartsPosted(){		
		let headers = new Headers();
      	headers.append("Accept","application/json");
  		headers.append("Content-Type", "application/json");

  		return this.http.get("https://sltvcompanionserver.herokuapp.com/cart/getcart")
  		.map(res => res.json())		
	}

	postMovieTvShowCart(data){
		//preloader
		// console.log("calling postMovieTvShowCart");			
  		let headers = new Headers();
      	headers.append("Accept","application/json");
  		headers.append("Content-Type", "application/json");

  		return this.http.post("https://sltvcompanionserver.herokuapp.com/cart/createcart", JSON.stringify(data),{headers:headers})
  		.map(res=>res.json())
	  	//kill loader
	}
}
