import { Component,OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject, Observable } from 'rxjs';
import { Inject, Injector, ElementRef } from '@angular/core';
import { Product,Order } from '../product';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent {
  @Input() list : Subject<any>;
  // fulldetails : any[];
   product : Product[];
   response:any;
   response1:any;
   responseData:any;
   listData:any;
   rv:Order={};
   public grandtotal:number=0;
   // id : number;
   // name : string;
   // price : number;
   // image : string;
   public quantity : number;
 
   constructor(public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService ) {
     //console.log("servi");
     this.response=this.data.respon();
     this.response1=this.data.respon1();
 
     //console.error("here"+this.response);
     //console.error(this.response1);
     /* this.response = this.response.filter((el, i, a) => i === a.indexOf(el))
     console.log(this.response); */
     this.toObject(this.response,this.response1);
   //   this.data1.postShop(this.response, "create").then((result) =>{
   //     var results = this.response;
   //     console.log(this.response);
   //     console.log("Successfully updated");
   //       }, (err)=> {
   //      }).catch((err) =>{
   //         console.log("Unhandled rejection",err.message);
         
   //    alert("helloo");
   // });
 
     }
      toObject(response:Product[],response1:Product[]) {
     
       // rv=this.response;
        for (var i = 0; i < response.length; i++){
           this.rv.order_id=response[i].id;
           this.storage.set('vicky_orderid',this.rv.order_id);
          this.rv.food_image = response[i].img;
          this.rv.category=this.response[i].category;
          this.rv.rating=this.response[i].rating;
          this.rv.user_id=this.storage.get('vicky_id');
          this.rv.provider_name=this.response[i].provider_name;
          this.rv.provider_address=this.response[i].provider_address;
          this.rv.provider_id=this.response[i].id;
          this.rv.lon=response[i].lon;
          this.rv.lat=response[i].lat;
          this.rv.zoom=response[i].zoom;
          this.rv.price=response[i].price;
          this.rv.quantity=response[i].quantity;
          this.rv.delivery_address=this.storage.get('vicky_address')
          this.rv.mobile_number=this.storage.get('vicky_phno1');
          this.rv.status="booked";
          this.rv.food_name = response[i].name;
                 
          this.grandtotal+=this.rv.price*this.rv.quantity;
          this.storage.set('vicky_total',this.grandtotal);
          //console.log("final total "+this.grandtotal);
          //console.log(this.response[i].id);
          //console.log(this.response[i].delivery_address); 
   }
  }
   // add to order table
   addCart(){
    if(this.storage.get('vicky')){
      //console.log(this.rv);
      //console.log(response1[i]);
      this.data.postDetails(this.rv, "/cart").then((result) =>{
             var results = this.rv;
             //console.log(results);
             console.log("Successfully updated");
               }, (err)=> {
              }).catch((err) =>{
                 console.log("Unhandled rejection",err.message);
              
            alert("helloo");
         });
          
    }  
  }
}
