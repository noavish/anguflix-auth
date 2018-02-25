import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent {

  @Input() loading : boolean

  constructor() { }

}
