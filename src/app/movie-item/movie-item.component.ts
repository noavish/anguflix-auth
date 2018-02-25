import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import '../models/movie';
import Movie from '../models/movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input() movie : Movie = new Movie()
  @Input() removeMode : boolean
  @Output() addMovieClicked : EventEmitter<Movie> = new EventEmitter<Movie>()
  @Output() removeMovieClicked : EventEmitter<Movie> = new EventEmitter<Movie>()

  constructor() { }

  ngOnInit() {
  }

  addMovie() {
    this.addMovieClicked.emit(this.movie);
  }

  removeMovie() {
    this.removeMovieClicked.emit(this.movie);
  }

}
