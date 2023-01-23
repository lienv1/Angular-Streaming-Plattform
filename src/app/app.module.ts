import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActorComponent } from './actor/actor.component';
import { MovieComponent } from './movie/movie.component';
import { ProfilComponent } from './profil/profil.component';
import { MovieinfoComponent } from './movieinfo/movieinfo.component';
import { ActorinfoComponent } from './actorinfo/actorinfo.component';
import { MovieServiceService } from './service/movie-service.service';
import { ActorServiceService } from './service/actor-service.service';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ActorComponent,
    MovieComponent,
    ProfilComponent,
    MovieinfoComponent,
    ActorinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [MovieServiceService,ActorServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
