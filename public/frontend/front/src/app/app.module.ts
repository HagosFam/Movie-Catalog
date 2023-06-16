import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GameDetailComponent } from './game-detail/game-detail.component';
import { HomeComponent } from './home/home.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { ManageReviewsComponent } from './manage-reviews/manage-reviews.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { CreateReviewComponent } from './create-review/create-review.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GameDetailComponent,
    HomeComponent,
    CreateGameComponent,
    LoginComponent,
    RegisterComponent,
    EditGameComponent,
    MoviesComponent,
    ManageReviewsComponent,
    EditReviewComponent,
    CreateReviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'movies',
        component: MoviesComponent,
      },
      {
        path: 'createMovie',
        component: CreateGameComponent,
      },
      {
        path: 'editMovie/:id',
        component: EditGameComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path :"manageReview/:id",
        component: ManageReviewsComponent
      },
      {
        path :"createReview/:id",
        component: CreateReviewComponent
      },
      {
        path :"editReview/:id",
        component: EditReviewComponent
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
