import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomsComponent } from './add-rooms/add-rooms.component';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { RoomsComponent } from './hotel/rooms/rooms.component';
import { SearchHotelsComponent } from './search-hotels/search-hotels.component';

const routes: Routes = [
  { path: 'search', component: SearchHotelsComponent},
  { path: 'hotel/:id', component: HotelComponent},
  { path: 'hotel', component: HotelComponent},
  { path: 'rooms/:id', component: RoomsComponent},
  { path: 'rooms', component: RoomsComponent},
  { path: 'add-rooms', component: AddRoomsComponent},
  { path: '', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
