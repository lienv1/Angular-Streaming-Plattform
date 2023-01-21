import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actor } from '../model/Actor';
import { Movie } from '../model/Movie';
import { ActorServiceService } from '../service/actor-service.service';
import { MovieServiceService } from '../service/movie-service.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  listOfMovies: Movie[] = [];
  page: number = 1;
  pageSize: number = 1;

  listOfGenre: string[] = []
  listOfActors: Actor[] = []

  constructor(public route: ActivatedRoute, public router: Router, private movieService: MovieServiceService, private actorService: ActorServiceService) { }

  ngOnInit(): void {
    this.get50RecentMovies();
  }

  public searchForID() {

  }

  public submitSearch() {
    var actors = this.getActor();
    var genres = this.getGenre();

    if (actors.length > 0 && genres.length > 0) {
      this.getAllMoviesWithGenreAndActor(genres, actors)
    }
    else if (actors.length > 0) {
      this.getAllMoviesWithActor(actors);
    }
    else if (genres.length > 0) {
      this.getAllMoviesWithGenre(genres);
    }
    else {
      return;
    }
  }

  public searchForGenre(genre: string) {
    if (genre == null || genre == "")
      return
    this.movieService.getAllGenresLike(genre).subscribe(
      (response: string[]) => {
        this.listOfGenre = response;
      },
      (error: HttpErrorResponse) => {
        alert(error)
      }
    )
  }

  public searchForActor(actor: string) {
    if (actor == null || actor == "")
      return
    this.actorService.searchForActor(actor).subscribe(
      (response: Actor[]) => {
        this.listOfActors = response;
      },
      (error: HttpErrorResponse) => {
        alert(error)
      }
    )
  }

  //Below are functions that doesn't affect server
  public getArrayOfString(str: String): String[] {
    var list: String[] = [];
    var splittedStr = str.split("¿");
    splittedStr.forEach(element => {
      if (element != null || element != "") {
        list.push(element);
      }
    })
    return list;
  }

  public getActor(): String {
    var paramTest: String = "empty";
    this.route.queryParams.subscribe(
      params => {
        const param = params['Actor'];
        paramTest = param;
      }
    )
    return paramTest;
  }

  public getGenre(): String {
    var paramTest: String = "empty";
    this.route.queryParams.subscribe(
      params => {
        const param = params['Genre'];
        paramTest = param;
      }
    )
    return paramTest;
  }

  public addActor(actor: string) {
    var toAdd = "";
    if (this.getActor() != null)
      toAdd += this.getActor() + "¿";
    if (toAdd.includes(actor))
      return;
    toAdd += actor;
    this.router.navigate([], {
      queryParams: { Actor: toAdd },
      queryParamsHandling: 'merge'
    })
  }

  public addGenre(genre: string) {
    var toAdd = "";
    if (this.getGenre() != null)
      toAdd += this.getGenre() + "¿";
    if (toAdd.includes(genre))
      return;
    toAdd += genre;
    this.router.navigate([], {
      queryParams: { Genre: toAdd },
      queryParamsHandling: 'merge'
    })
  }

  public removeActor(actor: String) {
    var actors = this.getActor();
    actors = actors.replace("¿" + actor.toString(), "").replace(actor.toString() + "¿", "").replace(actor.toString(), "").replace("¿¿", "");
    if (actors == null || actors == "" || actors == "¿") {
      this.router.navigate([], {
        queryParams: { Actor: null }
      })
    }
    else {
      this.router.navigate([], {
        queryParams: { Actor: actors },
        queryParamsHandling: 'merge'
      })
    }
  }

  public removeGenre(genre: String) {
    var genres = this.getGenre();
    genres = genres.replace("¿" + genre.toString(), "").replace(genre.toString() + "¿", "").replace(genre.toString(), "").replace("¿¿", "");
    if (genres == null || genres == "" || genres == "¿") {
      this.router.navigate([], {
        queryParams: { Genre: null }
      })
    }
    else {
      this.router.navigate([], {
        queryParams: { Genre: genres },
        queryParamsHandling: 'merge'
      })
    }
  }

  public hasGenre(): Boolean {
    return this.getGenre() != null;
  }
  public hasActor(): Boolean {
    return this.getActor() != null;
  }
  //Above are functions that doesn't affect server

  //Below are functions that communicate with the server
  public get50RecentMovies() {
    this.movieService.getAllRecentMovies().subscribe(
      (response: Movie[]) => {
        this.listOfMovies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error)
      }
    )
  }

  public getAllMoviesWithGenreAndActor(genre: String, actor: String) {
    this.movieService.getAllMoviesWithGenreAndActor(genre, actor).subscribe(
      (response: Movie[]) => {
        this.listOfMovies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }
  public getAllMoviesWithGenre(genre: String) {
    this.movieService.getAllMoviesWithGenres(genre).subscribe(
      (response: Movie[]) => {
        this.listOfMovies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }
  public getAllMoviesWithActor(actor: String) {
    this.movieService.getAllMoviesWithActors(actor).subscribe(
      (response: Movie[]) => {
        this.listOfMovies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }

  //Above are functions that communicate with the server

}
