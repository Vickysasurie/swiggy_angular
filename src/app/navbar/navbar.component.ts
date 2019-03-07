import { Component, OnInit,Inject } from '@angular/core';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isUserLoggedOut:boolean=true;
  public itemsSelected:boolean=false;
  public isAdminLoggedIn:boolean=false;
  constructor(public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService ) { 
    //localStorage.clear();
       //this.isUserLoggedOut=true;
    }
  
  
  ngOnInit(){
    console.log(this.storage.get('vicky'));
    if(this.storage.get('vicky')){
      console.log(this.data.username);
      this.isUserLoggedOut=false;//show login or user account
      this.itemsSelected=true;//show or hide cart
    }else if(this.storage.get('acc')){
      this.isAdminLoggedIn=true;
    }
  }
}
