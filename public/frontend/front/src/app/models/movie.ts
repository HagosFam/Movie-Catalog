import { Review } from "./review";

export class Movie {
    private _name: string = "";
    private _genre: string[] = [];
    private _releaseYear: number = 0;
    private _directors: string[] = [];
    private _reviews: Review[] = new Array()
  
    constructor(name: string, genre: string[], releaseYear: number, directors: string[], reviews:Review[]) {
      this._name = name;
      this._genre = genre;
      this._releaseYear = releaseYear;
      this._directors = directors;
      this._reviews = reviews
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(name: string) {
      this._name = name;
    }
  
    get genre(): string[] {
      return this._genre;
    }
  
    set genre(genre: string[]) {
      this._genre = genre;
    }
  
    get releaseYear(): number {
      return this._releaseYear;
    }
  
    set releaseYear(releaseYear: number) {
      this._releaseYear = releaseYear;
    }
  
    get directors(): string[] {
      return this._directors;
    }
  
    set directors(directors: string[]) {
      this._directors = directors;
    }


    get review(): Review[] {
      return this._reviews;
    }

    set review(reviews:Review[]) {
      this._reviews = reviews;
    }


  }
  