import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  joinRoom(num: any){
    this.data.joinRoom(num.value);
  }

}
