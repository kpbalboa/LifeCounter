import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private data: DataService) { }

  commanders: any;
  userName: any;

  ngOnInit(): void {
    this.userName = this.data.userName;
  }
createRoom(form: any){
  if(this.commanders[form.value.Commander].image_uris != undefined){
 this.data.createRoom(form.value, this.commanders[form.value.Commander].name, this.commanders[form.value.Commander].image_uris.small);
  }else{
    this.data.createRoom(form.value, this.commanders[form.value.Commander].name, this.commanders[form.value.Commander].card_faces[0].image_uris.small);
  }
}

test(){
  this.data.createRoom("form.value", "this.commanders[form.value.Commander].name", "this.commanders[form.value.Commander].image_uris.small")
}


searchCommander(){
  let cmdr: any = document.getElementById("commanderSearch")
  this.data.getCommander(cmdr.value).subscribe((res: any) =>{
    this.commanders = res.data;
  });
}

}
