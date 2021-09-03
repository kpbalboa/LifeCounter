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
partners: any;
userName: any;
  ngOnInit(): void {
    this.userName = this.data.userName;
  }

  // joinRoom(num: any){
  //   if(this.commanders[num.value.Commander].image_uris != undefined){
  //   this.data.joinRoom(num.value, this.commanders[num.value.Commander].name, this.commanders[num.value.Commander].image_uris.small);
  //   }else{
  //     this.data.joinRoom(num.value, this.commanders[num.value.Commander].name, this.commanders[num.value.Commander].card_faces[0].image_uris.small);
  //   }

  // }

  joinRoom(form: any){
    if(form.value.Partner == undefined){
    if(this.commanders[form.value.Commander].image_uris != undefined){
   this.data.joinRoom(form.value, this.commanders[form.value.Commander].name, this.commanders[form.value.Commander].image_uris.small);
    }else{
      this.data.joinRoom(form.value, this.commanders[form.value.Commander].name, this.commanders[form.value.Commander].card_faces[0].image_uris.small);
    }
    } else{
      if(this.commanders[form.value.Commander].image_uris != undefined){
        this.data.joinRoom(form.value, this.commanders[form.value.Commander].name, this.commanders[form.value.Commander].image_uris.small, this.partners[form.value.Partner].name, this.partners[form.value.Partner].image_uris.small);
         }else{
           this.data.joinRoom(form.value, this.commanders[form.value.Commander].name, this.commanders[form.value.Commander].card_faces[0].image_uris.small, this.partners[form.value.Partner].name, this.partners[form.value.Partner].image_uris.small);
         }
    }
  }

  searchCommander(){
    let cmdr: any = document.getElementById("commanderSearch")
    this.data.getCommander(cmdr.value).subscribe((res: any) =>{
      console.log(res)
      this.commanders = res.data;
    });
  }

  
searchPartners(){
  let cmdr: any = document.getElementById("partnercommanderSearch")
  this.data.getCommander(cmdr.value).subscribe((res: any) =>{
    this.partners = res.data;
  });
}
 
}
