import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TvshowsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TvshowsProvider {
	APIKEY = "35be3be17f956346becdba89d4f22ca1"

  constructor(public http: HttpClient) {
    // console.log('Hello TvshowsProvider Provider');
  }

}
