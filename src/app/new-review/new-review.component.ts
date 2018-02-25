import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Review from '../models/review';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css']
})
export class NewReviewComponent implements OnInit {

  @Input() rating : number;
  @Input() disabled: boolean;
  @Output() reviewAdded : EventEmitter<Review> = new EventEmitter<Review>();
  review : Review = new Review()

  constructor() { }

  ngOnInit() {
  }

  addReview() {
    this.reviewAdded.emit(this.review);
  }



}
