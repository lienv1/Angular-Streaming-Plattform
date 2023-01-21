import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Actor } from '../model/Actor';
import { Movie } from '../model/Movie';
import { ActorServiceService } from '../service/actor-service.service';
import { MovieServiceService } from '../service/movie-service.service';

@Component({
  selector: 'app-movieinfo',
  templateUrl: './movieinfo.component.html',
  styleUrls: ['./movieinfo.component.css']
})
export class MovieinfoComponent implements OnInit {

  constructor(private titleService: Title, private movieService: MovieServiceService, private route: ActivatedRoute, private actorService: ActorServiceService) { }

  @Input() public id: string = "";

  public movie!: Movie;

  public videolinks: string[] = []

  public actorList: Actor[] = []

  ngOnInit(): void {
    this.titleService.setTitle("Moviepage");

  }

  ngAfterViewInit(): void {
    this.getMovieinfo()
  }

  public getMovieinfo() {
    var id = this.route.snapshot.paramMap.get('id');
    this.id = "" + id;
    if (this.id == "") {
      return;
    }
    this.movieService.getMovieByID(this.id.toUpperCase()).subscribe(
      (response: Movie) => {
        this.movie = response;
        this.getVideolinks();
        this.getActors(this.movie);
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public getVideolinks() {
    this.movieService.getAllStreamLinks(this.id).subscribe(
      (response: string[]) => {
        this.videolinks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getActors(movie: Movie) {
    for (let element of movie.actors) {
      this.actorService.getActorInfo(element.actorName).subscribe(
        (response: Actor) => {
          this.actorList.push(response)
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      )
    }

  }

  public getAge(actorBirthday: Date, movieReleased: Date): string {
    var d1 = new Date(actorBirthday.toString())
    var d2 = new Date(movieReleased.toString())
    var timeDiff = Math.abs(d2.getTime() - new Date(d1).getTime());
    var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age.toString()
  }

  public getActorList() {
    this.actorList.forEach(
      element => {
        console.log(this.actorList.length);
        console.log(element.actorName)
      }
    )
  }

}
