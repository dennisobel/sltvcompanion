import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MoviesProvider {
	APIKEY = "35be3be17f956346becdba89d4f22ca1"

	constructor(public http: Http) {
	
	}

	//Movie Details
	getMovie(movie_id){
		return this.http.get("https://api.themoviedb.org/3/movie/{movie_id}?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
		.map(res => res.json())
	}

	
}
