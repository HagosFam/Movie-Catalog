import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesDataService } from '../services/movies-data.service';
import { Movie } from '../models/movie';
import { FormControl, FormGroup } from '@angular/forms';

export class movieModel {
  name!:string;
  releaseYear!:number;
}

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  id!:any;
  movie!:Movie;

  constructor(private route:ActivatedRoute, private _gameService:MoviesDataService) {
  }


 ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id = params['id'];
    })
    console.log(this.id);
    this.getGame(this.id);
  }

  getGame(id:string) {
    this._gameService.getOneMovie(id).subscribe({
      next:(res)=>{
        console.log("Movie arrived", res)
        this.movie = res
      },
      error:(err)=>{
        console.log("Getting movie error", err);
      }
    })
  }

  updateMovie() {
    console.log("We are sending this data", this.movie);
    
    this._gameService.updateMovie(this.movie, this.id).subscribe({
         next: (res)=>{
           console.log("Movie updated", res);
         },
         error: (err)=>{
          console.log("Error thrown", err);       
         },
         complete: ()=>{

         }
    })

  }
}
