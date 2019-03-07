import { Component, OnInit, Inject } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';
@Component({
  selector: 'app-update-food',
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.css']
})
export class UpdateFoodComponent implements OnInit {
// public updateFood={
//   "name": "",
//   "img": "",
//   "category": "",
//   "breakfast":"" ,
//   "lunch": "",
//   "dinner": "",
//   "rating": "",
//   "lon": "",
//   "lat": "",
//   "zoom": "",
//   "provider_address": "",
//   "price": "",
//   "quantity": "",
//   "available": "",
//   "provider_id": "",
//   "provider_name": "",
//   "tax": ""
// }
public updateFood:any;
public food:any;
public food_id:any;
  constructor(public router:Router, public data: ApiService,private route: ActivatedRoute,@Inject(LOCAL_STORAGE) private storage:WebStorageService) { }

  ngOnInit() {
    // this.route.params.subscribe( params => console.log(params) );
    // this.food=this.route.params;
    // console.log(this.food);
    this.selectedFood();
  }
  selectedFood(){
    console.log(this.storage.get('food_id'));
    this.food_id=this.storage.get('food_id');
    this.data.getUsersById('/items/'.concat(this.food_id)).then((result)=>{
      this.updateFood = result;
      console.log(this.updateFood);
    }, (err) => {
        console.log("Rejection");
    }).catch((err)=>{
      console.log('unHandledRejection', err.message);
    });
  }
  // update food details
  update()
  {
    this.data.updateDetails(this.updateFood,'/items/'.concat(this.food_id)).then(() => {
      console.log(this.updateFood);
      alert("Success");
      this.router.navigate(['adminpage'])
      //location.reload(true);
      //this.router.navigate(['']);
    },() => {
        alert("Please Enter The valid Data or Fill All The Columns");
      }).catch((err)=>{
    
    console.log("unhandled rejection",err.message);
    
    });
  }
  // get image link online
  getimage(){
    window.open("https://www.google.co.in/search?q="+this.food.name, "_blank");
    // this.providerDetails.img=window.location.href;
  }
}
