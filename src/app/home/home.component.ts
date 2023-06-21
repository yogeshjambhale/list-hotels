import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hotel:any
  hotels:any
 
  constructor(private api:CoreService,
    ) { }

  ngOnInit(): void {
    this.gethotels();

    
    
  }

  gethotels(){
    this.api.getHotelData().subscribe((res)=>{
      console.log(res)
      this.hotels = res;
    })
  }

  setHotel(id:any){
    this.api.getHotelDataById(id).subscribe((res)=>{
      console.log(res)
      this.hotel = res;
      localStorage.setItem('hotel',JSON.stringify(this.hotel));
      location.reload();
    })
    
  }
}
