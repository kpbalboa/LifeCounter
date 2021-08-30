import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-you-stats',
  templateUrl: './you-stats.component.html',
  styleUrls: ['./you-stats.component.css']
})
export class YouStatsComponent implements OnInit {

  constructor(private data: DataService, private store: StoreDataService) { }

  user: any;
  ngOnInit(): void {
    this.user = this.data.userName
    let you = this.user
    // .toLowerCase()
   this.store.getMyStats({"user": you}); 
  }

}
