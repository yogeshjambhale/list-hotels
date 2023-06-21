import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { element } from 'protractor';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ActivatedRoute } from '@angular/router';
import { details } from '../room-stay.model';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-search-hotels',
  templateUrl: './search-hotels.component.html',
  styleUrls: ['./search-hotels.component.css']
})
export class SearchHotelsComponent implements OnInit {

  roomstay:any=[];
  roomtype:any=[];
  roomAminities:any=[];
  hotelAminities:any=[];
  bedType:any=[];

  roomStay=false;
  roomType=false;
  roomaminities=false;
  hotelaminities=false;
  bedtype=false;

  form!:FormGroup ;
  formGroup!:FormGroup ;
  message:string='';
  dc:string='';
  aminities:string='';
  st:string='';
  rt:string='';
  bt:string='';
  ra:string=''
  id:string='';
  // hoteldetails:any=[]
  roomtypedetails:any=[] ;
  roomamidetails:any=[] ;
  bedtypesdetails:any=[] ;
  hotelAminitiesdetails:any=[]
  staytypedetails:any=[]
  description:any

  constructor(private api:CoreService,
              private _formBuilder: FormBuilder,
              private bottomSheet: MatBottomSheet,
              private activeRoute:ActivatedRoute) { 
      
      this.form = this._formBuilder.group({
        checkArray: this._formBuilder.array([]),
      })
      this.formGroup = this._formBuilder.group({
        description : ['',Validators.required],
        
      })
              }

  ngOnInit(): void {
    this.getRoomstayData();
    this.getBedTypeData();
    this.getHotelAminitiesData();
    this.getRoomAminitiesData();
    this.getRoomTypeData();
    // this.getdetails();
    
    this.api.currentMassage.subscribe(message => this.message = message)
    this.api.amiMassage.subscribe(aminities => this.aminities = aminities)
    this.api.stayMassage.subscribe(st => this.st = st)
    this.api.discMassage.subscribe(dc => this.dc = dc)
    this.api.rtMassage.subscribe(rt => this.rt = rt)
    this.api.btMassage.subscribe(bt => this.bt = bt)
    this.api.raMassage.subscribe(ra => this.ra = ra)
    
    
  

  }
  
  
  
  getRoomstayData(){

    let index:number = 1;
    this.api.getRoomStayData().subscribe((res)=>{
      
      this.roomstay =res.sub_categories;
      console.log(this.roomstay,'jbj');

      for (let i = 0; i < this.roomstay.length; i++) {
        this.staytypedetails.push({ name: this.roomstay[i].name, isselected: false }); // Add new items to the array
        console.log(this.staytypedetails);
      }
      let rTypes = JSON.parse(localStorage.getItem('hotel') || '{}')
      console.log(rTypes.staytypes)
      
       
      this.staytypedetails.filter((x: { name: any; }) =>x.name == rTypes.staytypes).map((x: { isselected: boolean; })=>x.isselected=true);
      
    })
    if( this.message === 'roomStay'  ){
      this.roomStay=true;
    }else{
      this.roomStay=false;
    }
  }
  
  getRoomTypeData(){

    
    this.api.getRoomTypeData().subscribe((res)=>{
      
      this.roomtype =res.sub_categories;
      console.log(this.roomtype,'jijii');
      for (let i = 0; i < this.roomtype.length; i++) {
        this.roomtypedetails.push({ name: this.roomtype[i].name, isselected: false }); // Add new items to the array
        console.log(this.roomtypedetails);
      }
      let rTypes = JSON.parse(localStorage.getItem('room') || '{}')
      console.log(rTypes.roomtypes)
      
      
      this.roomtypedetails.filter((x: { name: any; }) =>x.name == rTypes.roomtypes).map((x: { isselected: boolean; })=>x.isselected=true);
      
    })
    if( this.message === 'roomType'  ){
      this.roomType=true;
    }else{
      this.roomType=false;
    }
    
  }

  getRoomAminitiesData(){

    let index:number = 1;
    this.api.getRoomAminitiesData().subscribe((res)=>{
      
      this.roomAminities =res.sub_categories;
      console.log(this.roomAminities);
      for (let i = 0; i < this.roomAminities.length; i++) {
        this.roomamidetails.push({ name: this.roomAminities[i].name, isselected: false }); // Add new items to the array
        console.log(this.roomamidetails);
      }
      let rAminities = JSON.parse(localStorage.getItem('room') || '{}')
      console.log(rAminities.aminities)
      
      
      this.roomamidetails.filter((x: { name: any; }) =>x.name == rAminities.aminities).map((x: { isselected: boolean; })=>x.isselected=true);
  
    })
    if( this.message === 'roomaminities'  ){
      this.roomaminities=true;
    }else{
      this.roomaminities=false;
    }
    
  }


  getBedTypeData(){

    let index:number = 1;
    this.api.getBedTypeData().subscribe((res)=>{
      
      this.bedType =res.sub_categories;
      console.log(this.bedType);
      for (let i = 0; i < this.bedType.length; i++) {
        this.bedtypesdetails.push({ name: this.bedType[i].name, isselected: false }); // Add new items to the array
        console.log(this.bedtypesdetails);
      }
      let bTypes = JSON.parse(localStorage.getItem('room') || '{}')
      console.log(bTypes.roomtypes)
      
      
      this.bedtypesdetails.filter((x: { name: any; }) =>x.name == bTypes.bedtypes).map((x: { isselected: boolean; })=>x.isselected=true);
  
    })
    if( this.message === 'bedtype'  ){
      this.bedtype=true;
    }else{
      this.bedtype=false;
    }
  }

  getHotelAminitiesData(){

    let index:number = 1;
    this.api.getHotelAminitiesData().subscribe((res)=>{
      
      this.hotelAminities =res.sub_categories;
      console.log(this.hotelAminities);
      for (let i = 0; i < this.hotelAminities.length; i++) {
        this.hotelAminitiesdetails.push({ name: this.hotelAminities[i].name, isselected: false }); // Add new items to the array
        console.log(this.hotelAminitiesdetails);
      }
      let bTypes = JSON.parse(localStorage.getItem('hotel') || '{}')
      console.log(bTypes.aminities)

      this.hotelAminitiesdetails.filter((x: { name: any; }) =>x.name == bTypes.aminities).map((x: { isselected: boolean; })=>x.isselected=true);
  
    })
    if(this.message === 'hotelaminities'){
      this.hotelaminities=true;
    }
    this.hotelaminities=false;
  }
  
  decriptionData(){
    if(this.message === 'description'){
      this.hotelaminities=true;
      this.description= JSON.parse(localStorage.getItem('hotel') || '{}')
      console.log(this.description.description)
    }
    this.hotelaminities=false;
  }
  onChackboxChange(e:any){
    const checkArray:FormArray = this.form?.get('checkArray') as FormArray;
    console.log(checkArray.value,'jikj')
    if(e.target.checked){
      checkArray.push(new FormControl(e.target.value));
      
    }
    else{
      var i=0;

      checkArray.controls.forEach((item:any)=>{
        if(item.value == e.target.value){
          checkArray.removeAt(i);
          return;
        }
        i++;
      })
    }
    
  }
  submithotelaminities(){
    console.log(this.form.value)
    this.bottomSheet.dismiss();  
    this.api.hotelaminities(this.form.value.checkArray );
    localStorage.setItem('hotelaminities', JSON.stringify(this.form.value.checkArray))
  }
  submitstaytypes(){
    console.log(this.form.value)
    this.bottomSheet.dismiss();  
    this.api.stayType(this.form.value.checkArray );
    localStorage.setItem('roomStay', JSON.stringify(this.form.value.checkArray))
  }
  submitroomtypes(){
    console.log(this.form.value)
    this.bottomSheet.dismiss();  
    this.api.roomtype(this.form.value.checkArray );
    localStorage.setItem('roomtype', JSON.stringify(this.form.value.checkArray))
  }
  submitbedtypes(){
    console.log(this.form.value)
    this.bottomSheet.dismiss();  
    this.api.bedtype(this.form.value.checkArray );
    localStorage.setItem('bedtypes', JSON.stringify(this.form.value.checkArray))
  }
  submitroomaminities(){
    console.log(this.form.value)
    this.bottomSheet.dismiss();  
    this.api.roomAminities(this.form.value.checkArray );
    localStorage.setItem('roomaminities', JSON.stringify(this.form.value.checkArray))
  }

  submitDescription(){
    console.log(this.formGroup.value)
    this.bottomSheet.dismiss();  
    this.api.discription(this.formGroup.value.description );
    localStorage.setItem('description', JSON.stringify(this.formGroup.value))
  }
  
  
}
