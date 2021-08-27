import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  constructor(private http: HttpClient) { }

  createAccount(item: any){
    return this.http.post('http://localhost:3000/createUser', item)
    // return this.http.post('http://192.168.1.47:3000/createUser', item)
    // return this.http.get('http://localhost:3000/')

  }

  login(data: any){
    return this.http.post('http://localhost:3000/login', data)
    // return this.http.post('http://192.168.1.47:3000/login', data)
  }

  subGamneData(){
    console.log("subbed")
  }
}
