import Movie from "./movie";

export default class User {
    savedMovies : Movie[] = new Array<Movie>()
    budget : number = 30;
    username:string="";
    id:number;
}
