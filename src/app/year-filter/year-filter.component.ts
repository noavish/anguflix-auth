import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-year-filter',
  templateUrl: './year-filter.component.html',
  styleUrls: ['./year-filter.component.css']
})
export class YearFilterComponent implements OnInit {

  @Input() year : number
  @Output() yearChanged : EventEmitter<number> = new EventEmitter<number>()
  yearOptions : number[] = this.generateYears()

  constructor() { }

  ngOnInit() {
  }

  changeYear() {
    this.yearChanged.emit(this.year);
  }

  private generateYears() {
    let years = []
    for (let index = new Date().getFullYear(); index > 1950 ; index--) {
      years.push(index)
    } 
    return years;
  }

}
