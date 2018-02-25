import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import User from './models/user';
import Movie from './models/movie';

@Injectable()
export class UsersService {

  budgetUpdated : EventEmitter<number> = new EventEmitter<number>();
  private _user : User

  constructor(private localStorageService : LocalStorageService) {
    // Sets the current user to be either the saved local storage instance, or 
    // initializes a new instance of the User class in case the localStorage property is undefined
    this._user = this.localStorageService.get('user') || new User();
   }

  getUser() : User {
    return this._user;
  }

  addSavedMovie(movie : Movie) : boolean {
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

  removeSavedMovie(movieId : string) : boolean {
    var savedMovieIndex = this._user.savedMovies.findIndex(movie => movie._id == movieId);
    if (savedMovieIndex > -1) {
      // Refund the movie cost back into the user's budget
      this.updateBudget(this._user.savedMovies[savedMovieIndex].price);
      this._user.savedMovies.splice(savedMovieIndex, 1);
      
      this.updateLocalStorage();
      return true;
    }
    return false;
  }

  private updateBudget(value : number) {
    this._user.budget = this._user.budget + value;
    this.budgetUpdated.emit(this._user.budget);
  }

  private updateLocalStorage() {
    this.localStorageService.set('user', this._user);
  }
}
