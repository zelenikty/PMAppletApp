import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { constType, tabType, pageType, enteredResultType, tabTypIds } from '../../app-configs/configs';
import { SpotUnallocatedService } from '../../services/spot-unallocated.service';
import { CommonService } from '../../services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppMessages } from '../../models/app-messages';

@Component({
  selector: 'app-capture-panel',
  templateUrl: './capture-panel.component.html',
  styleUrls: ['./capture-panel.component.scss']
})
export class CapturePanelComponent implements OnInit, OnDestroy {
  @Input() isReadOnly = true;

  _buyOrSellType = '';
  @Input()
  set buyOrSellType(value) {
    this.setupBuyOrSellType(value);
  }
  get buyOrSellType() {
    return this._buyOrSellType;
  }

  _lookupData: any;
  @Input()
  set lookupData(value) {
    this.setupLookupData(value);
  }
  get lookupData() {
    return this._lookupData;
  }

  @Output() capturePanelFormSubmit = new EventEmitter();
  @Input() pageTypeName = '';

  @Input() validationErrors = [];
  @Input() validationWarnings = [];
  @Input() serverError: any;
  @Input() enteredResult: any;
  @Input() activeTab: any;

  pageTypes = pageType;
  enteredResultTypes = enteredResultType;
  pageTitle = 'Spot Unallocated';
  buy = constType.buy;
  sell = constType.sell;

  deskOptions = [];
  traders = [];
  dealTypes = [];
  tabType = tabType;
  tabTypeIds = tabTypIds;
  captureData;
  isSubmitted = false;
  datePipe = new DatePipe('en-US');
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  warnings: string[] = [];

  checkSubscription: Subscription;
  saveSubscription: Subscription;
  resetSubscription: Subscription;

  get formControls() {
    return this.captureForm.controls;
  }

  captureForm = this.fb.group({
    contractNo: '',
    dealType: [null],
    cpId: ['', [Validators.required, Validators.maxLength(14)]],
    cpBU1: ['', Validators.maxLength(4)],
    cpBU2: ['', Validators.maxLength(2)],
    cpDes: [''],
    fibkcd: [''],
    bookId: [''],
    tradeId: [''],
    tradeId2: [''],
    flOld: [''],
    tradeCode: [''],
    tradeDate: [this.today],
    desk: [null],
    client: ['']
  });

  constructor(private spotUnallocatedService: SpotUnallocatedService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private elRef: ElementRef) {
    this.initCaptureData();
  }

  ngOnInit() {
    this.listeningToEvents();
  }

  ngOnDestroy() {
    this.checkSubscription.unsubscribe();
    this.saveSubscription.unsubscribe();
    this.resetSubscription.unsubscribe();
  }

  /**
   * Submit captureForm
   * @memberof CapturePanelComponent
   */
  onSubmit() {
    this.isSubmitted = true;
    const elements = this.elRef.nativeElement.querySelectorAll('.ng-invalid.error-focus');
    const message: AppMessages = {
      form: this.captureForm,
      warnings: this.warnings,
      elements: Array.from(elements)
    };

    this.capturePanelFormSubmit.emit(message);

  }

  onBlurInput() {
    if (this.isSubmitted) {
      this.commonService.resetValidationErrorsAndWarnings();
      this.commonService.setCheck({});
    }
  }

  /**
   * Listening to app-input-popup element input add event
   * @param {*} type
   * @param {*} value
   * @memberof CapturePanelComponent
   */
  onInputAdd(type, value) {
    switch (type) {
      case 'bookId':
        this.captureForm.patchValue({
          bookId: value || ''
        });
        break;
      case 'tradeId2':
        this.captureForm.patchValue({
          tradeId2: value || ''
        });
        break;
    }
  }

  /**
   * Listening to app-input-popup element key change event of Fl Old
   * @param {*} value
   * @memberof CapturePanelComponent
   */
  onFlOldChange(value) {
    this.captureData.flOld = value;
    this.captureForm.patchValue({
      flOld: value
    });
  }

  /**
   * Set selected date to form controller "date"
   * @param {*} value
   * @memberof CapturePanelComponent
   */
  changeDateTime(value) {
    this.captureData.tradeDate = value;
    this.captureForm.patchValue({
      tradeDate: value
    });
  }

  /**
   * Setup title of the page
   * @private
   * @param {*} value
   * @memberof CapturePanelComponent
   */
  private setupBuyOrSellType(value) {
    this._buyOrSellType = value || '';
    switch (value) {
      case constType.buy:
        this.pageTitle = 'Buy Spot Unallocated';
        break;
      case constType.sell:
        this.pageTitle = 'Sell Spot Unallocated';
        break;
      default:
        this.pageTitle = this.captureData.tabType === this.tabType.repetition ? 'Buy Deposit' : 'Spot Unallocated';
    }
  }

  private setupLookupData(value) {
    this._lookupData = value;
    this.traders = this.lookupData ? this.lookupData.tradersTypes : [];
    this.deskOptions = this.lookupData ? this.lookupData.desksTypes.map(d => d.value) : [];
    this.dealTypes = this.lookupData ? this.lookupData.dealType.map(d => d.value) : [];
  }

  /**
   * Listening to subscribe events
   * @private
   * @memberof CapturePanelComponent
   */
  private listeningToEvents() {

    // Listening to Check event
    this.checkSubscription = this.commonService.check.subscribe((res) => {
      this.onSubmit();
    });

    // Listening to Save event
    this.saveSubscription = this.commonService.save.subscribe((res) => {
      this.onSubmit();
    });

    // Listening to Reset event
    this.resetSubscription = this.commonService.resetCapturePanelData.subscribe(() => {
      this.resetForm();
    });

  }

  private initCaptureData() {
    this.captureData = {
      dealType: 'Select',
      contractNo: '',
      cpId: '',
      cpBU1: '',
      cpBU2: '',
      cpDes: '',
      fibkcd: '',
      bookId: '',
      tradeId: '',
      flOld: '',
      tradeCode: '',
      tradeDate: this.today,
      desk: 'Select',
      confirmTo: '',
      confirmDes: '',
      paymentType: '',
      tabType: '',
      validation: null,
      client: ''
    };
  }

  /**
   * Reset captureForm and values
   * @private
   * @memberof CapturePanelComponent
   */
  private resetForm() {
    this.isSubmitted = false;
    this.resetCaptureValues();
    this.captureForm.reset();

  }

  /**
   * Reset data of captureData object
   * @memberof CapturePanelComponent
   */
  resetCaptureValues() {
    this.captureData.dealType = 'Select';
    this.captureData.contractNo = '';
    this.captureData.cpId = '';
    this.captureData.cpBU1 = '';
    this.captureData.cpBU2 = '';
    this.captureData.cpDes = '';
    this.captureData.fibkcd = '';
    this.captureData.bookId = '';
    this.captureData.tradeId = '';
    this.captureData.flOld = '';
    this.captureData.tradeCode = '';
    this.captureData.tradeDate = this.today;
    this.captureData.desk = 'Select';
    this.captureData.confirmTo = '';
    this.captureData.confirmDes = '';
    this.captureData.paymentType = '';
    this.captureData.tabType = '';
    this.captureData.validation = null;

    this.commonService.setResetInputPopuData('');
  }
}
