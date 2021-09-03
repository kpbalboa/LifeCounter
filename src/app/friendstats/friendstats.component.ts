import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { StoreDataService } from '../store-data.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-friendstats',
  templateUrl: './friendstats.component.html',
  styleUrls: ['./friendstats.component.css']
})
export class FriendstatsComponent implements OnInit {

   barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    
  
  };
   barChartLabels: any;
   barChartType: ChartType = 'bar';
   barChartLegend = true;
  
   barChartData:any;

  constructor(
    private data: DataService,
    private store: StoreDataService
  ) {}
  stats: any;
  user: any;
gamesPlayed: any;
wins: any;
damageDelt: any;
damageSelf: any;
lifegain: any;
kills: any;
dmgKills: any;
cmdkills: any;
poisonKills: any;
avgTurns: any;
taken: any;


  ngOnInit(): void {
  }

findFriend(friend: any){
 
    this.user = friend.value.User;
    let you = this.user;
    //
    let labelList: any = []
    let amountList: any = []
    let winsList: any =[]
    let damage: any =[]
    let gameslist: any =  []
    
     this.store.getMyStats({"user": you}).subscribe(res=>{
       this.stats=res
       this.gamesPlayed = this.stats.GamesPlayed;
       this.wins = this.stats.wins
       this.damageDelt =  this.stats.dammage[0].delt
        this.damageSelf = this.stats.dammage[0].self
      this.lifegain = this.stats.dammage[0].lifegain
      this.kills = this.stats.dammage[0].kills
      this.dmgKills = this.stats.dammage[0].dmgkills
      this.cmdkills = this.stats.dammage[0].cmdkills
      this.poisonKills = this.stats.dammage[0].poisonkills
      this.avgTurns = this.stats.dammage[0].avgturns
      this.taken = this.stats.dammage[0].taken
       this.stats.f1.forEach((e: any, i: number) => {
         let label: any =e.commander;
         let amount = e.cmdcount
         winsList.push(e.wins)
         gameslist.push(e.cmdcount)


      labelList.push(label)
      amountList.push({x: amount, y: e.wins, r: e.damage})
      
       });
    

    });
this.barChartData = [
  
    { data: gameslist, label: 'Games Played'},
    { data: winsList, label: 'Wins'}
]

this.barChartLabels = labelList

  }
}
