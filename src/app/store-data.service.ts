import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../app/data.service';
import { stringify } from '@angular/compiler/src/util';



@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor(private http: HttpClient) { }

  createAccount(item: any){

    
    return this.http.post('https://lifedataapp.us:5000/createUser', item)
    

  }

  login(data: any){
    return this.http.post('https://lifedataapp.us:5000/login', data)

  }

  subGamneData(players: any, localdmgDlt: any, localLifegain: any, place: any, win: any, commanderDmg: any, lturn: any, turnsAlive: any, killedBy: any, killed: any, diedTo: any, you: number, ctaken: any, cdelt:any){
  
    console.log( players);
    let op1: any;
    let op2 : any;
    let op3:any;
    let opc1:any;
    let opc2:any;
    let opc3:any;
    let cmd1: any;
    let cmd2: any;
    let cmd3: any;
    let cmdBy1: any;
    let cmdBy2: any;
    let cmdBy3: any;
    let D1: any;
    let D2: any;
    let D3: any;
    let DBy1: any;
    let DBy2: any;
    let DBy3: any;
    let totalDelt: any = 0;
    let totalTaken: any = 0;

localdmgDlt[you].forEach((e:any, i:any) => {
  if(you != i){
    totalDelt = totalDelt+e
  }
});

localdmgDlt.forEach((e:any, i:any) => {
 totalTaken = totalTaken + e[you]
});

    let yourcommanders;

    if(players[you].partner != undefined){
      let commanders = [players[you].Commander, players[you].partner]
      let yousorted = commanders.sort();
yourcommanders = yousorted[0]+", "+yousorted[1];

    }else{
      yourcommanders = players[you].Commander
    }
    

    players.forEach((player: any, index: number) => {
      if(player.partner == undefined){
      if(index != you && player.loggedin){
        if(opc1 == undefined){
         op1 = player.Name
         opc1 = player.Commander
         cmd1 = cdelt [index]
         cmdBy1 = ctaken [index]
         D1 = localdmgDlt[you] [index]
         DBy1 =  localdmgDlt[index][you]
        }else if(opc2 == undefined){
           op2 = player.Name
           opc2 = player.Commander
           cmd2 = cdelt [index]
           cmdBy2 = ctaken [index]
           D2 = localdmgDlt[you] [index]
           DBy2 =  localdmgDlt[index][you]
        }else if(opc3 == undefined){
          op3 = player.Name
          opc3 = player.Commander
          cmd3 = cdelt [index]
          cmdBy3 = ctaken [index]
          D3 = localdmgDlt[you] [index]
          DBy3 =  localdmgDlt[index][you]
       }
      }else if(index != you && !player.loggedin){
        if(opc1 == undefined){
          cmd1 = cdelt [index]
          cmdBy1 = ctaken [index]
         opc1 = player.Commander
         D1 = localdmgDlt[you] [index]
         DBy1 =  localdmgDlt[index][you]
        }else if(opc2 == undefined){
          cmd2 = cdelt [index]
           opc2 = player.Commander
           cmdBy2 = ctaken [index]
           D2 = localdmgDlt[you] [index]
           DBy2 =  localdmgDlt[index][you]
        }else if(opc3 == undefined){
          cmd3 = cdelt [index]
          opc3 = player.Commander
          cmdBy3 = ctaken [index]
          D3 = localdmgDlt[you] [index]
          DBy3 =  localdmgDlt[index][you]
       }
      }
    }else{

      let opcommanders = [players[index].Commander, players[index].partner]
      let opsorted = opcommanders.sort();
let opcmd = opsorted[0]+", "+opsorted[1];

      if(index != you && player.loggedin){
        if(opc1 == undefined){
          cmd1 = cdelt [index]
          cmdBy1 = ctaken [index]
         op1 = player.Name
         opc1 = opcmd
         D1 = localdmgDlt[you] [index]
         DBy1 =  localdmgDlt[index][you]
        }else if(opc2 == undefined){
          cmd1 = cdelt [index]
          cmdBy1 = ctaken [index]
           op2 = player.Name
           opc2 = opcmd
           D2 = localdmgDlt[you] [index]
           DBy2 =  localdmgDlt[index][you]
        }else if(opc3 == undefined){
          cmd1 = cdelt [index]
          cmdBy1 = ctaken [index]
          op3 = player.Name
          opc3 = opcmd
          D3 = localdmgDlt[you] [index]
          DBy3 =  localdmgDlt[index][you]
       }
      }else if(index != you && !player.loggedin){
        if(opc1 == undefined){
          cmd1 = cdelt [index]
          cmdBy1 = ctaken [index]
          D1 = localdmgDlt[you] [index]
          DBy1 =  localdmgDlt[index][you]
    
         opc1 = opcmd
        }else if(opc2 == undefined){
          cmd2 = cdelt [index]
          cmdBy2 = ctaken [index]
          D2 = localdmgDlt[you] [index]
          DBy2 =  localdmgDlt[index][you]
          
           opc2 = opcmd
        }else if(opc3 == undefined){
          cmd3 = cdelt [index]
          cmdBy3 = ctaken [index]
          D3 = localdmgDlt[you] [index]
          DBy3 =  localdmgDlt[index][you]
          opc3 = opcmd
       }
      }
    }
    });

    let killedlist = "";
    let killednumber = 0;
    let poisonnumber = 0;
    let Dmgnumber = 0;
    let cmdnumber = 0;
    
    killed.forEach((e: any) => {
      console.log(e.diedTo)
      if (players[e.player].loggedin){
        killedlist == killedlist + players[e.player].Named
      }

      console.log(e.player, you)
      if(e.player != you){
        killednumber = killednumber +1;
        if(e.diedTo == "Commander Dammage"){
          cmdnumber = cmdnumber + 1;
        }else if(e.diedTo == "Dammage"){
          Dmgnumber = Dmgnumber + 1;
        }else if(e.diedTo == "Infect")
        poisonnumber = poisonnumber +1;
      }
    });

    console.log(killed, killedlist, killednumber)


    let gameData = {
      "you": players[you].Name,
      "commander": yourcommanders,
      "opponent1" : op1,
      "opponent2"  : op2,
      "opponent3" : op3,
      "commander1" : opc1,
      "commander2" : opc2,
      "commander3" : opc3,
      "lifeGain" : localLifegain,
      "DamageSelf": localdmgDlt[you][you],
      "place" : place,
      "win" : win,
      "commanderDelt1" : cmd1,
      "commanderDelt2" : cmd2,
      "commanderDelt3" : cmd3,
      "commanderDeltBy1" : cmdBy1,
      "commanderDeltBy2" : cmdBy2,
      "commanderDeltBy3" : cmdBy3,
      "Delt1" : D1,
      "Delt2" : D2,
      "Delt3" : D3,
      "DeltBy1" : DBy1,
      "DeltBy2" : DBy2,
      "DeltBy3" : DBy3,
      "turnsAlive" : turnsAlive,
      "Turns" : lturn,
      "KilledWho": killedlist,
      "Killed": killednumber,
      "KilledDmg" : Dmgnumber,
      "KilledCmd" : cmdnumber,
      "KilledPoison" : poisonnumber,
      "KilledBy" : killedBy,
      "KilledHow" : diedTo,
       "DamageDelt": totalDelt,
       "DamageTaken": totalTaken
    }

    
    this.http.post('https://lifedataapp.us:5000/subGameData', gameData).subscribe((res:any)=>{
      console.log(res)
    })
  }


  getMyStats(data: any){
  
  return this.http.post('https://lifedataapp.us:5000/getGameData', data);
  
  }
}
