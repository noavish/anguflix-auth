import {Component, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import Movie from '../models/movie';

@Component({
    selector: 'app-my-movies',
    templateUrl: './my-movies.component.html',
    styleUrls: ['./my-movies.component.css']
})
export class MyMoviesComponent implements OnInit {

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
    }

    removeMovie(movie) {
        this.usersService.removeSavedMovie(movie._id);
    }

    get movies() {
        console.log("trying to get data")
        console.log(this.usersService.getUser().savedMovies);
        return this.usersService.getUser().savedMovies;
    }

}
