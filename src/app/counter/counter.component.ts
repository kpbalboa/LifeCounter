import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  constructor( private data: DataService) { }

 players: any =[];
 cmdrDmg:any = [];
 you: number = 0
 roomNum: any;
 turnOrder: any[]= [];
 activeTurnOrder: any;
 activeTurn: number = 0;
 turnNumber: number = 1;
 alert :boolean = false;

//  dealCMDas: any;
 

 
  ngOnInit(): void {
    this.you = this.data.you
    // this.dealCMDas = this.you;
    this.players = this.data.players;
    
    this.data.oPlayers.subscribe((data)=>{
     this.players= data
     let order: any = []
     this.players.forEach((player: any, index: number) => {
       order.push(index)
     });
     this.turnOrder = order
    })
    
    this.data.cmdrDmg.subscribe((data)=>{
      this.cmdrDmg= data
     })
     this.data.roomNum.subscribe((data: any)=>{
       console.log(data)
       this.roomNum = data
     })
     this.data.turnOrder.subscribe((res: any)=>{
       this.activeTurnOrder = res;
     })
     this.data.activeTurn.subscribe((res: any)=>{
      this.activeTurn = res;
     if(this.alert && this.activeTurnOrder[this.activeTurn] == this.you){
      window.alert("trigger warning");
     }
      
    })
    this.data.turn.subscribe((res: any)=>{
      this.turnNumber = res;
    })
    // this.activeTurn = 0;
    
  }


  seeMore(i: any){
    let item: any = document.getElementById("cmdr"+i)
    item.classList.remove("hidden")
  }
  hide(i: any){
    let item: any = document.getElementById("cmdr"+i)
    item.classList.add("hidden")
  }

  toggleAlert(){
    this.alert = !this.alert;
    console.log(this.alert)
  }

  moveUp(i:any){
    let item = this.turnOrder[i];
    this.turnOrder.splice(i, 1)
    this.turnOrder.splice(i-1, 0, item)
  }
  moveDown(i:any){
    let item = this.turnOrder[i];
    this.turnOrder.splice(i, 1)
    this.turnOrder.splice(i+1, 0, item)
  }


  changeSource(j:any){
    // this.dealCMDas = j
  }

  subtractLife(i: number){
    this.data.subLife(i);
  }

  addLife(i: number){
    this.data.addLife(i);
  }


  subtractPoison(i: number){
    this.data.subPoison(i);
  }

  addPoison(i: number){
    this.data.addPoison(i);
  }


  startGame(){
  
    this.data.startGame(this.turnOrder);
    this.cmdrDmg=this.data.commanderDmg;
    console.log(this.activeTurnOrder, this.activeTurn)
    
  }
  

  addCmdrDmg(i: number, j: number){

    this.data.addCmdr(i, j)
  }

  subCmdrDmg(i: number, j: number){
    this.data.subCmdr(i, j)
    
  }

  changeTurn(){
    this.data.changeTurn();
    console.log(this.activeTurnOrder, this.activeTurn)
    
  }


}
