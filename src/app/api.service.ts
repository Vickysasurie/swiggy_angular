import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LOCAL_STORAGE,WebStorageService } from 'angular-webstorage-service';

let apiURL = "http://api-nativefood.herokuapp.com/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public result1;id:any
  public count : number
  public userLoggedIn;
  public adminLoggedIn;
  public username:any;
  public product_id:any;
  public user_id:any;
  public phno;
  public result:any;
  constructor(public http: HttpClient) {
    console.log('Hello Api Service');
    this.adminLoggedIn=false;
    this.userLoggedIn=false;
  }

  //get the food data
  loadData(type){
    return new Promise((resolve, reject)=>{
      let headers = new HttpHeaders();
      this.http.get(apiURL+type, {headers: headers}).
      subscribe(res =>{
       resolve(res);
      },(err)=>{
        reject(err);
      });
    });
  }

  //post the details of users and food
  PostDetails(type){
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();     
      this.http.get(apiURL+type,{headers:headers}).
      subscribe (data =>{
        console.log("success");
        console.log(this.result1);
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
  }
 public Postorder(details,type){
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();  
      headers.append('Content-Type' , 'application/json');
      headers.append('Accept' , 'application/json');   
      this.http.post(apiURL+type,details,{headers:headers}).
      subscribe (data =>{
        console.log("success");
        console.log(this.result1);
        resolve(data);
        console.log(data)
      },(err)=>{
        reject(err);  
      });
    });
  }

  //post the order details
public postOrders(details,type){
  console.log("post orders");
  return  new Promise((resolve,reject)=>{
    let headers=new HttpHeaders();
    console.log(details);
    this.http.post(apiURL+type,details,{headers:headers}).
    subscribe(res=>{
      resolve(res);
      console.log(res)
    },(err)=>{
      reject(err);
    });
  });
} 

//post the updated food/user details
  updateDetails(details,type){
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();
      //headers.append("Content-Type","application/json");
      console.log(details);
      this.http.put(apiURL+type,details,{headers:headers}).
      subscribe (data =>{
        console.log(this.result1);
        console.log("success");
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
  }

//delete the food details
  deleteDetails(type){
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();
      this.http.delete(apiURL+type,{headers:headers}).
      subscribe (data =>{
        console.log(this.result1);
        console.log("success");
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
  }

//for map api
  getLocation(type: string) {
    return new Promise((resolve , reject) =>{
      let headers =new HttpHeaders();
      //headers.append("Content-Type","application/json");
      this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + type + 'CA&sensor=false',{headers:headers}).
      subscribe (data =>{
        console.log("success");
        console.log(this.result1);
        resolve(data);
      },(err)=>{
        reject(err);  
      });
    });
   }
  
//store orders in array
 public getLocal(p){
  console.log("get orders");
  localStorage.setItem("quentinTarantino", JSON.stringify(p));
  this.respon();
}
public getLocal1(p){
  console.log("mano");
  localStorage.setItem("foods", JSON.stringify(p));
  this.respon1();
}
public respon(){
  var jj=JSON.parse(localStorage.getItem("quentinTarantino"));
  return jj;
}

public respon1(){
  var jj=JSON.parse(localStorage.getItem("foods"));
  return jj;
}


postDetails(details,type){
  return new Promise((resolve , reject) =>{
    let headers =new HttpHeaders();
    //headers.append("Content-Type","application/json");
    console.log(details);
    this.http.post(apiURL+type,details,{headers:headers}).
    subscribe (data =>{
      console.log(this.result1);
      console.log("success");
      resolve(data);
    },(err)=>{
      reject(err);  
    });
  });
}

//get users details
getUsers(type){
  return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders();
    this.http.get(apiURL+type, {headers: headers}).
    subscribe(res =>{
     resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

//get user by id
getUsersById(type){
  return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders();
    this.http.get(apiURL+type, {headers: headers}).
    subscribe(res =>{
     resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

//get orders list
getOrders(type){
  return new Promise((resolve, reject)=>{
    let headers = new HttpHeaders();
    this.http.get(apiURL+type, {headers: headers}).
    subscribe(res =>{
     resolve(res);
    },(err)=>{
      reject(err);
    });
  });
}

//get user orders by order id
getUserOrders(type){
  return new Promise((resolve , reject) =>{
    let headers =new HttpHeaders();
    //headers.append("Content-Type","application/json");
    //console.log(details);
    this.http.get(apiURL+type,{headers:headers}).
    subscribe (data =>{
      //console.log(this.result1);
      console.log("success");
      resolve(data);
    },(err)=>{
      reject(err);  
    });
  });
}

//change order address
changeAddress(details,type){
  return new Promise((resolve , reject) =>{
    let headers =new HttpHeaders();
    //headers.append("Content-Type","application/json");
    console.log(details);
    this.http.put(apiURL+type,details,{headers:headers}).
    subscribe (data =>{
      //console.log(this.result1);
      console.log("success");
      resolve(data);
    },(err)=>{
      reject(err);  
    });
  });
}


//change user password
changePassword(details,type){
  return new Promise((resolve , reject) =>{
    let headers =new HttpHeaders();
    //headers.append("Content-Type","application/json");
    console.log(details);
    this.http.put(apiURL+type,details,{headers:headers}).
    subscribe (data =>{
      console.log(this.result1);
      console.log("success");
      resolve(data);
    },(err)=>{
      reject(err);  
    });
  });
}
}