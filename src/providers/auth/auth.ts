import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthProvider {
 
  public token: any;
  public user_number: any;
  public user:any;
 
  constructor(public http: Http, public storage: Storage) {
 
  }
 
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('https://sltvcompanionserver.herokuapp.com/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
            });
 
        });        
 
    });
 
  }
 
  createAccount(details){   
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://sltvcompanionserver.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post('https://sltvcompanionserver.herokuapp.com/api/auth/login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
           console.log(res.json())
            let data = res.json();
            this.token = data.token;
            this.user = data.user;
            this.storage.set('token', data.token);
            this.storage.set('user', data.user)
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
  } 
}