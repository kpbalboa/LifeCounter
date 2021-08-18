import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  constructor( private data: DataService) { }

 others: any = [];
 players: any =[];
 cmdrDmg:any = [];

  ngOnInit(): void {
    this.data.addPlayer();
    this.players = this.data.players;
  }

  addPlayer(){
    this.data.addPlayer();
    this.others= this.data.others;
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
