import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { AppMessages } from '../../models/app-messages';
import { tabTypIds } from '../../app-configs/configs';

@Component({
  selector: 'app-payment-delivery',
  templateUrl: './payment-delivery.component.html',
  styleUrls: ['./payment-delivery.component.scss']
})
export class PaymentDeliveryComponent implements OnInit, OnDestroy {
  @Input() isReadOnly = true;
  @Output() paymentDeliveryFormSubmit = new EventEmitter();
  @Input() activeTab: any;

  isSubmitted = false;
  warnings: string[] = [];

  checkSubscription: Subscription;
  saveSubscription: Subscription;
  resetSubscription: Subscription;

  paymentDeliveryFrom = this.fb.group({
    payDebitMetal: [''],
    payDebitAccount: ['', [Validators.required, Validators.maxLength(19)]],
    payCreditCurrency: ['', Validators.maxLength(4)],
    payCreditAccount: ['', [Validators.required, Validators.maxLength(19)]],
    paySettleViaBank: ['', Validators.maxLength(19)],
    paySettleAccount: ['', Validators.maxLength(19)],
    paySettleBenificiary: ['', Validators.maxLength(19)],
    accBankDescript: [''],
    viaBankDescript: [''],
    benificiaryDescript: ['']
  });

  get formControls(): any {
    return this.paymentDeliveryFrom.controls;
  }

  constructor(private fb: FormBuilder,
    private commonService: CommonService,
    private elRef: ElementRef) { }

  ngOnInit() {
    this.listeningToEvents();
  }

  ngOnDestroy() {
    this.checkSubscription.unsubscribe();
    this.saveSubscription.unsubscribe();
    this.resetSubscription.unsubscribe();
  }

  /**
   * Submit paymentDeliveryFrom
   * @memberof PaymentDeliveryComponent
   */
  onSubmit() {
    if (this.activeTab === tabTypIds.paymentDelivery) {
      this.isSubmitted = true;
      const elements = this.elRef.nativeElement.querySelectorAll('.ng-invalid.error-focus');
      const message: AppMessages = {
        form: this.paymentDeliveryFrom,
        warnings: this.warnings,
        elements: Array.from(elements)
      };

      this.paymentDeliveryFormSubmit.emit(message);
    }
  }

  onBlurInput() {
    if (this.isSubmitted) {
      this.commonService.resetValidationErrorsAndWarnings();
      this.commonService.setCheck({});
    }
  }

  /**
   * Listening to subscribe events
   * @private
   * @memberof PaymentDeliveryComponent
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
    this.resetSubscription = this.commonService.reset.subscribe((res) => {
      this.resetForm();
    });

  }

  /**
   * Reset captureForm and values
   * @private
   * @memberof PaymentDeliveryComponent
   */
  private resetForm() {
    this.isSubmitted = false;
    this.paymentDeliveryFrom.reset();

  }

}
