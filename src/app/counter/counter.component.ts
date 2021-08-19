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
 

 
  ngOnInit(): void {
    this.you = this.data.you
    console.log(this.data.players)
    // if(this.you == undefined){
    // this.data.addPlayer();
    // }
    this.players = this.data.players;
    this.data.oPlayers.subscribe((data)=>{
     this.players= data
    })
    // this.data.sendGameData();
    // this.you = this.data.you
    this.data.cmdrDmg.subscribe((data)=>{
      this.cmdrDmg= data
     })
     
    
  }

  addPlayer(){
    // this.data.addPlayer();
    console.log(this.players)
  }

  subtractLife(i: number){
    this.data.subLife(i);
  }

  addLife(i: number){
    this.data.addLife(i);
  }

  startGame(){
    this.data.startGame();
    this.cmdrDmg=this.data.commanderDmg;
  }

  addCmdrDmg(i: number, j: number){
    this.data.addCmdr(i, j)
  }

  subCmdrDmg(i: number, j: number){
    this.data.subCmdr(i, j)
  }


}
