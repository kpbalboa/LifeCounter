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
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { StatsHomeComponent } from './stats-home/stats-home.component';
import { YouStatsComponent } from './you-stats/you-stats.component';
import { FriendstatsComponent } from './friendstats/friendstats.component';
import { GoogleChartComponent, GoogleChartsModule } from 'angular-google-charts';
import { ChartsModule } from 'ng2-charts';


// const config: SocketIoConfig = { url: 'http://localhost:3000', options: {"transports" : ["websocket"]}
//  };

const config: SocketIoConfig = { url: 'http://192.168.1.47:3000', options:{}
 };
//  192.168.1.47
const appRoutes : Routes = [
  { path: 'home', component: HomeComponent, children:[
    { path: 'newGame',  component: NewComponent},
    { path: 'join',  component: JoinComponent},
    { path: 'newUser',  component: CreateAccountComponent},
    { path: 'login',  component: LoginComponent}
] },
  { path: 'counter', component: CounterComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'stats', component: StatsHomeComponent, children:[
      {path: 'yourStats', component: YouStatsComponent},
      {path:'UserStats', component: FriendstatsComponent}
    ]
  }
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CounterComponent,
    NewComponent,
    JoinComponent,
    CreateAccountComponent,
    LoginComponent,
    StatsHomeComponent,
    YouStatsComponent,
    FriendstatsComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
     RouterModule.forRoot(appRoutes, { useHash: true}),
    FormsModule,
    SocketIoModule.forRoot(config),
    GoogleChartsModule,
    ChartsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
