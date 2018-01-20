import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-chattwo',
  templateUrl: 'chattwo.html',
})
export class ChattwoPage {
	message:string = "";

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private socket: Socket
	){
		this.socket.on("Message",(data)=>{
			console.log(data);
		})
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad ChattwoPage');
	}

	sendMessage(){
		this.socket.emit("Message", {message: this.message})
	}

}
