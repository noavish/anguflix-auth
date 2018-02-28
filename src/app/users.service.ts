import {Injectable, EventEmitter} from '@angular/core';
import {LocalStorageService} from 'angular-2-local-storage';
import User from './models/user';
import Movie from './models/movie';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class UsersService {

    budgetUpdated: EventEmitter<number> = new EventEmitter<number>();

    private _user: User = new User();

    constructor(private localStorageService: LocalStorageService, private http: HttpClient) {

    }

    fetchUserDetails() {
        this.http.get<User>('/getUserDetails').subscribe(
            user => {
                this._user = user;
            },
            error => {
                console.log(error);
            });
    }

    getUser(): User {
        return this._user;
    }

    addSavedMovie(movie: Movie): boolean {
        if (this._user.budget - movie.price >= 0) {
            // Only add if this movie doesn't exist in the saved movies list yet
            if (!this._user.savedMovies.some(m => m._id == movie._id)) {
                this._user.savedMovies.push(movie);
                this.updateBudget(-movie.price);
                this.updateLocalStorage();
                return true;
            }

        }
        return false;
    }

    removeSavedMovie(movieId: string): boolean {
        let savedMovieIndex = this._user.savedMovies.findIndex(movie => movie._id == movieId);
        if (savedMovieIndex > -1) {
            // Refund the movie cost back into the user's budget
            this.updateBudget(this._user.savedMovies[savedMovieIndex].price);
            this._user.savedMovies.splice(savedMovieIndex, 1);
            this.updateLocalStorage();
            return true;
        }
        return false;
    }

    private updateBudget(value: number) {
        this._user.budget = this._user.budget + value;
        this.budgetUpdated.emit(this._user.budget);
    }

    private updateLocalStorage() {
        this.localStorageService.set('user', this._user);
    }
}
