import { Component } from '@angular/core';
import { Movie } from '../models/movie';
import { MoviesDataService } from '../services/movies-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  movies:any;

  constructor(private _movieService: MoviesDataService, private router:Router) {}
  ngOnInit(): void {
    console.log("this get called");
    
   this.getMoviesList();
  }

  getMoviesList() {
    this._movieService.getMovies().subscribe({
      next: (res) => {
        this.movies=res
      },
      error: (err) => {
        console.log('Error in retrieving');
        console.log(err);
      },
      complete: () => {},
    });
  }

  editMovie(id:string) {
    this.router.navigate(["/editMovie", id]);
  }

  manageReview(id:string) {
    this.router.navigate(["/manageReview", id])
  }

  deleteMovie(id:string) {
  this._movieService.deleteMovie(id).subscribe({
    next:(res)=>{
      console.log("Movie deleted", res);
      this.getMoviesList();
    },
    error:(err)=>{
      console.log("Error", err);
      
    },
    complete:()=>{

    }
  })

  }

}
