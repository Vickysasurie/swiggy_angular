import { Component, OnInit,AfterViewChecked,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
declare let paypal: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public responseData: any;
  public listData: any;
  public orderData:any;
  public product={"order_id":"","user_id":"","product_id":"","product_name":"","user_name":"","lon":"","lat":"","zoom":"","address":"","cost":"","income":"","quantity":"","providerId":"","provider":"","status":"","tax":"","createdAt":"","updatedAt":""};
  public address:String;
  newaddress:boolean=false;
  show:boolean=false;
  show1:boolean=false;
  public providerDetail1={"delivery_address":""};
  isLoggedOut:boolean=true;
  public username:string;
  public total:number=0;
  public total1:number=0;
  public tax:number=0;
  public finalAmount:number;
  public status:String;
  public updateStatus={"order_id":"","user_id":"","product_id":"","product_name":"","user_name":"","lon":"","lat":"","zoom":"","address":"","cost":"","income":"","quantity":"","providerId":"","provider":"","status":"","tax":"","createdAt":"","updatedAt":""};
  constructor(public router:Router,public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService) {
   
    //getting user status
   if( this.storage.get('vicky')){
     this.isLoggedOut=false;
   }
   }

  ngOnInit() {
    //get total and tax
    this.total1=this.storage.get('vicky_total');
    this.tax=((this.total1)/(100))*10;
    this.total=this.tax+this.total1+30;
    this.finalAmount= this.total;

    //getting pre given address
    this.username=this.storage.get('vicky_uname');
    this.data.getUsers('/users').then((result)=>{
      this.responseData = result;
      
      //console.log(this.responseData);
      if (this.responseData) {
        this.listData = this.responseData;
       
        for(var i=0;i<this.listData.length;i++){
          if(this.username==this.listData[i].username){
            this.address=this.listData[i].address;
             
          //console.log(this.address);           
         }else{
          console.log('you are unauthenticted');
        } 
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
    this.getUserOrders();
    //this.status="checkedout";
    //this.postOrders();  
  }
  //new address show or hide
  addrtoggle() {
    this.newaddress = !this.newaddress;
   }

   //login and signup toggle
   logintoggle(){
     this.show=!this.show;
     this.show1=false
   }

   signuptoggle(){
    this.show1=!this.show1;
    this.show=false
  }

  //new adress add
  changeaddress(){
    var order_id=this.storage.get('vicky_orderid');
    console.log(this.providerDetail1);
    this.data.changeAddress(this.providerDetail1,'/cart/changeaddress/'.concat(order_id)).then((result)=> {
      console.log("success");
      //console.log(this.data.uid);
      //console.log(this.providerDetails.password);
      //this.router.navigate(['login']);
      alert("Your order address changed successfully");
      this.address=this.providerDetail1.delivery_address;
    },(err)=>{
  
    }).catch((err)=>{
      console.log("unhandled rejection",err.message);
      });
  }

//get orders
getUserOrders(){
var uid=this.storage.get('vicky_orderid');
console.log(uid);
   this.data.getUserOrders('/cart/'.concat(uid)).then((result)=>{
      this.orderData = result;
      //this.product=this.orderData[0];
      //console.log(this.orderData.food_name);
      //this.storage.remove('vicky_orderid');
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
    //console.log(uid);
}
//update status
// postOrders(){
//   var uid=this.storage.get('vicky_id');
  
//  // this.updateStatus={"order_id":this.orderData.order_id,"user_id":this.orderData.user_id,"product_id":this.orderData.product_id,"product_name":this.orderData.product_name,"user_name":this.orderData.user_name,"lon":this.orderData.lon,"lat":this.orderData.lat,"zoom":this.orderData.zoom,"address":this.orderData.address,"cost":this.orderData.cost,"income":this.orderData.income,"quantity":this.orderData.quantity,"providerId":this.orderData.providerId,"provider":this.orderData.provider,"status":this.status,"tax":this.orderData.tax,"createdAt":this.orderData.createdAt,"updatedAt":this.orderData.updatedAt};
//   this.data.updateStatus(this.status,'orders/changeStatus').then((result) =>{
//     //var results = this.response;
//     //console.log(this.response);
//     console.log("Successfully updated");
//       }, (err)=> {
//      }).catch((err) =>{
//         console.log("Unhandled rejection",err.message);
     
//    alert("helloo");
// });
// alert(this.status);
// }

  //  payment tab
  addScript: boolean = false;
  paypalLoad: boolean = true;
  // finalAmount: number= this.total;
  paypalConfig = {
    env: 'sandbox',
    style: {
      label: 'buynow',
      fundingicons: true, // optional
      branding: true, // optional
      size:  'small', // small | medium | large | responsive
      shape: 'rect',   // pill | rect
      color: 'gold'   // gold | blue | silver | black
  },
    client: {
      sandbox: 'AZOydPphjOEGhm-gS8iPiBdESForP9ExEeUsUXQkOg4Y_TM97VH9ZKUrpUbkt_ePXbmCEm1wVC1-2vHm',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'INR' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        alert('your transaction is successful');
        //localStorage.clear();
        this.status="checkedout";
        //this.postOrders();
        this.router.navigate(['/']);
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
 

}
