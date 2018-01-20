import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
	messages:any[] = [];
	nickname:any = "";
	message:string = "";

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private socket: Socket, 
		private tosatCtrl: ToastController){

		this.nickname = this.navParams.get("nickname");
		console.log(this.nickname)

		this.getMessages().subscribe(message => {
			this.messages.push(message);
			console.log(message)
		});

		this.socket.on("add-message",(data)=>{
			console.log(data)
		})

		this.getUsers().subscribe(data => {
			let user = data["user"];
			if(data["event"] === "left"){
				this.showToast("User left: "+ user);
			}
		});
	}

	sendMessage(){
		this.socket.emit("add-message", {text:this.message});
		this.message="";
	}

	getMessages(){
		let observable = new Observable(observer => {
			this.socket.on("add-message", (data) => {
				observer.next(data);
			});
		})
		return observable
	}

	getUsers(){
		let observable = new Observable(observer => {
			this.socket.on("users-changed",(data) => {
				observer.next(data);
			});
		});
		return observable;
	}

	ionViewDidLoad(){
		//this.socket.disconnect();
	}

	showToast(msg){
		let toast = this.tosatCtrl.create({
			message: msg,
			duration: 2000
		});
		toast.present();
	}

}
