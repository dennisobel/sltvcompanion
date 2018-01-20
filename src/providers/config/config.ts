import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ConfigProvider {
	apiKey = "35be3be17f956346becdba89d4f22ca1"

	constructor(public http: Http){}

	getTmdbConfig(){
		return this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
		.map(res => res.json())
	}

}
