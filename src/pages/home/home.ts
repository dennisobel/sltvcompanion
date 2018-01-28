import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
// import { ChatRoomPage } from "../chat-room/chat-room"
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
// import { Http } from "@angular/http"
import { ConfigProvider } from '../../providers/config/config'
import { MoviesProvider } from '../../providers/movies/movies'
import { AuthenticationPage } from '../authentication/authentication';
import { NewcartPage } from '../newcart/newcart';
import { AuthProvider } from '../../providers/auth/auth';
import { UtilsProvider } from "../../providers/utils/utils";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	listorders="orders"
	nickname = "";
	cart:any[]=[];
	delivered:any[]=[];
	_delivered:any[]=[];
	_del:any[]=[];
	movies:any[]=[];
	tvshows:any[]=[];
	phone_number:any;
	base_url:any;
	poster_sizes:any;
	backdrop_sizes:any;
	configuration:any;
	oldcart:any;
	neworder:any;
	_data:any[]=[];
	APIKEY = "35be3be17f956346becdba89d4f22ca1"


	constructor(
		public navCtrl: NavController, 
		public modalCtrl:ModalController,
		public alertCtrl: AlertController,
		public socket: Socket, 
		public storage: Storage,
		// public http: Http,
		public authService: AuthProvider,
		public config: ConfigProvider,	
		public utilsProvider: UtilsProvider,	 
		public get_movies: MoviesProvider){

		this.socket.on("new_order", (data) => {		
			
			// console.log("Receiving data from server")
			

			this.utilsProvider.postMovieTvShowCart(data)
			.subscribe(res => {})	

			this.setValue(data)
			this.presentAlert(data)	
		})	
			
	}

	ionViewDidLoad(){
		this.getValue()	
		this.getDelivered()
		this.utilsProvider.getCartsPosted()
		.subscribe(res => {
			//this.cart = res.data	
			//console.log(res)		
		})


		this.storage.get('user')
		.then((value)=>{
			// console.log(value.username)
			this.nickname = value.username
			this.socket.emit("add_user",{username:this.nickname})
		})

		this.config.getTmdbConfig()
		.subscribe(config => {
			this.configuration = config.images
		})
	}

	ionViewDidLeave(){
		this.storage.get('user')
		.then((value)=>{
			let nickname = value.username
			// console.log(nickname)
			// console.log(value.username)
			this.socket.emit("offline",{username:nickname})
		})
	}

	logout(){
		this.authService.logout()
		this.navCtrl.setRoot(AuthenticationPage)
	}

	onDelivered(cart){

		let alert = this.alertCtrl.create({
			title:"You sure you wanna mark as delivered?",
			buttons:[
				{
					text:"Sure",
					handler:()=>{							
						this.removeConnected(cart)
						this.getValue()
					}			
				},
				{
					text:"My Bad",
					role:"cancel",
					handler:()=>{
						//this.ionViewDidLoad()
					}
				}				
			]			
		})

		alert.present()

	}

	presentAlert(neworder){		
		let _newcart = this.alertCtrl.create({
			//neworder:this.neworder,
			title:"New Order",
			buttons:[
				{
					text:"View",
					handler:()=>{							
						let _cartModal = this.modalCtrl.create(NewcartPage, {cart:neworder})
						_cartModal.present()
						//this.ionViewDidLoad()
					}			
				},
				{
					text:"Cancel",
					role:"cancel",
					handler:()=>{
						//this.ionViewDidLoad()
					}
				}				
			]				
		})
		_newcart.present()		
		this.ionViewDidLoad()
	}	

	setValue(data){
		this._data.push(data)
		this.storage.set("object",this._data)
		.then((successData)=>{
			// console.log("Data stored")
			// console.log(successData)
		})
		.then(()=>{
			this.ionViewDidLoad()
		})
	}

	getValue(){
		this.storage.get("object")
		.then((data)=>{
			this.cart = data
			// console.log(this.cart)
		})
		return this.cart
	}

	getDelivered(){
		this.storage.get("delivered")
		.then((data)=>{
			this.delivered = data
			// console.log(this.delivered)
		})
		return this.delivered
	}

	removeConnected(cart){
		let index = this.cart.indexOf(cart)
		this._del.push(this.cart[index])
		this.cart.splice(index,1)
		
		// console.log(this._del)
		this.storage.set("object",this.cart)
		.then((successData)=>{
			this._delivered.push(successData)
		})

		this.storage.set("delivered",this._del)
		.then((successDelivered)=>{
			// console.log(successDelivered)
		})
		.then(()=>{
			this.ionViewDidLoad()
		})		
	}

	clearStorage(){
		this.storage.clear()
	}

}


