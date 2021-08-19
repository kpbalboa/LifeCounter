import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Player } from './player';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client'
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket: Socket;


  constructor( private router: Router ) { 
    this.socket = io('http://localhost:3000');
    this.socket.on('get data', data =>{
      this.updatePlayers(data.players);
     
      if(this.you == undefined){
        
        this.you=data.players.length-1
        this.router.navigate(['counter'])
      }
   })

   this.socket.on('changeLife', data =>{
     this.players[data.players].Life = this.players[data.players].Life+data.amount;
     this._oPlayers.next(this.players)
    
 })

 this.socket.on('change CDMG', data =>{
  // this.players[data.players].Life = this.players[data.players].Life+data.amount;
  this.commanderDmg[data.i][data.j] = this.commanderDmg[data.i][data.j]+data.amount;
  this._cmdrDmg.next(this.commanderDmg)
 
})

 this.socket.on("startGame", data=>{
   this.updatecmdr(data)
 })

 this.socket.on("NewRoom", data=>{
  console.log(data);
  this.roomNumber = data;


})

this.socket.on("join room", data=>{
  
  // this.roomNumber = data;
if (this.you == 0){
this.addPlayer(data)
}

})

  }

  
_oPlayers: Subject<any> = new Subject<[]>();
oPlayers = this._oPlayers.asObservable();

_cmdrDmg: Subject<any> = new Subject<[]>();
cmdrDmg = this._cmdrDmg.asObservable();

 players: any = [];
// others: any = [];
commanderDmg: any = [];
you:any;
roomNumber: any;



createRoom(form: any){
 
  this.you = 0;
  this.socket.emit('NewRoom');
  const player1 = new Player(form.User, form.Commander , 40);
  this.players.push(player1)
this.sendGameData();
this.router.navigate(['counter'])
this.sendGameData();
}


joinRoom(num: any){
 
  this.roomNumber = num.roomNum
  this.socket.emit('join room', { roomNumber : num});
  // this.router.navigate(['counter'])

}


sendGameData() {
  this.socket.emit('get data', { players : this.players, roomNumber : this.roomNumber});
}

updatePlayers(data: any){
  this.players = data;
 this._oPlayers.next(this.players)
}

updatecmdr(data: any){
  this.commanderDmg = data.cmdrdmg;
  this._cmdrDmg.next(data.cmdrdmg)
}

addPlayer(data: any){
const player1 = new Player(data.User, data.Commander, 40);
this.players.push(player1)
this.sendGameData();

}

subLife(i: number){
  this.socket.emit('changeLife', { players : i, amount: -1, roomNumber : this.roomNumber});

 
}

addLife(i: number){
  this.socket.emit('changeLife', { players : i, amount: +1, roomNumber : this.roomNumber});
 
}

startGame(){
  

for(var i=0; i<this.players.length; i++) {
  this.commanderDmg[i] = [];
  for(var j=0; j<this.players.length; j++) {
      this.commanderDmg[i][j] = 0;
  }
}
this.socket.emit('startGame', { cmdrdmg: this.commanderDmg, roomNumber : this.roomNumber});
}


addCmdr(i: number, j:number){
  this.socket.emit('change CDMG', { i : i, j : j,  amount: +1, roomNumber : this.roomNumber});
// this.commanderDmg[i][j] = this.commanderDmg[i][j]+1
this.subLife(i)
}

subCmdr(i: number, j:number){
  this.socket.emit('change CDMG', { i : i, j : j, amount: -1, roomNumber : this.roomNumber});
  // this.commanderDmg[i][j] = this.commanderDmg[i][j]-1
  this.addLife(i)
  }
  
reset(){
  this.players= [];
// this.others = [];
this.you=undefined;
this.roomNumber=undefined;
this.commanderDmg = [];
}

}
