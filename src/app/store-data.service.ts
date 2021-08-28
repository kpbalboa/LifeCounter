import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor(private http: HttpClient) { }

  createAccount(item: any){
    return this.http.post('http://localhost:3000/createUser', item)
    // return this.http.post('http://192.168.1.47:3000/createUser', item)
    // return this.http.get('http://localhost:3000/')

  }

  login(data: any){
    return this.http.post('http://localhost:3000/login', data)
    // return this.http.post('http://192.168.1.47:3000/login', data)
  }

  subGamneData(players: any, localdmgDlt: any, localLifegain: any, place: any, win: any, commanderDmg: any, lturn: any, turnsAlive: any, killedBy: any, killed: any, diedTo: any, you: number){
    // console.log(players)
    // console.log(localdmgDlt)
    // console.log(localLifegain)
    // console.log(place)
    // console.log(win)
    // console.log(commanderDmg)
    // console.log(lturn)
    // console.log(killedBy)
    // console.log(killed)
    // console.log(diedTo)

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

    commanderDmg.forEach((e: any, i:number) => {
      if(i == you){
        e.forEach((e:any, i: any) => {
          if(i != you){
            if(cmdBy1 == undefined){
              cmdBy1 = e
             }else if(cmdBy2 == undefined){
              cmdBy2 = e
             }else if(cmdBy3 == undefined){
              cmdBy3 = e
            }
          }
        });
      }else if(i !=you){
        if(cmd1 == undefined){
          cmd1 = e[you]
         }else if(cmd2 == undefined){
          cmd2 = e[you]
         }else if(cmd3 == undefined){
          cmd3 = e[you]
        }
      }
    });

    

    players.forEach((player: any, index: number) => {
      if(index != you && player.loggedin){
        if(opc1 == undefined){
         op1 = player.Name
         opc1 = player.Commander
        }else if(opc2 == undefined){
           op2 = player.Name
           opc2 = player.Commander
        }else if(opc3 == undefined){
          op3 = player.Name
          opc3 = player.Commander
       }
      }else if(index != you && !player.loggedin){
        if(opc1 == undefined){
    
         opc1 = player.Commander
        }else if(opc2 == undefined){
          
           opc2 = player.Commander
        }else if(opc3 == undefined){
      
          opc3 = player.Commander
       }
      }
      
    });

    let killedlist = "";
    let killednumber = 0;
    let poisonnumber = 0;
    let Dmgnumber = 0;
    let cmdnumber = 0;
    
    killed.forEach((e: any) => {
      if (e.loggedin){
        killedlist == killedlist + players[e.Player].Named
      }
      if(players[e.player].Name != players[you].Name){
        killednumber ++;
        if(e.diedTo == "Commander Dammage"){
          cmdnumber ++;
        }else if(e.diedTo == "Dammage"){
          Dmgnumber ++;
        }else if(e.diedTo == "Infect")
        poisonnumber++;
      }
    });

    let gameData = {
      "you": players[you].Name,
      "commander": players[you].Commander,
      "opponent1" : op1,
      "opponent2"  : op2,
      "opponent3" : op3,
      "commander1" : opc1,
      "commander2" : opc2,
      "commander3" : opc3,
      "lifeGain" : localLifegain,
      "place" : place,
      "win" : win,
      "commanderDelt1" : cmd1,
      "commanderDelt2" : cmd2,
      "commanderDelt3" : cmd3,
      "commanderDeltBy1" : cmdBy1,
      "commanderDeltBy2" : cmdBy2,
      "commanderDeltBy3" : cmdBy3,
      "turnsAlive" : turnsAlive,
      "Turns" : lturn,
      "KilledWho": killedlist,
      "Killed": killednumber,
      "KilledDmg" : Dmgnumber,
      "KilledCmd" : cmdnumber,
      "KilledPoison" : poisonnumber,
      "KilledBy" : killedBy,
      "KilledHow" : diedTo
    }

    console.log(gameData)

    
    this.http.post('http://localhost:3000/subGameData', gameData).subscribe((res:any)=>{
      console.log(res)
    })
  }
}
