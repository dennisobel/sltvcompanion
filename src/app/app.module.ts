import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatRoomPage } from "../pages/chat-room/chat-room"
import { ListPage } from '../pages/list/list';
import { ChattwoPage } from '../pages/chattwo/chattwo';
import { NewcartPage } from '../pages/newcart/newcart';

import { AuthenticationPage } from '../pages/authentication/authentication';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { TvshowsProvider } from '../providers/tvshows/tvshows';
import { MoviesProvider } from '../providers/movies/movies';
import { AuthProvider } from '../providers/auth/auth';
import { ConfigProvider } from '../providers/config/config';
import { UtilsProvider } from '../providers/utils/utils';
const config: SocketIoConfig = { url: 'https://sltvsocket.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChatRoomPage,
    ChattwoPage,
    NewcartPage,
    AuthenticationPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChatRoomPage,
    ChattwoPage,
    NewcartPage,
    AuthenticationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TvshowsProvider,
    MoviesProvider,
    AuthProvider,
    ConfigProvider,
    AuthProvider,
    UtilsProvider
  ]
})
export class AppModule {}
