import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NewComponent } from './new/new.component';
import { JoinComponent } from './join/join.component';


// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {"transports" : ["websocket"]}
//  };

const config: SocketIoConfig = { url: 'http://192.168.1.47:3000', options:{}
 };
//  192.168.1.47
const appRoutes : Routes = [
  { path: 'home', component: HomeComponent, children:[
    { path: 'newGame',  component: NewComponent},
    { path: 'join',  component: JoinComponent}
] },
  { path: 'counter', component: CounterComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    NewComponent,
    JoinComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
     RouterModule.forRoot(appRoutes),
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }