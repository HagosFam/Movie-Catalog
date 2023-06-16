import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review';
import { ActivatedRoute } from '@angular/router';
import { MoviesDataService } from '../services/movies-data.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css'],
})
export class ManageReviewsComponent implements OnInit {
  fetchedData!:any[]
  review!: Review;
  movieId!: string;

  constructor(private _route: ActivatedRoute, private _service:MoviesDataService) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.movieId = params['id'];
    });
  this.getMovie(this.movieId)
  }
  getMovie(id: string) {
    this._service.getOneMovie(id).subscribe({
      next: (res)=>{
        console.log("coming movie", res)
      },
      error:(err)=>{
        console.log("Movie retrieve error", err)
      },
      complete:()=>{

      }
    })
  }

  editReview(id:any) {

  }

  deleteReview(id:any) {

  }
}
