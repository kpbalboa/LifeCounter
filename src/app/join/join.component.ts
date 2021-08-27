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

commanders: any;
userName: any;
  ngOnInit(): void {
    this.userName = this.data.userName;
  }

  joinRoom(num: any){
    if(this.commanders[num.value.Commander].image_uris != undefined){
    this.data.joinRoom(num.value, this.commanders[num.value.Commander].name, this.commanders[num.value.Commander].image_uris.small);
    }else{
      this.data.joinRoom(num.value, this.commanders[num.value.Commander].name, this.commanders[num.value.Commander].card_faces[0].image_uris.small);
    }

  }

  searchCommander(){
    let cmdr: any = document.getElementById("commanderSearch")
    this.data.getCommander(cmdr.value).subscribe((res: any) =>{
      console.log(res)
      this.commanders = res.data;
    });
  }

 
}
