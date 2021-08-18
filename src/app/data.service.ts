import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Player } from './player';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket: Socket;


  constructor() { 
    this.socket = io('http://localhost:3000');
    
  }
players: any = [];
others: any = [];
commanderDmg: any = [];

sendMessage(msg: string) {
  this.socket.emit('chat message', { message: "hello"});
}

// HANDLER example
onNewMessage() {
  return new Observable(observer => {
    this.socket.on('chat message', msg => {
      console.log(msg)
      observer.next(msg);
    });
  });
}

addPlayer(){
  this.others.push(this.others.length);
const player1 = new Player(`Player ${this.players.length+1}`, 40);
this.players.push(player1)
}

subLife(i: number){
  this.players[i].subLife();
 
}

addLife(i: number){
  this.players[i].addLife();
 
}

startGame(){
  this.sendMessage("hello")

for(var i=0; i<this.players.length; i++) {
  this.commanderDmg[i] = [];
  for(var j=0; j<this.players.length; j++) {
      this.commanderDmg[i][j] = 0;
  }
}

}


addCmdr(i: number, j:number){
this.commanderDmg[i][j] = this.commanderDmg[i][j]+1
this.subLife(i)
}

subCmdr(i: number, j:number){
  this.commanderDmg[i][j] = this.commanderDmg[i][j]-1
  this.addLife(i)
  }
  
reset(){
  this.players= [];
this.others = [];
this.commanderDmg = [];
}

}
