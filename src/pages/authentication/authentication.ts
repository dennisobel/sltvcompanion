import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
 
@Component({
  selector: 'authentication',
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {
 
    username: string;
    password: string;
    loading: any;
    usersessionarray:any[]=[];
 
    constructor(
        public navCtrl: NavController, 
        public authService: AuthProvider, 
        public loadingCtrl: LoadingController,
        public toastCtrll: ToastController) {
 
    }
 
    ionViewDidLoad() {
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            username: this.username,
            password: this.password
        };
 
        this.authService.login(credentials)
        .then((result) => {
            //create socket nickname
            //this.socket.emit("add_user",{username:credentials.username})
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
            //LOGIN ERROR WRITE ALERT HERE!!!!
            let toast = this.toastCtrll.create({
                message:"Rectify login credentials and try again.",
                duration: 3000,
                position: "bottom",
                dismissOnPageChange: true 
            })

            toast.onDidDismiss(()=>{
                console.log("Dismissed toast")
            });

            toast.present();
        });
 
    }

    register(){
        this.showLoader();

        let details = {
            username: this.username,
            password: this.password
        };
        
        this.authService.createAccount(details)
        .then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
        })
        .then(()=>{

        })

    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}