import { Component, OnInit } from '@angular/core';
import { StoreDataService } from '../store-data.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private database: StoreDataService) { }
alerts:any = [];
  ngOnInit(): void {
  }

  createAccount(form: any){
    this.alerts=[]
    console.log(form)
  if(form._directives[0].valid && form._directives[1].valid && form._directives[3].valid && form.value.Password == form.value.PasswordConfirm){

this.database.createAccount({"email": form.value.Email, "user": form.value.User, "password": form.value.Password}).subscribe((res: any)=>{
  
  console.log(res)
  if(res.detail == `Key (email)=(${form.value.Email}) already exists.`){
    this.alerts.push(form.value.Email + " is already used")
  }else if(res.detail == `Key (user_name)=(${form.value.User}) already exists.`){
    this.alerts.push(form.value.User + " is unavalible")
  }else if(res.command == "INSERT"){
    console.log("werked")
    let doc: any = document.getElementById("createForm")
    document.write(`<span> Account ${form.value.User} has been succesfully created.</span>
    <a href routerLink="login">CLICK HERE TO LOGIN </a>`)
  }else{
    this.alerts.push("UNKNOWN ERROR: PLEASE TRY AGAIN")
  }
})
  }else{
    form._directives.forEach((element: any) => {
      if(!element.valid){
        this.alerts.push(`${element.name} is invalid`)
      }
    })
    if(form.value.Password != form.value.PasswordConfirm){
      this.alerts.push
      (
        "Passwords do not match"
      )
    };
  }
    
  }

}
