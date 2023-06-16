import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movie';
import { MoviesDataService } from '../services/movies-data.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {
  gameForm = new FormGroup({
    gameName: new FormControl(),
    releaseYear: new FormControl()
  });
  response:any=""
  constructor(private _movieService:MoviesDataService) {
  }

  createGame() {
    let movie:Movie = new Movie("",[""], 2014, [""], []);
    movie.name = this.gameForm.value.gameName;
    movie.releaseYear = this.gameForm.value.releaseYear;
   console.log("Movie", movie);
   
    this._movieService.createMovie(movie).subscribe({
      next:(res)=>{
        console.log("Movie created", res);
        this.response=res;
      },
      error:(err)=>{
        console.log("Error happend", err);
      },
      complete:()=>{

      }
    })



  }

}
