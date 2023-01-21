import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorComponent } from './actor/actor.component';
import { ActorinfoComponent } from './actorinfo/actorinfo.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { ActorServiceService } from './service/actor-service.service';
import { MovieServiceService } from './service/movie-service.service';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path: '', redirectTo: '/home', pathMatch : 'full'},
  {path:'movie',component:MovieComponent},
  {path:'movieinfo',component:MovieinfoComponent},
  {path:'movieinfo/:id',component:MovieinfoComponent},
  {path:'actor',component:ActorComponent},
  {path:'actorinfo', component:ActorinfoComponent},
  {path:'actorinfo/:id', component:ActorinfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [MovieServiceService,ActorServiceService]
})
export class AppRoutingModule { }
