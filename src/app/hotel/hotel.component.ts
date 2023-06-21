import { createElementCssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '../core.service';
import { SearchHotelsComponent } from '../search-hotels/search-hotels.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  message:string='';
  dc:string='';
  aminities:string='';
  st:string='';
  // formGroup!:FormGroup ;
  discri:any=[]
  hotelami:any=[]
  staytype:any=[]
  hotelData:any=[]
  hotelaminities:any
  stayType:any
  discription:any
  hoteldetails:any=[]
  paramId:any
  name:any
  address:any
  title:any
  
  constructor(private _bottomSheet: MatBottomSheet,
              private _formBuilder: FormBuilder,
              private api:CoreService,
              private activeRoute:ActivatedRoute,
              private _location: Location
              ) { }

  ngOnInit(): void {
    this.paramId=this.activeRoute.snapshot.paramMap.get('id') as any;
    console.log(this.paramId);
    this.paramId && this.api.getHotelDataById(this.paramId).subscribe(res=>{
      console.log(res);
      this.hoteldetails=res;
      // this.id=this.hoteldetails.id
      console.log(this.hoteldetails,'h');
      this.name=this.hoteldetails.hotel_name; 
      this.address=this.hoteldetails.address;
      this.st=this.hoteldetails.staytypes;
      this.dc=this.hoteldetails.description;
      this.aminities=this.hoteldetails.aminities;
      localStorage.setItem('room', JSON.stringify(this.hoteldetails))
      this.title="update"
    })
    if(!this.paramId){
      localStorage.removeItem('room')
      this.title="Add"
    }
   
    this.api.currentMassage.subscribe(message => this.message = message)
    this.api.amiMassage.subscribe(aminities => this.aminities = aminities)
    this.api.stayMassage.subscribe(st => this.st = st)
    this.api.discMassage.subscribe(dc => this.dc = dc)
    
  }

  openHotelAminities(): void {
    this._bottomSheet.open(SearchHotelsComponent);
    this.api.changeMessage('hotelaminities')
    this.hotelami = JSON.parse(localStorage.getItem('hotelaminities') || '{}')
  }

  openStayTypes(): void {
    this._bottomSheet.open(SearchHotelsComponent);
    this.api.changeMessage('roomStay')
    this.staytype = JSON.parse(localStorage.getItem('roomStay') || '{}')
  }

  opendescription(): void {
    this._bottomSheet.open(SearchHotelsComponent);
    this.api.changeMessage('description')
    this.discri = JSON.parse(localStorage.getItem('description') || '{}')
    this.discription =this.discri.description
  }


  submitHotelForm(event: any){
    

    this.hotelData =  {
      
      hotel_name:event.target.hotelname.value,
      staytypes:event.target.staytype.value,
      aminities:event.target.aminities.value,
      description:event.target.discription.value,
      address:event.target.address.value,
      images:event.target.image.value
    }
    console.log(this.hotelData)

   if(!this.paramId){
    this.api.postHotelData(this.hotelData).subscribe(res=>{
      console.log(res);
          alert('hotel added successfuly')
      localStorage.setItem('hotel',JSON.stringify(res));
    })
   }else{
    this.api.updateHotelData(this.hotelData,this.paramId).subscribe(res=>{
      console.log(res);
          alert('hotel update successfuly')
      localStorage.setItem('hotel',JSON.stringify(res));
    })
   }
    
  }
  goBack(){
    this._location.back()
  }
}
