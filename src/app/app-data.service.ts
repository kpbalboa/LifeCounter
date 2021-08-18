import { Injectable } from '@angular/core';
import { Player } from './player';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  

  constructor() { }
players: any = [];
others: any = [];
commanderDmg: any = [];



addPlayer(){
  this.others.push(this.others.length);
const player1 = new Player(`Player ${this.players.length+1}`, 40);
this.players.push(player1)
console.log(this.players)
}

subLife(i: number){
  this.players[i].subLife();
 
}

addLife(i: number){
  this.players[i].addLife();
 
}

startGame(){
  for(var i=0; i<this.players.length; i++) {
    this.commanderDmg[i] = new Array(9);
}
console.log(this.commanderDmg)
}

}
