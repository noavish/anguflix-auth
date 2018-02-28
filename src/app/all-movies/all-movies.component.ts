import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import Movie from '../models/movie';
import { UsersService } from '../users.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.css']
})
export class AllMoviesComponent implements OnInit {

  movies: Movie[]
  filters = {
    title: '',
    year: null
  }
  outOfBudgetAlert: boolean = false;
  loading: boolean = false;

  constructor(private moviesService: MoviesService, private usersService : UsersService, private  authService: AuthService) { }

  ngOnInit() {
    this.setMovies();
    console.log(this.authService.isLoggedIn());
  }

  saveMovie(movie) {
    var movieSaveResult = this.usersService.addSavedMovie(movie);
    // Set outOfBudget according to the result of the addSavedMovieMethod, that returns false
    // if the movie save was unsuccessful
    this.outOfBudgetAlert = !movieSaveResult;
    this.filterSavedMovies();
  }

  updateFilter(name, value) {
    this.filters[name] = value;
    this.setMovies();
  }


  setMovies() {
    this.loading = true;
    setTimeout(() => {
      this.moviesService.getMovies(this.filters).subscribe(movies => {
        this.loading = false;
        this.movies = movies;
        this.filterSavedMovies();
      });
    }, 2000);
  }

  private filterSavedMovies() {
    this.movies = this.movies.filter(movie => {
      return !this.usersService.getUser().savedMovies.some((savedMovie) => {
        return savedMovie._id == movie._id;
      })
    })
  }

}
