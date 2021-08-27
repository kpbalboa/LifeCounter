import { Component, OnInit, Optional } from '@angular/core';

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
 endAlert: boolean = false;
 dmgDlt: any= [];
 lifeGained: any;
 commanders:any
 dead: boolean = false;
 damageIndex: any;
 damageType: any;
 calcJ: any;



  input:string = '';
  result:string = '';
  


subGame(){
  this.data.SubGameData();
}

 
  pressNum(num: string) {
    
    //Do Not Allow . more than once
    if (num==".") {
      if (this.input !="" ) {
 
        const lastNum=this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
 
    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num=="0") {
      if (this.input=="" ) {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
          return;
      }
    }
 
    this.input = this.input + num
    this.calcAnswer();
  }
 
 
  getLastOperand() {
    let pos:number;
    console.log(this.input)
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)
  }
 
 
  pressOperator(op: string) {
 
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
   
    this.input = this.input + op
    this.calcAnswer();
  }
 
 
  clear() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 
  allClear() {
    this.result = '';
    this.input = '';
  }
 
  calcAnswer() {
    let formula = this.input;
 
    let lastKey = formula[formula.length - 1];
 
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    console.log("Formula " +formula);
    this.result = eval(formula);
  }
 
  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }
 

 
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
    this.data.dmgDlt.subscribe((res: any)=>{
      this.dmgDlt = res;
    })
    this.data.lifeGain.subscribe((res: any)=>{
      this.lifeGained = res;
    })
    // this.activeTurn = 0;
    this.data.isDead.subscribe((res: boolean)=>{
      this.dead = res;
    })
    
  }

  searchCommander(){
    let cmdr: any = document.getElementById("commanderSearch")
    this.data.getCommander(cmdr.value).subscribe((res: any) =>{
      console.log(res)
      this.commanders = res.data;
    });
  }

  changeCommander(form: any){
    
   console.log(form.value)
  }

  toggleEndAlert(){
    this.endAlert = !this.endAlert;
  }

  toggleOptions(){
    document.getElementById("extraOptions")?.classList.remove("hidden")
  }


  toggleDammage(i: number, type: string, j: any){
    this.damageType = type;
    this.damageIndex = i;
    this.calcJ= j;
    document.getElementById("damageCalc")?.classList.remove("hidden")
  }

  hideDammage(){
    this.damageType = undefined;
    this.damageIndex = undefined;
    this.calcJ = undefined
    this.result = ''
    this.input = ''
    document.getElementById("damageCalc")?.classList.add("hidden")
  }

  submitDammage(){
if(this.damageType == "damage"){
this.subtractLife(this.damageIndex, Number(this.result))
}else if(this.damageType == "poison"){
  this.addPoison(this.damageIndex, Number(this.result))
  } else if(this.damageType == "commander"){
    this.addCmdrDmg(this.damageIndex, this.calcJ, Number(this.result))
    }

    this.damageType = undefined;
    this.damageIndex = undefined;
    this.calcJ = undefined
    this.result = ''
    this.input = ''
    document.getElementById("damageCalc")?.classList.add("hidden")
  }


  hideOptions(){
    document.getElementById("extraOptions")?.classList.add("hidden")
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

  subtractLife(i: number, amount: number){
    this.data.subLife(i, amount);
  }

  addLife(i: number, amount: number){
    this.data.addLife(i, amount);
    // if(i = this.you){
    //   this.lifeGained ++;
    // }
  }


  subtractPoison(i: number, amount: number){
    this.data.subPoison(i, amount);
  }

  addPoison(i: number, amount: number){
    this.data.addPoison(i, amount);
  }


  startGame(){
  
    this.data.startGame(this.turnOrder);
    this.cmdrDmg=this.data.commanderDmg;
    console.log(this.activeTurnOrder, this.activeTurn)
    
  }
  

  addCmdrDmg(i: number, j: number, amount: number){

    this.data.addCmdr(i, j, amount)
  }

  subCmdrDmg(i: number, j: number, amount: number){
    this.data.subCmdr(i, j, amount)
    
  }

  changeTurn(){
    if(this.endAlert){
      window.alert("trigger warning");
    }
    this.data.changeTurn();
    
  }

  quit(){
    this.data.reset();
  }

}
