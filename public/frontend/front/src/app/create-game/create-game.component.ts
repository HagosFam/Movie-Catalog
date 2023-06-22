import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movie';
import { MoviesDataService } from '../services/movies-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {
  message!:string;
  gameForm = new FormGroup({
    gameName: new FormControl(),
    releaseYear: new FormControl()
  });
  response:any=""
  constructor(private _movieService:MoviesDataService, private route:Router) {
  }

  createGame() {
    let movie:Movie = new Movie("",[""], 2014, [""], []);
    movie.name = this.gameForm.value.gameName;
    movie.releaseYear = this.gameForm.value.releaseYear;
   
    this._movieService.createMovie(movie).subscribe({
      next:(res)=>{
        this.message = "Movie created!"
        this.response=res;
      //  this.route.navigate(["/movies"])
      },
      error:(err)=>{
        console.log("Error happend", err);
      },
      complete:()=>{

      }
    })



  }

}
