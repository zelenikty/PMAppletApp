import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { SingleSearchService } from 'src/app/services/single-search.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-single-search',
  templateUrl: './single-search.component.html',
  styleUrls: ['./single-search.component.scss']
})
export class SingleSearchComponent implements OnInit {
  @ViewChild('content') content: ElementRef;

  orderTypes: any[] = [];
  key: string;
  searchForm: FormGroup;
  isFormValid: boolean;
  hasOpenModal: any;
  isToBeDone: boolean;
  confirmMsg: string;
  confirmModel: any;
  isDeleteConf: boolean;
  constructor(
    private fb: FormBuilder,
    private singleSearchService: SingleSearchService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private router: Router
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.singleSearchService.getSingleSearchData().subscribe(
      res => {
        this.orderTypes = res.types.map(l => l.value);
      }
    );
    this.isFormValid = true;
    this.searchForm = this.fb.group({
      searchType: [null],
      branchName: [null],
      contactId: [null, Validators.required],
    });
  }

  /*** Show button click or S press*/
  show() {
    console.log(this.searchForm.value);
    const request = {
      'limitAnswer': {
        'maxToReturn': '500',
        'returnAll': false
      },
      'dealDetails': {
        'ordernofrom': '12345',
        'settlementBranch': '0123',
      },
      'header': {
        'traceLevel': '0',
        'userLangCd': '1',
        'filler01': ' ',
        'clientId': 'ED',
      }
    };

    console.log(request);

    this.isFormValid = true;
    if (this.searchForm.valid) {
      this.router.navigate(['/display']);
    } else {
      this.isFormValid = false;
    }
  }

  /***  Verify button click or S press */
  verify(content) {
    if (!this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isToBeDone = true;
      this.confirmMsg = 'To be done in integration ';
      this.confirmModel = this.modalService.open(content, { centered: true });
    }
  }
  /***  Delete button click or S press*/
  delete(content) {
    if (!this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isDeleteConf = true;
      this.confirmMsg = 'Are you sure that you want to delete this order?';
      this.confirmModel = this.modalService.open(content, { centered: true });
    }

  }
  /***  Cancel button click or S press*/
  cancel(content) {
    if (!this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isDeleteConf = false;
      this.confirmMsg = 'Are you sure that you want to cancel this order?';
      this.confirmModel = this.modalService.open(content, { centered: true });
    }
  }
  /***  Modify button click or S press*/
  modify() {
    this.router.navigate(['/display']);

  }
  /***  Repeat button click or S press*/
  repeat(content) {
    if (!this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isToBeDone = true;
      this.confirmMsg = 'To be done in integration ';
      this.confirmModel = this.modalService.open(content, { centered: true });
    }

  }


  /***
 * Shortcut key functions
 */
  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {
      case 'S':
        event.preventDefault();
        this.show();
        break;
      case 'V':
        event.preventDefault();
        this.verify(this.content);
        break;
      case 'D':
        event.preventDefault();
        this.delete(this.content);
        break;
      case 'C':
        event.preventDefault();
        this.cancel(this.content);
        break;
      case 'M':
        event.preventDefault();
        this.modify();
        break;
      case 'R':
        event.preventDefault();
        this.repeat(this.content);
        break;
      case 'Y':
        this.deleteConfirm();
        break;
      case 'N':
        this.deleteCancel();
        break;
      case 'F12':
        event.preventDefault();
        this.goBackToMainMenu();
        break;

    }
  }

  goBackToMainMenu() {
    this.router.navigate(['/main-menu']);

  }

  /** Confirm delete */
  deleteConfirm() {
    if (this.confirmModel) {
      this.confirmModel.close();
      this.hasOpenModal = false;
    }

  }

  /** Cancel delete */
  deleteCancel() {
    if (this.confirmModel) {
      this.confirmModel.close();
      this.hasOpenModal = false;
    }
  }

}

