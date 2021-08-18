import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';



// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {"transports" : ["websocket"]}
//  };

const config: SocketIoConfig = { url: 'http://localhost:3000', options:{}
 };

const appRoutes : Routes = [
  { path: 'home', component: HomeComponent },
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
    CounterComponent
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
