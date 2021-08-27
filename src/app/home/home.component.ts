import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private data: DataService) { }
userName: any;
  ngOnInit(
    
   
  ): void {
    // this.data.reset();
    console.log(this.data.players)
    this.userName = this.data.userName;
    this.data.User_Name.subscribe((value: any)=>{
      this.userName = value;
      console.log(value);
    })
  }

  LogOut(){
    this.userName=undefined;
    this.data.logOut();
  }

}
