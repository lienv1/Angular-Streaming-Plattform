import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from '../model/Actor';

@Injectable({
  providedIn: 'root'
})
export class ActorServiceService {

  apiBaseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {
  }

  public getActorInfo(actorname:string):Observable<Actor>{
    return this.http.get<Actor>(`${this.apiBaseUrl}/actor/name/${actorname}`)
  }

  public searchForActor(actorname:string):Observable<Actor[]>{
    return this.http.get<Actor[]>(`${this.apiBaseUrl}/actor/search/${actorname}`)
  }

  public getActorImageFile(studio:string,id:string):Observable<string>{
    return this.http.get<string>(`${this.apiBaseUrl}/stream/picture/actor/${id}.jpg`)
  }
}
