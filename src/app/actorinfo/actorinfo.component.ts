import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Actor } from '../model/Actor';
import { ActorServiceService } from '../service/actor-service.service';

@Component({
  selector: 'app-actorinfo',
  templateUrl: './actorinfo.component.html',
  styleUrls: ['./actorinfo.component.css']
})
export class ActorinfoComponent implements OnInit {

  constructor(private titleService: Title, private actorService: ActorServiceService, private route: ActivatedRoute) { }

  public actor: Actor | undefined

  ngOnInit(): void {
    this.titleService.setTitle("Actor");
    this.getActorInfo();
  }

  public getActorInfo() {
    var nameFromURL = this.getNameFromURL()
    if (nameFromURL == null){
      alert("No name")
      return
    }
      
    this.actorService.getActorInfo(nameFromURL).subscribe(
      (repsonse:Actor) => {
        this.actor = repsonse;
        this.titleService.setTitle(nameFromURL + " Bio")
      },
      (error:HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getNameFromURL(): string {
    var id = this.route.snapshot.paramMap.get('id');
    if (id == "") {
      return "";
    }
    return id+"";
  }

}
