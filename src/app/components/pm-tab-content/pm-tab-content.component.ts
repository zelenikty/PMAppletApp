import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pm-tab-content',
  templateUrl: './pm-tab-content.component.html',
  styleUrls: ['./pm-tab-content.component.scss']
})
export class PmTabContentComponent {

  @Input() title: string;
  @Input() active = false;
  @Input() disable = false;
  @Input() id: number;

}
