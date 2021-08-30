import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stats-home',
  templateUrl: './stats-home.component.html',
  styleUrls: ['./stats-home.component.css']
})
export class StatsHomeComponent implements OnInit {

  constructor(private data: DataService) { }
  loggedIn: any;

  ngOnInit(): void {
this.loggedIn = this.data.userName
  }

}
