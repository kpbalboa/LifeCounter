import { Injectable } from '@angular/core';
import { Player } from './player';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client'
import { Router } from '@angular/router';
import { StoreDataService } from './store-data.service';

import { HttpClient} from '@angular/common/http'




@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket: Socket;


  constructor( private router: Router, private http: HttpClient, private store: StoreDataService ) { 
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

  console.log(this.commanderDmg, data)

  let cmdrdmgCheck;
if (this.dead){
  this.commanderDmg.forEach((element: any) => {
    if(element[this.you] >= 21){
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

if(data.j == this.you){
  this.cmdrdmgtaken[data.from] = this.cmdrdmgtaken[data.from]+data.amount
}


    if(data.j == this.you && this.commanderDmg[data.i][this.you] >= 21 && !this.dead && this.players[this.you].Life > 0){
      this.died(data.from, "Commander Dammage")
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
    this.players.forEach((element: any) => {
      this.cmdrdmgtaken.push(0)
      this.cmdrdmgdlt.push(0)
    });
  
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
      this.place = this.players.length - this.deadplayers.length
    } 
    this.deadplayers.push(data.player)

    if(data.dealtBy == this.you){
this.killed.push({"player" : data.player, "diedTo" : data.diedTo})
    }
    console.log(data.dealtBy)
    console.log(this.killed)
    if(this.players.length == this.deadplayers.length +1){
      this.gameOver = true;
      this._isGameOver.next(this.gameOver)
    }
    if(this.players.length == this.deadplayers.length +1 && this.dead == false){
      this.win = data.diedTo;
      this.place = 1;
      this.liveTurns =this.lturn;
      this.gameOver = true;
      this._isGameOver.next(this.gameOver)
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
    
  }else if(data.change == "GameOver"){
    this.gameOver = true;
      this._isGameOver.next(this.gameOver)
      if(this.win == undefined){
        this.place == 2
      }else{
        this.place == 1
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

this.socket.on("join room", (data, cName, cImg, logged, user, pName, pImg)=>{
if (this.you == 0){
this.addPlayer(data, cName, cImg, logged, user, pName, pImg)
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

_isGameOver: Subject<any> = new Subject<[]>();
isGameOver = this._isGameOver.asObservable();

_commanderList: Subject<any> = new Subject<[]>();
commanderList = this._commanderList.asObservable();

players: any = [];
lactiveTurn: any;
lturn: any;
lturnOrder: any;
commanderDmg: any = [];
playerDmg: any = [];
commanders: any = [];
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
win: any;
liveTurns:any;
gameOver: boolean = false;
cmdrdmgdlt:any=[];
cmdrdmgtaken:any=[];

SubGameData(){
this.store.subGamneData(this.players, this.localdmgDlt, this.localLifegain, this.place, this.win, this.commanderDmg, this.lturn, this.liveTurns, this.killedBy, this.killed, this.diedTo, this.you, this.cmdrdmgtaken, this.cmdrdmgdlt)
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
  this.liveTurns = this.lturn;
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

getWincons(search: any){
  return (this.http.get(`https://api.scryfall.com/cards/search?name&q=${search}+%28oracle%3Awin+oracle%3Athe+oracle%3Agame%29`));
}

getLosecons(search: any){
  return (this.http.get(`https://api.scryfall.com/cards/search?name&q=${search}+%28oracle%3Alose+oracle%3Athe+oracle%3Agame%29`));
}

winGame(value: any){
this.win = value;
this.socket.emit('changeGame', {change: "GameOver", roomNumber : this.roomNumber});
}
loseGame(lose: any){
this.died(this.you, lose);
}

createRoom(form: any, cName: any, cImg: any, partner?: any, partnerImg?: any){

  if(form.Life == ''){
    this.startLife = 40
  }else{
    this.startLife = form.Life;
  }

  let player1;
  this.you = 0;
  this.socket.emit('NewRoom');
  if(this.userName == undefined){
  player1 = new Player(form.User, cName, cImg , this.startLife, false, partner, partnerImg);
  }else{
    player1 = new Player(this.userName, cName, cImg , this.startLife, true,  partner, partnerImg);
  }
  this.players.push(player1)
this.sendGameData();
this.router.navigate(['counter'])
this.sendGameData();
}


joinRoom(num: any, CommanderName:any , CommanderImg: any,  partner?: any, partnerImg?: any){
 
  this.roomNumber = num.roomNum
  this._roomNum.next(this.roomNumber);



  if(this.userName == undefined){

    this.socket.emit('join room', { roomNumber : num, commander: CommanderName, CImage : CommanderImg, LoggedIn: false, UserName: num.User, partner, partnerImg});
    }else{
      this.socket.emit('join room', { roomNumber : num, commander: CommanderName, CImage : CommanderImg, LoggedIn: true, UserName: this.userName, partner, partnerImg });
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

  this.commanders = data.commanderList;
  this._commanderList.next(this.commanders)
  this.commanderDmg = data.cmdrdmg;
  this._cmdrDmg.next(data.cmdrdmg)
}

updatePlayerDmg(data: any){
  this.localdmgDlt = data.playerDmg
}

updateTurnOrder(data: any){
  this.lturnOrder = data.turnOrder;
  this._turnOrder.next(this.lturnOrder)
}

updateActiveTurn(data: any){
  this.lactiveTurn = data;
  this._activeTurn.next(this.lactiveTurn)
}

addPlayer(data: any, cName:any, cImg:any, logged: boolean, user: string, pName?: any, pImg?: any){
const player1 = new Player(user, cName, cImg, this.startLife, logged, pName, pImg);
this.players.push(player1)
this.sendGameData();


}

  

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
  this.socket.emit('changeGame', {change: "CMDR", i : i, j : j, from: this.you,  amount: amount, roomNumber : this.roomNumber});

  this.cmdrdmgdlt[j] = this.cmdrdmgdlt[j] + amount;


this.subLife(j, amount)
}

subCmdr(i: number, j:number, amount: number){
  let number = 0-amount;
  this.socket.emit('changeGame', {change: "CMDR", i : i, j : j, from: this.you, amount: number, roomNumber : this.roomNumber});
  this.addLife(j, amount)

  this.cmdrdmgdlt[j] = this.cmdrdmgdlt[j] - amount;

}

changeTurn(){
  this.socket.emit('changeGame', {change: "changeTurn", roomNumber : this.roomNumber});
}
  


startGame(turnOrder: any){
  
  for(var i=0; i<this.players.length; i++) {
    this.playerDmg[i] = [];
    
    for(var j=0; j<this.players.length; j++) {
        this.playerDmg[i][j] = 0;
    }
  }

  this.players.forEach((player: any) => {
this.commanders.push({"commander" : player.Commander, "image": player.commanderImg})
if (player.partner != undefined){
  this.commanders.push({"commander" : player.partner, "image": player.partnerImg})
}
  });


  for(var i=0; i<this.commanders.length; i++) {
    this.commanderDmg[i] = [];
    for(var j=0; j<this.players.length; j++) {
        this.commanderDmg[i][j] = 0;
    }
  }



  this.socket.emit('changeGame', {change: "start", cmdrdmg: this.commanderDmg, playerDmg : this.commanderDmg, turnOrder: turnOrder, commanderList: this.commanders, roomNumber : this.roomNumber});
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
