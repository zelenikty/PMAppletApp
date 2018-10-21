import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pm-card',
  templateUrl: './pm-card.component.html',
  styleUrls: ['./pm-card.component.scss']
})
export class PmCardComponent {

  @Input() title: string;
  @Input() className = '';

}
