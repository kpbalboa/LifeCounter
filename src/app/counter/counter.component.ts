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

//  dealCMDas: any;
 

 
  ngOnInit(): void {
    this.you = this.data.you
    // this.dealCMDas = this.you;
    this.players = this.data.players;
    
    this.data.oPlayers.subscribe((data)=>{
     this.players= data
    })
    
    this.data.cmdrDmg.subscribe((data)=>{
      this.cmdrDmg= data
     })
     this.data.roomNum.subscribe((data: any)=>{
       this.roomNum = data
     })
    
  }



  changeSource(j:any){
    console.log("change")
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
    this.data.startGame();
    this.cmdrDmg=this.data.commanderDmg;
  }

  addCmdrDmg(i: number){
    console.log(this.cmdrDmg[i][this.you])

    this.data.addCmdr(i, this.you)
  }

  subCmdrDmg(i: number){
    this.data.subCmdr(i, this.you)
    
  }


}
