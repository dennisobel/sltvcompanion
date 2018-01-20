import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatRoomPage } from "../chat-room/chat-room"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Http } from "@angular/http"
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
		public http: Http,
		public authService: AuthProvider,
		public config: ConfigProvider,	
		public utilsProvider: UtilsProvider,	 
		public get_movies: MoviesProvider){

		this.socket.on("new_order", (data) => {
			
			
			console.log("Receiving data from server")
			

			this.utilsProvider.postMovieTvShowCart(data)
			.subscribe(res => {})	

			this.setValue(data)
			this.presentAlert(data)	
		})	
			
	}

	ionViewDidLoad(){
		this.getValue()	
		this.utilsProvider.getCartsPosted()
		.subscribe(res => {
			//this.cart = res.data	
			console.log(res)		
		})


		this.storage.get('user')
		.then((value)=>{
			console.log(value.username)
			this.nickname = value.username
			this.socket.emit("add_user",{username:this.nickname})
		})

		this.config.getTmdbConfig()
		.subscribe(config => {
			this.configuration = config.images
		})
	}

	logout(){
		this.authService.logout()
		this.navCtrl.setRoot(AuthenticationPage)
	}

	// onDelivered(cart){
	// 	this.removeConnected(cart)
	// }

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
			console.log("Data stored")
			console.log(successData)
		})
		.then(()=>{
			this.ionViewDidLoad()
		})
	}

	getValue(){
		this.storage.get("object")
		.then((data)=>{
			console.log(data);
			this.cart = data
			console.log(this.cart)
		})
		return this.cart
	}

	removeConnected(){
		this.storage.remove("object")
		.then(()=>{
			console.log("connected removed")
		})
	}

	clearStorage(){
		this.storage.clear()
	}

}


// getMessages(){
// 	let observable = new Observable(observer => {
// 		this.socket.on("new_order", (data) => {
// 			console.log("receiving data from server...")
// 			observer.next(data);
// 		});
// 	})
// 	return observable
// }


	// this.getMessages().subscribe(cart => {
// 	console.log("receiving data from observable")
// 	console.log("save and fire modal")

// 	this.utilsProvider.postMovieTvShowCart(cart)
// 	.subscribe(res => {})

// 	//display new cart
// 	let _newCartAlert = this.alertCtrl.create({
// 		title:"You have a new order.",
// 		buttons:[
// 			{
// 				text:"View",
// 				handler:()=>{							
// 					let _cartModal = this.modalCtrl.create(NewcartPage, {cart:cart})
// 					_cartModal.present()
// 					//this.ionViewDidLoad()
// 				}
// 			},
// 			{
// 				text:"Cancel",
// 				role:"cancel",
// 				handler:()=>{
// 					//this.ionViewDidLoad()
// 				}
// 			}
// 		]
// 	})
	
// 	_newCartAlert.present()


// })