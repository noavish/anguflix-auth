import { Component } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  budget : number

  constructor(private usersService : UsersService) {
    this.budget = this.usersService.getUser().budget;
    // Register for the budget change event so that we can update the counter
    // if anyone purchases or refunds a movie
    this.usersService.budgetUpdated.subscribe(newBudget => this.budget = newBudget);
  }
}
