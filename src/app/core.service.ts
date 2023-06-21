import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private messageSource = new BehaviorSubject<string>("");
  currentMassage = this.messageSource.asObservable();
  private discMassageSource = new BehaviorSubject<string>("");
  discMassage = this.discMassageSource.asObservable();
  private amiMassageSource = new BehaviorSubject<string>("");
  amiMassage = this.amiMassageSource.asObservable();
  private stayMassageSource = new BehaviorSubject<string>("");
  stayMassage = this.stayMassageSource.asObservable();
  private rtMassageSource = new BehaviorSubject<string>("");
  rtMassage = this.rtMassageSource.asObservable();
  private btMassageSource = new BehaviorSubject<string>("");
  btMassage = this.btMassageSource.asObservable();
  private raMassageSource = new BehaviorSubject<string>("");
  raMassage = this.raMassageSource.asObservable();
  private idMassageSource = new BehaviorSubject<string>("");
  idMassage = this.idMassageSource.asObservable();

  constructor(private http:HttpClient) { }

  changeMessage(message:string){
    this.messageSource.next(message)
  }

  hotelaminities(aminities:string){
    this.amiMassageSource.next(aminities)
  }
  stayType(st:string){
    this.stayMassageSource.next(st)
  }
  discription(dc:string){
    this.discMassageSource.next(dc)
  }
  roomtype(rt:string){
    this.rtMassageSource.next(rt)
  }
  bedtype(bt:string){
    this.btMassageSource.next(bt)
  }
  roomAminities(ra:string){
    this.raMassageSource.next(ra)
  }
  id(id:string){
    this.idMassageSource.next(id)
  }

  getRoomStayData(){
    return this.http.get<any>('https://mytripworldwide.com/api/v1/category/55/')
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getHotelAminitiesData(){
    return this.http.get<any>('https://mytripworldwide.com/api/v1/category/223/')
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getRoomAminitiesData(){
    return this.http.get<any>('https://mytripworldwide.com/api/v1/category/225/')
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getRoomTypeData(){
    return this.http.get<any>('https://mytripworldwide.com/api/v1/category/227/')
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getBedTypeData(){
    return this.http.get<any>('https://mytripworldwide.com/api/v1/category/229/')
    .pipe(map((res:any)=>{
      return res
    }))
  }

  postHotelData(data:any){
    return this.http.post<any>('http://localhost:8000/hotels/',data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  postRoomData(data:any){
    return this.http.post<any>('http://localhost:8000/rooms/',data)
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getHotelDataById(id:any){
    return this.http.get<any>('http://localhost:8000/hotel/'+ id +"/")
    .pipe(map((res:any)=>{
      return res
    }))
  }

  getHotelData(){
    return this.http.get<any>('http://localhost:8000/hotels/')
    .pipe(map((res:any)=>{
      return res
    }))
  }
  updateHotelData(data:any,id:any){
    return this.http.put<any>('http://localhost:8000/hotel/'+ id +"/",data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  getRoomsData(id:any){
    return this.http.get<any>('http://localhost:8000/room/'+ id +"/")
    .pipe(map((res:any)=>{
      return res
    }))
  }
  updateRoomsData(data:any,id:any){
    return this.http.put<any>('http://localhost:8000/room/'+ id +"/",data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
}
