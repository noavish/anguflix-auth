import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import Movie from '../models/movie';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {

  movies : Movie[]
  constructor(private usersService : UsersService) { }

  ngOnInit() {
    this.setSavedMovies();
  }

  removeMovie(movie) {
    this.usersService.removeSavedMovie(movie._id);
    this.setSavedMovies();
  }

  private setSavedMovies() {
    this.movies = this.usersService.getUser().savedMovies;
  }

}
