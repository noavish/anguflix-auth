import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  username: string;
  password: string;

  ngOnInit() {
  }

  login() {
      this.authService.login({username: this.username, password: this.password}).subscribe(
          data => {
              console.log(data);
              localStorage.setItem('token', data.token);
              },
          error => {
              console.log(error);
          },
          () => this.router.navigate(['/'])
          );
  }
}
