import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Player } from './player';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client'
import { Router } from '@angular/router';

import { HttpClient} from '@angular/common/http'
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket: Socket;


  constructor( private router: Router, private http: HttpClient ) { 
    // this.socket = io('http://localhost:3000');
    this.socket = io('http://192.168.1.47:3000');
    // this.socket = io('http://140.82.114.4:3000');
    this.socket.on('get data', data =>{
      this.updatePlayers(data.players);
     
      if(this.you == undefined){
        
        this.you=data.players.length-1
        this.router.navigate(['counter'])
      }
   })

//    this.socket.on('changeLife', data =>{
//      this.players[data.players].Life = this.players[data.players].Life+data.amount;
//      this._oPlayers.next(this.players)
//  })

//  this.socket.on('changePoison', data =>{
//   this.players[data.players].Poison = this.players[data.players].Poison+data.amount;
//   this._oPlayers.next(this.players)
// })

//  this.socket.on('change CDMG', data =>{
//   this.commanderDmg[data.i][data.j] = this.commanderDmg[data.i][data.j]+data.amount;
//   this._cmdrDmg.next(this.commanderDmg)
 
// })

this.socket.on("changeGame", data=>{
  if(data.change == "Life"){
    this.players[data.players].Life = this.players[data.players].Life+data.amount;
    this._oPlayers.next(this.players)
  }else if(data.change == "Poison"){
    this.players[data.players].Poison = this.players[data.players].Poison+data.amount;
    this._oPlayers.next(this.players)
  }else if(data.change == "CMDR"){
    this.commanderDmg[data.i][data.j] = this.commanderDmg[data.i][data.j]+data.amount;
    this._cmdrDmg.next(this.commanderDmg)
  }else if(data.change == "start"){
    this.updatecmdr(data)
    this.updateTurnOrder(data)
    this.lturn = 1;
    this._turn.next(this.lturn)
    this.lactiveTurn = 0;
    this.updateActiveTurn(0)
  }else if(data.change == "changeTurn"){
    if(this.lactiveTurn < this.players.length-1){
      this.lactiveTurn = this.lactiveTurn+1;
      this.updateActiveTurn(this.lactiveTurn);
    }else{
      this.lactiveTurn = 0;
      this.updateActiveTurn(this.lactiveTurn);
      this.lturn = this.lturn+1
      this._turn.next(this.lturn)
    }
  }
})

 this.socket.on("startGame", data=>{
   this.updatecmdr(data)
 })

 this.socket.on("NewRoom", data=>{

  this.roomNumber = data;
this._roomNum.next(this.roomNumber);

})

this.socket.on("join room", (data, cName, cImg)=>{
  
if (this.you == 0){
this.addPlayer(data, cName, cImg)
} 

})

  }

  
_oPlayers: Subject<any> = new Subject<[]>();
oPlayers = this._oPlayers.asObservable();

_cmdrDmg: Subject<any> = new Subject<[]>();
cmdrDmg = this._cmdrDmg.asObservable();

_roomNum: Subject<any> = new Subject<[]>();
roomNum = this._roomNum.asObservable();

_turnOrder: Subject<any> = new Subject<[]>();
turnOrder = this._turnOrder.asObservable();

_activeTurn: Subject<any> = new Subject<[]>();
activeTurn = this._activeTurn.asObservable();

_turn: Subject<any> = new Subject<[]>();
turn = this._turn.asObservable();

players: any = [];
lactiveTurn: any;
lturn: any;
lturnOrder: any;
commanderDmg: any = [];
you:any;
roomNumber: any;

getCommander(search: any){
  return (this.http.get(`https://api.scryfall.com/cards/search?name&q=${search}+is%3Acommander`));
}

createRoom(form: any, cName: any, cImg: any){
 
  this.you = 0;
  this.socket.emit('NewRoom');
  const player1 = new Player(form.User, cName, cImg , 40);
  // const player1 = new Player("kevin", "Captain Sisay", "https://c1.scryfall.com/file/scryfall-cards/small/front/b/9/b90df81c-d738-46b3-8e96-9db0b3507ee0.jpg?1562741797" , 40);
  this.players.push(player1)
this.sendGameData();
this.router.navigate(['counter'])
this.sendGameData();
}


joinRoom(num: any, CommanderName:any , CommanderImg: any){
 
  this.roomNumber = num.roomNum
  this._roomNum.next(this.roomNumber);
  
  this.socket.emit('join room', { roomNumber : num, commander: CommanderName, CImage : CommanderImg });
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

updateTurnOrder(data: any){
  // console.log(data, data.turnOrder)
  this.lturnOrder = data.turnOrder;
  this._turnOrder.next(this.lturnOrder)
}

updateActiveTurn(data: any){
  this.lactiveTurn = data;
  this._activeTurn.next(this.lactiveTurn)
}

addPlayer(data: any, cName:any, cImg:any){
  console.log(data)
const player1 = new Player(data.User, cName, cImg, 40);
this.players.push(player1)
this.sendGameData();

}

// subLife(i: number){
//   this.socket.emit('changeLife', {change: "Life", players : i, amount: -1, roomNumber : this.roomNumber});
// }

// addLife(i: number){
//   this.socket.emit('changeLife', {change: "Life", players : i, amount: +1, roomNumber : this.roomNumber});
// }

// subPoison(i: number){
//   this.socket.emit('changePoison', {change: "Poison", players : i, amount: -1, roomNumber : this.roomNumber});
// }

// addPoison(i: number){
//   this.socket.emit('changePoison', {change: "Poison", players : i, amount: +1, roomNumber : this.roomNumber});
// }

// addCmdr(i: number, j:number){
//   this.socket.emit('change CDMG', { i : i, j : j,  amount: +1, roomNumber : this.roomNumber});
// // this.commanderDmg[i][j] = this.commanderDmg[i][j]+1
// this.subLife(i)
// }

// subCmdr(i: number, j:number){
//   this.socket.emit('change CDMG', { i : i, j : j, amount: -1, roomNumber : this.roomNumber});
//   // this.commanderDmg[i][j] = this.commanderDmg[i][j]-1
//   this.addLife(i)
//   }
  

subLife(i: number){
  this.socket.emit('changeGame', {change: "Life", players : i, amount: -1, roomNumber : this.roomNumber});
}

addLife(i: number){
  this.socket.emit('changeGame', {change: "Life", players : i, amount: +1, roomNumber : this.roomNumber});
}

subPoison(i: number){
  this.socket.emit('changeGame', {change: "Poison", players : i, amount: -1, roomNumber : this.roomNumber});
}

addPoison(i: number){
  this.socket.emit('changeGame', {change: "Poison", players : i, amount: +1, roomNumber : this.roomNumber});
}

addCmdr(i: number, j:number){
  this.socket.emit('changeGame', {change: "CMDR", i : i, j : j,  amount: +1, roomNumber : this.roomNumber});
// this.commanderDmg[i][j] = this.commanderDmg[i][j]+1
this.subLife(i)
}

subCmdr(i: number, j:number){
  this.socket.emit('changeGame', {change: "CMDR", i : i, j : j, amount: -1, roomNumber : this.roomNumber});
  // this.commanderDmg[i][j] = this.commanderDmg[i][j]-1
  this.addLife(i)
}

changeTurn(){
  this.socket.emit('changeGame', {change: "changeTurn", roomNumber : this.roomNumber});
}
  

// startGame(turnOrder: any){
  
// for(var i=0; i<this.players.length; i++) {
//   this.commanderDmg[i] = [];
//   for(var j=0; j<this.players.length; j++) {
//       this.commanderDmg[i][j] = 0;
//   }
// }
// this.socket.emit('startGame', { cmdrdmg: this.commanderDmg, turnOrder: turnOrder, roomNumber : this.roomNumber});
// }

startGame(turnOrder: any){
  
  for(var i=0; i<this.players.length; i++) {
    this.commanderDmg[i] = [];
    for(var j=0; j<this.players.length; j++) {
        this.commanderDmg[i][j] = 0;
    }
  }
  this.socket.emit('changeGame', {change: "start", cmdrdmg: this.commanderDmg, turnOrder: turnOrder, roomNumber : this.roomNumber});
  }


  
reset(){
  this.players= [];
// this.others = [];
this.you=undefined;
this.roomNumber=undefined;
this.commanderDmg = [];
}

}
