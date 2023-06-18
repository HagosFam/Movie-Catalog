import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
}


// when i was about to run the application usign just one command, this is just added on the angular.json file
// "scripts": {
//   "startfrontend":"cd public\\frontend\\front && npm start",
//   "startbackend": "npm start",
//   "start": "npm run startfrontend | npm run startbackend",
//   "test": "echo \"Error: no test specified\" && exit 1"
// },
