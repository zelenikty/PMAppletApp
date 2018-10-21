import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { constType, tabTypIds } from '../../app-configs/configs';
import { AppMessages } from '../../models/app-messages';
import { CommonService } from '../../services/common.service';
import { SpotUnallocatedService } from '../../services/spot-unallocated.service';

@Component({
  selector: 'app-contract-data',
  templateUrl: './contract-data.component.html',
  styleUrls: ['./contract-data.component.scss']
})
export class ContractDataComponent implements OnInit, OnDestroy {
  @Output() buyOrSell = new EventEmitter();
  @Input() isReadOnly = true;
  _lookupData: any;
  @Input()
  set lookupData(value) {
    this.setupLookupData(value);
  }
  get lookupData() {
    return this._lookupData;
  }

  _buyOrSellType: any;
  @Input()
  set buyOrSellType(value) {
    this._buyOrSellType = value;
    if (value === '') {
      this.resetBuyOrSell();
    }
  }
  get buyOrSellType() {
    return this._buyOrSellType;
  }

  @Output() contractTabFormSubmit = new EventEmitter();
  @Input() activeTab: any;

  isBuy = false;
  buyOrSellTitle = '?';
  className = '';
  buy = constType.buy;
  sell = constType.sell;
  codes = [];
  currencyTypes = [];
  quantities = [];
  datePipe = new DatePipe('en-US');
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  isSubmitted = false;
  warnings: string[] = [];

  contractDataSubscription: Subscription;
  checkSubscription: Subscription;
  saveSubscription: Subscription;
  resetSubscription: Subscription;

  contractFrom = this.fb.group({
    orderCode: ['', Validators.required],
    orderDes: [''],
    quantity: [''],
    currencyCode: ['', Validators.required],
    rate: [''],
    date: [this.today],
    price: ['', Validators.required],
    priceQuantity: [null],
    debitAccount: ['', [Validators.required, Validators.maxLength(19)]],
    creditAccount: ['', [Validators.required, Validators.maxLength(19)]],
    debitOrderDes: [''],
    creditOrderDes: ['']
  });

  get formControls(): any {
    return this.contractFrom.controls;
  }

  /**
   * Listening to keyboard key up events
   * @param {*} event
   * @memberof ContractDataComponent
   */
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    if (event.code === 'F9') {
      this.onBuyOrSell();
    }
  }

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private spotUnallocatedService: SpotUnallocatedService,
    private elRef: ElementRef) { }

  ngOnInit() {
    this.listeningToEvents();
  }

  ngOnDestroy() {
    this.contractDataSubscription.unsubscribe();
    this.checkSubscription.unsubscribe();
    this.saveSubscription.unsubscribe();
    this.resetSubscription.unsubscribe();
  }

  /**
   * Changing title and publish Buy/Sell click event
   * @memberof ContractDataComponent
   */
  onBuyOrSell() {
    this.isBuy = !this.isBuy;
    this.buyOrSellType = this.isBuy ? this.buy : this.sell;
    this.buyOrSellTitle = this.isBuy ? 'Buy Metal' : 'Sell Metal';
    this.className = this.isBuy ? 'buy-background' : 'sell-background';

    this.buyOrSell.emit(this.buyOrSellType);
  }

  /**
   * Submit captureForm
   * @memberof ContractDataComponent
   */
  onSubmit() {
    if (this.activeTab === tabTypIds.contractData) {
      this.isSubmitted = true;
      const elements = this.elRef.nativeElement.querySelectorAll('.ng-invalid.error-focus');

      const message: AppMessages = {
        form: this.contractFrom,
        warnings: this.warnings,
        elements: Array.from(elements)
      };

      this.contractTabFormSubmit.emit(message);
    }
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
   * @memberof ContractDataComponent
   */
  onInputAdd(type, value) {
    switch (type) {
      case 'orderCode':
        this.contractFrom.patchValue({
          orderCode: value || ''
        });
        break;
      case 'currencyCode':
        this.contractFrom.patchValue({
          currencyCode: value || ''
        });
        break;
    }

    this.onBlurInput();
  }

  /**
 * Set selected date to form controller "date"
 * @param {*} value
 * @memberof ContractDataComponent
 */
  changeDateTime(value) {
    this.contractFrom.patchValue({
      date: value
    });
  }

  private setupLookupData(value) {
    this._lookupData = value;
    if (this._lookupData) {
      this.codes = this.lookupData.codes || [];
      this.currencyTypes = this.lookupData.currencyTypes || [];
      this.quantities = this.lookupData.quantities ? this.lookupData.quantities.map(q => q.value) : [];
    }
  }

  /**
   * Reset BuyOrSell related values to initial state
   * @private
   * @memberof ContractDataComponent
   */
  private resetBuyOrSell() {
    this.buyOrSellTitle = '?';
    this.className = '';
    this.isBuy = false;
  }

  /**
   * Listening to subscribe events
   * @private
   * @memberof ContractDataComponent
   */
  private listeningToEvents() {
    // Listening to CapturePanel data change
    this.contractDataSubscription = this.spotUnallocatedService.contactData.subscribe((res) => {
      this.setupCaptureData(res);
    });

    // Listening to Check event
    this.checkSubscription = this.commonService.check.subscribe((res) => {
      this.onSubmit();
    });

    // Listening to Save event
    this.saveSubscription = this.commonService.save.subscribe((res) => {
      this.onSubmit();
    });

    // Listening to Reset event
    this.resetSubscription = this.commonService.reset.subscribe((res) => {
      this.resetForm();
    });

  }

  private setupCaptureData(data) {
    if (data) {
      this.contractFrom.patchValue({
        orderCode: data.orderCode || '',
        orderDes: data.orderDes || '',
        quantity: data.quantity || '',
        currencyCode: data.currencyCode || '',
        rate: data.rate || '',
        date: data.date || this.today,
        price: data.price || '',
        debitAccount: data.debitAccount || '',
        creditAccount: data.creditAccount || '',
        debitOrderDes: data.debitOrderDes || '',
        creditOrderDes: data.creditOrderDes || ''
      });
    } else {
      this.resetForm();
    }
  }

  /**
   * Reset captureForm and values
   * @private
   * @memberof CapturePanelComponent
   */
  private resetForm() {
    this.isSubmitted = false;
    this.contractFrom.reset();

  }

}
