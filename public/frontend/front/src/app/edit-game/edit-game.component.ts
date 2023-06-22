import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesDataService } from '../services/movies-data.service';
import { Movie } from '../models/movie';
import { FormControl, FormGroup } from '@angular/forms';

export class movieModel {
  name!: string;
  releaseYear!: number;
}

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css'],
})
export class EditGameComponent implements OnInit {
  id!: any;
  movie!: Movie;
  responseMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private _gameService: MoviesDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    console.log(this.id);
    this.getGame(this.id);
  }

  getGame(id: string) {
    this._gameService.getOneMovie(id).subscribe({
      next: (res) => {
        this.movie = res;
      },
      error: (err) => {},
    });
  }

  updateMovie() {
    let movie: Movie = new Movie('', [''], 2014, [''], []);
    movie.name = this.movie.name;
    movie.releaseYear = this.movie.releaseYear;
    console.log('sending this ', this.movie);
    this._gameService.updateMovie(movie, this.id).subscribe({
      next: (res) => {
        console.log('Movie updated', res);
        this.router.navigate(['/movies']).then(()=>{
           this.responseMessage = 'Movie updated successfully';
        });
      },
      error: (err) => {
        console.log('Error thrown', err);
        this.responseMessage = 'Error happend while updating';
      },
      complete: () => {},
    });
  }
}
