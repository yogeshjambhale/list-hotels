import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core.service';
import { SearchHotelsComponent } from 'src/app/search-hotels/search-hotels.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  hndlQty:any = 1
  message:string='';
  formGroup!:FormGroup ;
  roomData:any=[]
  roomtype:any
  roomami:any
  bedtypes:any
  rt:string='';
  bt:string='';
  ra:string='';
  hotel:any
  hoteldetails:any=[]
  price:any
  id:any
  paramId:any
  title:any

  constructor(private _bottomSheet: MatBottomSheet,
              private _formBuilder: FormBuilder,
              private api:CoreService,
              private activeRoute:ActivatedRoute,
              private router : Router,
              private _location: Location) { }

  ngOnInit(): void {

    this.formGroup = this._formBuilder.group({
  
      price : ['',Validators.required],
      images : ['',Validators.required],
      
    })
    this.paramId=this.activeRoute.snapshot.paramMap.get('id') as any;
    console.log(this.paramId);
    this.paramId && this.api.getRoomsData(this.paramId).subscribe(res=>{
      // console.log(res);
      this.hoteldetails=res;
      this.id=this.hoteldetails.id
      console.log(this.hoteldetails,'h');
      this.hndlQty=this.hoteldetails.totalbeds; 
      this.price=this.hoteldetails.price;
      this.rt=this.hoteldetails.roomtypes;
      this.bt=this.hoteldetails.bedtypes;
      this.ra=this.hoteldetails.aminities;
      localStorage.setItem('room', JSON.stringify(this.hoteldetails))
      this.title="update"
    })
    if(!this.paramId){
      localStorage.removeItem('room')
      this.title="add"
    }
    
    this.api.currentMassage.subscribe(message => this.message = message)
    this.api.rtMassage.subscribe(rt => this.rt = rt)
    this.api.btMassage.subscribe(bt => this.bt = bt)
    this.api.raMassage.subscribe(ra => this.ra = ra)
  }

  openRoomTypes(id:any): void {
    this._bottomSheet.open(SearchHotelsComponent);
    this.api.changeMessage('roomType')
    this.api.id(this.id)
  }

  openbedTypes(): void {
    this._bottomSheet.open(SearchHotelsComponent);
    this.api.changeMessage('bedtype')
  }

  openRoomAminities(): void {
    this._bottomSheet.open(SearchHotelsComponent);
    this.api.changeMessage('roomaminities')
  }
  prodQty(val:string){
    if(this.hndlQty<20 && val==='plus'){
      this.hndlQty+=1
    }else if(this.hndlQty>1 && val==='min'){
      this.hndlQty-=1
    }
  }
  submitRoomForm(event:any){
    this.hotel = JSON.parse(localStorage.getItem('hotel') || '{}')
    let id = this.hotel.id
    console.log(id)
    this.roomData =  {
      hotel:id,
      totalbeds:this.hndlQty,
      roomtypes:event.target.roomtypes.value,
      aminities:event.target.aminities.value,
      bedtypes:event.target.bedtypes.value,
      price:event.target.price.value,
      images:event.target.images.value
    }
    console.log(this.roomData)
   if(!this.paramId){
    this.api.postRoomData(this.roomData).subscribe(res=>{
      console.log(res);
          alert('room added successfuly')
    })
   }else{
    this.api.updateRoomsData(this.roomData,this.paramId).subscribe(res=>{
      console.log(res);
          alert('room update successfuly')
          this.router.navigate(['add-rooms'])
    })
   }
  }

  goBack(){
    this._location.back()
  }
}
