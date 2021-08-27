import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../store-data.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private database: StoreDataService, private data: DataService) { }

  alerts: any =[];

  ngOnInit(): void {
  }

  login(form: any){
    this.alerts=[];
   this.database.login({"email": form.form.value.Email, "password": form.form.value.Password}).subscribe((res: any)=>{
    if(res.rowCount == 1){
      console.log(res)
      this.data.login(res.rows[0])
    }else{
      console.log(res)
      this.alerts.push("INCORRECT USERNAME OR PASSWORD")
    }
   })
  }

}
