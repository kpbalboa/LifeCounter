import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }
createRoom(form: any){
  // console.log(form.value)
 this.data.createRoom(form.value);
}
}
