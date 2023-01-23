import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  @ViewChild('movieList', { static: true }) movieListEl !: HTMLElement;

  listOfMovies: Movie[] = [];
  page: number = 1;

  listOfGenre: string[] = []
  listOfActors: Actor[] = []

  constructor(private titleService: Title, public route: ActivatedRoute, public router: Router, private movieService: MovieServiceService, private actorService: ActorServiceService) { }

  ngOnInit(): void {
    var title = "Movie | Recent";
    var actors = this.getActor();
    var genres = this.getGenre();
    if ((actors == null || actors == "") && (genres == null || genres == "")) {
      this.get50RecentMovies();
    }
    else {
      this.submitSearch();
    }
    this.getPageParam();
    this.titleService.setTitle(title)
  }

  public searchForID(id: string) {
    this.movieService.getAllMoviesWithNamesLike(id).subscribe(
      (response: Movie[]) => {
        this.listOfMovies = response
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public submitSearch() {
    var actors = this.getActor();
    var genres = this.getGenre();

    if ((actors != null && actors != "") && (genres != null && genres != "")) {
      this.getAllMoviesWithGenreAndActor(genres, actors)
    }
    else if (actors != null && actors != "") {
      this.getAllMoviesWithActor(actors);
    }
    else if (genres != null && genres != "") {
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

  //Pagination
  public getPageParam(){
    this.route.queryParams.subscribe(
      params => {
        const param = params['page'];
        var result = Number.parseInt(param);
        this.page = result;
      }
    )
  }

  public setPageParam(){
    this.router.navigate([],{
      queryParams: {page:this.page},
      queryParamsHandling: 'merge'
    })
  }

  public getActor(): String {
    var paramTest: String = "";
    this.route.queryParams.subscribe(
      params => {
        const param = params['Actor'];
        paramTest = param;
      }
    )
    return paramTest;
  }

  public getGenre(): String {
    var paramTest: String = "empy";
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

  scroll(el: HTMLElement) {
    el.scrollIntoView();
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
        this.titleService.setTitle("Movie | " + actor + " | " + genre)
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
        this.titleService.setTitle("Movie | " + genre)
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
        this.titleService.setTitle("Movie | " + actor)
      },
      (error: HttpErrorResponse) => {
        alert(error);
      }
    )
  }

  //Above are functions that communicate with the server

}
