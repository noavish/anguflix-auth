import { Component,OnInit } from '@angular/core';
import { UsersService } from './users.service';
import User from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  // user: User = new/ User();

  constructor(private usersService : UsersService) {
   // this.user = this.usersService.getUser();
  }

  ngOnInit() {
      this.usersService.fetchUserDetails();
  }

  get user() {
      return this.usersService.getUser();
  }

  logout() {
      localStorage.removeItem('token');
  }
}
