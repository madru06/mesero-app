import { Component } from '@angular/core';
import { LoginService } from './_service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mesero-app';

  constructor(
    public loginService : LoginService
  ){}
}
