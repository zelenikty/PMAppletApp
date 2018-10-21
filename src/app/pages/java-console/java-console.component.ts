import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-java-console',
  templateUrl: './java-console.component.html',
  styleUrls: ['./java-console.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class JavaConsoleComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  modal: NgbModalRef;
  key: string;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private location: Location) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.modal = this.modalService.open(this.content, { centered: true });
  }

  back() {
    this.modal.close();
    this.location.back();
  }

  // Shortcut key press
  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {
      case 'F12':
        event.preventDefault();
        break;
      default:
        break;
    }
  }

}
