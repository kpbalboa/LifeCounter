import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Player } from './player';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client'
import { Router } from '@angular/router';

import { HttpClient} from '@angular/common/http'




@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket: Socket;


  constructor( private router: Router, private http: HttpClient ) { 
    this.socket = io('http://localhost:3000');
    // this.socket = io('http://192.168.1.47:3000');
    // this.socket = io('http://140.82.114.4:3000');
    this.socket.on('get data', data =>{
      this.updatePlayers(data.players);
      if(this.you == undefined){
        
        this.you=data.players.length-1
        this.router.navigate(['counter'])
      }
   })

 



this.socket.on("changeGame", data=>{

  let cmdrdmgCheck;
if (this.dead){
  this.commanderDmg[this.you].forEach((element: any) => {
    if(element >= 21){
      cmdrdmgCheck = false;
    }
  });
}
if (cmdrdmgCheck == undefined){
  cmdrdmgCheck = true;
}

  if(data.change == "Life"){
    this.players[data.players].Life = this.players[data.players].Life+data.amount;
    this._oPlayers.next(this.players)
    if(data.players == this.you && data.dealtBy == this.you && data.amount >= 1){
    this.localLifegain = this.localLifegain +data.amount;
   this._lifeGain.next(this.localLifegain)

    }else{
    this.localdmgDlt[data.dealtBy][data.players] = this.localdmgDlt[data.dealtBy][data.players] - data.amount;
    this._dmgDlt.next(this.localdmgDlt)
}

//
// let cmdrdmgCheck;
// if (this.dead){
//   this.commanderDmg[this.you].forEach((element: any) => {
//     if(element >= 21){
//       cmdrdmgCheck = false;
//     }
//   });
// }


if(data.players == this.you && this.players[this.you].Life <= 0  && !this.dead){

  this.died(data.dealtBy, "Dammage")
}else if (data.players == this.you && this.dead && this.players[this.you].Life > 0 && this.players[this.you].Poison < 10 &&  cmdrdmgCheck){
  this.unDie(data.dealtBy)
}

  }else if(data.change == "Poison"){
    this.players[data.players].Poison = this.players[data.players].Poison+data.amount;
    this._oPlayers.next(this.players )
    this.localdmgDlt[data.dealtBy][data.players] = this.localdmgDlt[data.dealtBy][data.players] + data.amount;
  this._dmgDlt.next(this.localdmgDlt)


  if(data.players == this.you && this.players[this.you].Poison >= 10 && !this.dead){
    this.died(data.dealtBy, "Infect")
  }else if (data.players == this.you && this.dead && this.players[this.you].Life > 0 && this.players[this.you].Poison < 10 &&  cmdrdmgCheck){
    this.unDie(data.dealtBy)
  }


  }else if(data.change == "CMDR"){
    this.commanderDmg[data.i][data.j] = this.commanderDmg[data.i][data.j]+data.amount;
    this._cmdrDmg.next(this.commanderDmg)


    if(data.i == this.you && this.commanderDmg[this.you][data.j] >= 21 && !this.dead && this.players[this.you].Life > 0){
      this.died(data.j, "Commander Dammage")
    }else if (data.players == this.you && this.dead && this.players[this.you].Life > 0 && this.players[this.you].Poison < 10  && cmdrdmgCheck){
      this.unDie(data.dealtBy)
    }

  }else if(data.change == "start"){
    this.localdmgDlt = data.playerDmg;
    this._dmgDlt.next(this.localdmgDlt)
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
  }else if(data.change == "Died"){
    if (data.player == this.you){
      this.place == this.players.length - this.deadplayers.length
    } 
    this.deadplayers.push(data.player)

    if(data.dealtBy == this.you){
this.killed.push({"player" : data.player, "diedTo" : data.diedTo})
    }
    
  }else if(data.change == "unDied"){
    if (data.player == this.you){
      this.place == undefined
    } 
    const isplayer = (element: any) => element = data.player;
    this.deadplayers.splice(this.deadplayers.findIndex(isplayer))
    if(data.dealtBy == this.you){
      const isplayer = (element: any) => element.player = data.player
this.killed.splice(this.killed.findIndex(isplayer));
    }
    
  }
})

 this.socket.on("startGame", data=>{
   this.updatecmdr(data)
   this.updatePlayerDmg(data);
 })

 this.socket.on("NewRoom", data=>{

  this.roomNumber = data;
this._roomNum.next(this.roomNumber);

})

this.socket.on("join room", (data, cName, cImg, logged, user)=>{
if (this.you == 0){
this.addPlayer(data, cName, cImg, logged, user)
} 

})

this._User_Name.next(window.localStorage.userName)
this.userName = window.localStorage.userName;
this.user_id = window.localStorage.user_id;

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

_dmgDlt: Subject<any> = new Subject<[]>();
dmgDlt = this._dmgDlt.asObservable();

_lifeGain: Subject<any> = new Subject<[]>();
lifeGain = this._lifeGain.asObservable();

_User_Name: Subject<any> = new Subject<[]>();
User_Name = this._User_Name.asObservable();

_isDead: Subject<any> = new Subject<[]>();
isDead = this._isDead.asObservable();

players: any = [];
lactiveTurn: any;
lturn: any;
lturnOrder: any;
commanderDmg: any = [];
you:any;
roomNumber: any;
localdmgDlt: any;
localLifegain: number = 0;
lifeGained: number = 0
loggedIn: boolean = false
userName: any;
user_id: any;
storage : any = window.localStorage;
dead: boolean = false;
deadplayers: any = [];
place: any;
killedBy: any;
diedTo:any;
killed: any = [];
startLife: any;


SubGameData(){

}

login(user: any){
this.userName = user.user_name;
this.user_id = user.user_id;
this.loggedIn = true;
this.storage.setItem("user_id", this.user_id)
this.storage.setItem("userName", this.userName)
this._User_Name.next(this.userName)
this.router.navigate(['home'])
}

died(killedYou: number, diedTo: string){
  this.dead = true;
  this.killedBy = killedYou;
  this.diedTo = diedTo
  this._isDead.next(true)
  this.socket.emit('changeGame', {change: "Died", player : this.you, dealtBy: killedYou, diedTo: diedTo,  roomNumber : this.roomNumber});
}
unDie(killedYou: number){
  this.dead = false;
  this.killedBy = undefined;
  this.diedTo = undefined
  this._isDead.next(false)
  this.socket.emit('changeGame', {change: "unDied", player : this.you, dealtBy: killedYou,  roomNumber : this.roomNumber});
}

logOut(){
  this.storage.clear()
  this.userName = undefined;
  this.user_id = undefined;
}

getCommander(search: any){
  return (this.http.get(`https://api.scryfall.com/cards/search?name&q=${search}+is%3Acommander`));
}

createRoom(form: any, cName: any, cImg: any){

  if(form.Life == ''){
    this.startLife = 40
  }else{
    this.startLife = form.Life;
  }

  let player1;
  this.you = 0;
  this.socket.emit('NewRoom');
  if(this.userName == undefined){
  player1 = new Player(form.User, cName, cImg , this.startLife, false);
  }else{
    player1 = new Player(this.userName, cName, cImg , this.startLife, true);
  }
  this.players.push(player1)
this.sendGameData();
this.router.navigate(['counter'])
this.sendGameData();
}


joinRoom(num: any, CommanderName:any , CommanderImg: any){
 
  this.roomNumber = num.roomNum
  this._roomNum.next(this.roomNumber);



  if(this.userName == undefined){

    this.socket.emit('join room', { roomNumber : num, commander: CommanderName, CImage : CommanderImg, LoggedIn: false, UserName: num.User});
    }else{
      this.socket.emit('join room', { roomNumber : num, commander: CommanderName, CImage : CommanderImg, LoggedIn: true, UserName: this.userName });
    }

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

updatePlayerDmg(data: any){
  this.localdmgDlt = data.cmdrdmg
}

updateTurnOrder(data: any){
  this.lturnOrder = data.turnOrder;
  this._turnOrder.next(this.lturnOrder)
}

updateActiveTurn(data: any){
  this.lactiveTurn = data;
  this._activeTurn.next(this.lactiveTurn)
}

addPlayer(data: any, cName:any, cImg:any, logged: boolean, user: string){
const player1 = new Player(user, cName, cImg, this.startLife, logged);
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
  

subLife(i: number, amount: number){
  let number = 0-amount;
  this.socket.emit('changeGame', {change: "Life", players : i, dealtBy: this.you, amount: number, roomNumber : this.roomNumber});
}

addLife(i: number, amount: number){
  
  this.socket.emit('changeGame', {change: "Life", players : i,  dealtBy: this.you, amount: amount, roomNumber : this.roomNumber});
  if(i == this.you){
    this.lifeGained++;
  }
}

subPoison(i: number, amount: number){
  let number = 0-amount;
  this.socket.emit('changeGame', {change: "Poison", players : i,  dealtBy: this.you, amount: number, roomNumber : this.roomNumber});
}

addPoison(i: number, amount: number){
  
  this.socket.emit('changeGame', {change: "Poison", players : i,  dealtBy: this.you, amount: amount, roomNumber : this.roomNumber});
}

addCmdr(i: number, j:number, amount: number){
  let number = 0-amount;
  this.socket.emit('changeGame', {change: "CMDR", i : i, j : j,  amount: amount, roomNumber : this.roomNumber});
// this.commanderDmg[i][j] = this.commanderDmg[i][j]+1

this.subLife(i, amount)
}

subCmdr(i: number, j:number, amount: number){
  let number = 0-amount;
  this.socket.emit('changeGame', {change: "CMDR", i : i, j : j, amount: number, roomNumber : this.roomNumber});
  // this.commanderDmg[i][j] = this.commanderDmg[i][j]-1
  this.addLife(i, amount)
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
  this.socket.emit('changeGame', {change: "start", cmdrdmg: this.commanderDmg, playerDmg : this.commanderDmg, turnOrder: turnOrder, roomNumber : this.roomNumber});
  }


  
reset(){
//   this.players= [];
// this.you=undefined;
// this.roomNumber=undefined;
// this.commanderDmg = [];

this.router.navigate(['home'])
// window.location.reload()
setTimeout(() => {  window.location.reload() }, 0);

}

}
