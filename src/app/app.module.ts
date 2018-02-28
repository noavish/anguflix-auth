import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingModule } from 'angular-star-rating';
import {RatingModule} from 'ng2-rating';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { AllMoviesComponent } from './all-movies/all-movies.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { AppRoutingModule } from './/app-routing.module';
import { MoviesComponent } from './movies/movies.component';
import { UsersService } from './users.service';
import { MoviesService } from './movies.service';
import { YearFilterComponent } from './year-filter/year-filter.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { UserReviewComponent } from './user-review/user-review.component';
import { NewReviewComponent } from './new-review/new-review.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import {AuthInterceptor} from '../AuthInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    AllMoviesComponent,
    MyMoviesComponent,
    MovieItemComponent,
    MovieComponent,
    SearchComponent,
    AddReviewComponent,
    MoviesComponent,
    YearFilterComponent,
    LoadingIndicatorComponent,
    UserReviewComponent,
    NewReviewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({
      prefix: 'anguflix',
      storageType: 'localStorage'
    }),
    NgbModule.forRoot(),
    RatingModule
  ],
  providers: [UsersService, MoviesService, AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
