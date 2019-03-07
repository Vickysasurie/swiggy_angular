import { Component, OnInit,Inject } from '@angular/core';
import * as invNum from 'invoice-number';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  public invno:number;
  public counter:number=1;
  public orderinfo:any;
  public user:any;
  public date: Date = new Date();
  public tax:number=0;
  public total:number=0;
  public grandtotal:number=0;
  constructor(public router:Router,public data:ApiService,@Inject(LOCAL_STORAGE) private storage:WebStorageService) { 
    // setInterval(() => {
    //   this.date = new Date();
    // }, 1);
  }

  ngOnInit() {
    //console.log(invNum.next('2017/08/ABC001'));
    console.log(this.storage.get('vicky'));
    this.user=this.storage.get('vicky');
    this.counter++;
    this.invno=invNum.next('201809ABC00'+this.counter);
    var uid=this.storage.get('vicky_orderid');
    //get user orders
     console.log(uid);
     this.data.getUserOrders('/cart/'.concat(uid)).then((result)=>{
      this.orderinfo = result;
      this.total=this.orderinfo.price*this.orderinfo.quantity;
      this.tax=((this.total)/(100))*10;
      this.grandtotal=this.total+this.tax;
      console.log(this.orderinfo);
      //this.storage.remove('vicky_orderid');
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
    console.log(uid);
  }

  //print
  print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById('print-section').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(
  //     `<body onload="window.print();window.close()">${printContents}</body>`
  //   );
  //   popupWin.document.close();
  window.print();
  }

  
}
