import { Component, OnInit } from '@angular/core';
import { CoreService } from '../core.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-rooms',
  templateUrl: './add-rooms.component.html',
  styleUrls: ['./add-rooms.component.css']
})
export class AddRoomsComponent implements OnInit {

  hotels:any
  rooms:any
  constructor(private api : CoreService,
    private _location: Location) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(){
    let hotel = JSON.parse(localStorage.getItem('hotel') || '{}');
    let hotelId = hotel.id;
    this.api.getHotelDataById(hotelId).subscribe((res)=>{
      console.log(res)
      this.hotels = res.room;
    })
    
  }
  
  setRoomId(id:any){
    this.api.getRoomsData(id).subscribe((res)=>{
      console.log(res)
      this.rooms = res;
    })
  }
  goBack(){
    this._location.back()
  }
}
