import { Component, OnInit,Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
import { AlertPromise } from 'selenium-webdriver';
import { NavbarComponent } from '../navbar/navbar.component';
import{ Location } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public responseData: any;
  public listData: any;
  public uId:number=1;
  public username:any;
  public success:boolean=false;


  public providerDetail1 = {"phno":""};
  display="none";
  forgotsttaus:boolean=false;
  constructor(public data:ApiService,public router:Router,@Inject(LOCAL_STORAGE) private storage:WebStorageService, public nav:NavbarComponent,public location:Location) { }

  ngOnInit() {
  }

  login(e){
    e.preventDefault();
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
     
     console.log(username);
     //this.data.username=username;
    this.data.getUsers('/users').then((result)=>{
      this.responseData = result;
      //console.log(this.responseData);
      if (this.responseData) {
        this.listData = this.responseData;
       //console.log(this.listData.length);
        for(var i=0;i<this.listData.length;i++){
          //console.log(username==this.listData[i].username && password==this.listData[i].password);
          if(username==this.listData[i].username && password==this.listData[i].password){
            this.data.username=this.listData[i].name;
            this.data.phno=this.listData[i].mobile_number;
            this.success=true;
            if(this.uId==this.listData[i].fid){
            this.storage.set('acc',this.listData[i].fid);
            window.location.reload(true);
            this.router.navigate(['adminpage'])
            alert("Welcome Admin");
           }else{       
            this.data.user_id=this.listData[i].fid;
           // this.data.username=this.listData[i].name;
           // user details set to local storage
           this.storage.set('vicky' , this.listData[i]);
           this.storage.set('vicky_uname' , this.listData[i].username);
           //user id set to local storage
           this.storage.set('vicky_id',this.listData[i].fid);
           //user phno set to local storage for orders purpose
           this.storage.set('vicky_phno1',this.listData[i].mobile_number);
           this.storage.set('vicky_address',this.listData[i].address);
            //console.log(this.storage.get('vicky'));
            window.location.reload(true);
            this.router.navigate(['userdashboard'])
            // this.router.navigateByUrl('/nav', {skipLocationChange: true}).then(()=>
            // this.router.navigate(["/"]));
            //alert("hai");
           }
           //alert('your details are wrong');
         }else{
          console.log('you are unauthenticted');
        } 
        }
        if(this.success==false){
          alert('login failed');
        }
        //console.log(this.listData);
      }else {
        console.log('no data is get');
      }
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
    // alert(username);
    // return false;
   
   //this.data.username=this.username1;
  // console.log(this.data.username);
  }
// for forgot password
  openModalDialog(){
    this.display='block'; //Set block css
    //console.log('hello3');
    //this.popup=i;
    console.log("hey dude");
 }

 closeModalDialog(){
  //console.log('hello1');
  this.display='none'; //set none css after close dialog
  console.log('hello2');
 }

// For send mob number

changepassword(){
  this.data.getUsers('/users').then((result)=>{
    this.responseData = result;
    //console.log(this.responseData);
    if (this.responseData) {
      this.listData = this.responseData;
      //console.log(this.listData);
      for(var i=0;i<this.listData.length;i++){
        if(this.providerDetail1.phno==this.listData[i].mobile_number){
         //console.log(this.providerDetail1.phno);
         this.storage.set('vicky_phno',this.providerDetail1.phno);
         this.username=this.listData[i].username;
         //console.log(this.listData[i].mobile_number);
        // this.data.username=this.listData[i].name;
         //this.data.uid=this.listData[i].uid;
         this.forgotsttaus=true;
          this.router.navigate(['forgotpassword']);
          //alert("hey cool man");
       }else{
        console.log('you are unauthenticted');
      } 
      }
      if(this.forgotsttaus==false){
        alert("Check your phone number");
      }
    }else {
      console.log('no data is get');
    }
  }, (err) => {
      console.log("Rejection");
  }).catch((err)=>{
    console.log('unHandledRejection', err.message);
  });
}
}
