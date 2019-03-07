import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../api.service';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  public searchText:any;
  result;item;productDetails;id:any
  public popup:any;
  public temp:any; 
  display="none";
    providerDetails={
      "name": "",
      "img": "",
      "category": "",
      "breakfast":"" ,
      "lunch": "",
      "dinner": "",
      "rating": "",
      "lon": "",
      "lat": "",
      "zoom": "",
      "provider_address": "",
      "price": "",
      "quantity": "",
      "available": "",
      "provider_id": "",
      "provider_name": "",
      "tax": ""
    };
    constructor(public data:ApiService,public router:Router,@Inject(LOCAL_STORAGE) private storage:WebStorageService) {
      this.data.loadData("/items").then((result)=> {
      
        this.data.result=result;
        console.log(result);
        this.sam();
       },() => {
        }).catch((err)=>{
         console.log("unhandled rejection",err.message);
         });
     }
     sam()
     {
      this.result=this.data.result;
      //console.log(this.result);
     }
    save()
    {
      this.data.postDetails(this.providerDetails,'/items').then(() => {
        console.log(this.providerDetails);
        alert("success");
        location.reload(true);
        //this.router.navigate(['']);
      },() => {
          alert("Please Enter The valid Data or Fill All The Columns");
        }).catch((err)=>{
      
      console.log("unhandled rejection",err.message);
      
      });
    }

  logout(){
    window.location.reload(true);
    localStorage.clear();
    this.router.navigate(['/']);
  }
    clickMethod(ld) {
      if(confirm("Are you sure to delete that product    "+ld.name+"   in the category of "+ld.category )) {
        this.id=ld.id;
        console.log(this.id);
    this.data.deleteDetails('/items/'.concat(this.id)).then(() => {
      alert("success");
      location.reload(true);
    },() => {
      }).catch((err)=>{
      console.log("unhandled rejection",err.message);
      });
      }
    }
  
  ngOnInit() {
  }
// get online image
getimage(){
  window.open("https://www.google.co.in/search?q="+this.providerDetails.name, "_blank");
  // this.providerDetails.img=window.location.href;
}
// update food
updateFood(id){
  console.log(id);
  this.storage.set('food_id',id);
  this.router.navigate(['updatefood']);
}
}