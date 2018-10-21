import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { constType, tabType, actionStateType, pageType, enteredResultType, tabTypIds } from '../../app-configs/configs';
import { CommonService } from '../../services/common.service';
import { SpotUnallocatedService } from '../../services/spot-unallocated.service';
import { SpinnerService } from '../../services/spinner.service';
import { AppMessages } from '../../models/app-messages';
import { ValidationErrorsWarnings } from '../../models/validationErrorsWarnings';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AppError } from '../../models/appError';
import * as JsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * This component is handling functionalities of Spot Unallocated page
 * @export
 * @class SpotUnallocatedComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-spot-unallocated',
  templateUrl: './spot-unallocated.component.html',
  styleUrls: ['./spot-unallocated.component.scss']
})
export class SpotUnallocatedComponent implements OnInit, OnDestroy {
  isReadOnly = true;
  buyOrSellType = '';
  buy = constType.buy;
  sell = constType.sell;
  lookupData: any;
  outputControlData: any;
  referencesData: any;
  technicalInfosData: any;
  repetitionData: any;
  contractData: any;


  validationErrors = [];
  validationWarnings = [];
  validationElements = [];
  serverError: any;
  capturePanelForm: FormGroup;
  contractForm: FormGroup;
  paymentDeliveryForm: FormGroup;

  actionFireCount = 0;
  actionFireThreshHoldValue = 2; // number of form count effect to save data of spot-unallocated page at once
  currentState = '';

  datePipe = new DatePipe('en-US');
  today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  defaultCaptureData = {
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
  activeTab: any;
  activeTabId = 1;
  enteredResult: any;
  pageTypeName = '';
  pageTypes = pageType;

  resetValidationErrorsAndWarningSubscription: Subscription;

  /**
   * Listening to keyboard key up events
   * @param {*} event
   * @memberof SpotUnallocatedComponent
   */
  @HostListener('window:keydown', ['$event'])
  onKeyUp(event) {
    this.setupKeyPressEvents(event);
  }

  /**
   *Creates an instance of SpotUnallocatedComponent.
   * @param {SpotUnallocatedService} spotUnallocatedService
   * @param {CommonService} commonService
   * @memberof SpotUnallocatedComponent
   */
  constructor(
    private spotUnallocatedService: SpotUnallocatedService,
    private commonService: CommonService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.setPageType();
    this.loadData();
    this.listeningToEvents();
  }

  ngOnDestroy() {
    this.resetValidationErrorsAndWarningSubscription.unsubscribe();
  }

  /**
   * Listening to Buy and Sell toggle event
   * @param {string} type
   * @memberof SpotUnallocatedComponent
   */
  onBuyOrSell(type: string) {
    this.buyOrSellType = type;
    this.isReadOnly = false;
  }

  /**
   * Check form inputs
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  onCheck() {
    this.currentState = actionStateType.check;
    this.enteredResult = null;
    this.actionFireCount = 0;
    if (this.isReadOnly) {
      return;
    }
    this.resetValidationErrorsAndWarnings();
    this.commonService.setCheck({});
  }

  /**
   * Save form inputs
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  onSave() {
    this.currentState = actionStateType.save;
    this.actionFireCount = 0;
    if (this.isReadOnly) {
      return;
    }
    this.resetValidationErrorsAndWarnings();
    this.commonService.setSave({});
  }

  /**
   * Reset form inputs
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  onReset() {
    this.currentState = actionStateType.reset;
    this.enteredResult = null;
    this.actionFireCount = 0;
    if (this.isReadOnly) {
      return;
    }

    this.resetValidationErrorsAndWarnings();
    this.isReadOnly = this.activeTabId === tabTypIds.contractData;
    this.buyOrSellType = '';
    this.commonService.setReset({});
    this.commonService.resetCapturePanel();
  }

  /**
   * Go to Deal selaction
   * @memberof SpotUnallocatedComponent
   */
  onBack() {
    if (this.pageTypeName === this.pageTypes.display) {
      this.location.back();

    } else {
      this.goToDealSelection();
    }
  }

  /**
   * Listening to Capture Panel form submit
   * @param {*} form
   * @memberof SpotUnallocatedComponent
   */
  onCapturePanelFormSubmit(appMessage: AppMessages) {
    this.actionFireCount++;
    this.capturePanelForm = appMessage.form;
    this.filterInputErrors(appMessage);
  }

  /**
   * Listening to Contract tab form submit
   * @param {*} form
   * @memberof SpotUnallocatedComponent
   */
  onContractTabFormSubmit(appMessage: AppMessages) {
    this.actionFireCount++;
    this.contractForm = appMessage.form;
    this.filterInputErrors(appMessage);
  }

  /**
   * Listening to Payment Delivery tab form submit
   * @param {*} form
   * @memberof SpotUnallocatedComponent
   */
  onPaymentDeliveryFormSubmit(appMessage: AppMessages) {
    this.actionFireCount++;
    this.paymentDeliveryForm = appMessage.form;
    this.filterInputErrors(appMessage);
  }

  /** Print to PDF */
  printPfd() {
    SpinnerService.showPreLoader();
    html2canvas(document.getElementById('spot-unallocated')).then(function (canvas) {
      const img = canvas.toDataURL('image/png');
      const doc = new JsPDF();
      doc.addImage(img, 'JPEG', 10, 10, 190, 200);
      doc.save('spot_unallocated' + '_export_' + new Date().getTime() + '.pdf');
      SpinnerService.hidePreLoader();

    });
  }

  /**
   * Load data related to Spot Unallocated
   * @private
   * @memberof SpotUnallocatedComponent
   */
  private async loadData() {
    const lookupP = this.loadLookupData();
    const outputP = this.loadSpotUnallocatedCaptureData();
    SpinnerService.showPreLoader();
    await lookupP;
    await outputP;
    SpinnerService.hidePreLoader();
  }

  /**
   * Check cacheing data
   * @private
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  private isCacheDataExist() {
    let lookupCache: any = sessionStorage.getItem('lookupData');

    if (lookupCache) {
      lookupCache = JSON.parse(lookupCache);
      if (lookupCache.spotUnallocatedLookupData) {
        this.lookupData = lookupCache.spotUnallocatedLookupData;
        return true;
      }
    }

    return false;
  }

  /**
   * Check cacheing data
   * @private
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  private isSpotUnallocatedCaptureCacheDataExist() {
    let cacheData: any = sessionStorage.getItem('spotUnallocatedCaptureData');

    if (cacheData) {
      cacheData = JSON.parse(cacheData);
      if (cacheData) {
        this.setupSpotUnallocatedCaptureData(cacheData);
        return true;
      }
    }

    return false;
  }

  /**
   * Listening to tab change event
   * @param {*} event
   * @memberof SpotUnallocatedComponent
   */
  onTabSelect(event) {
    this.resetValidationErrorsAndWarnings();
    this.commonService.setReset({});

    setTimeout(() => {  // set small time out because uniderectional data flow  rule
      // this.buyOrSellType = '';
      this.enteredResult = null;
    }, 1);

    this.activeTab = event.filter(t => t.active)[0];
    this.activeTabId = this.activeTab.id || 0;

    switch (this.activeTab.id) {
      case tabTypIds.contractData: // Contract Data
        if (this.contractData) {
          this.spotUnallocatedService.setContactData(this.contractData);
          this.spotUnallocatedService.setCapturePanelData(this.contractData);
        } else {
          this.defaultCaptureData.tabType = tabType.contractData;
          this.setDefaultCapturePanelValues();
        }

        break;
      case tabTypIds.paymentDelivery: // Payment Delivery
        this.defaultCaptureData.tabType = tabType.paymentDelivery;
        this.setDefaultCapturePanelValues();
        break;
      case tabTypIds.text: // Text
        this.defaultCaptureData.tabType = tabType.text;
        this.setDefaultCapturePanelValues();
        break;
      case tabTypIds.outputControl: // Output Control
        this.outputControlData.tabType = tabType.outputControl;
        this.spotUnallocatedService.setOutPutControlData(this.outputControlData);
        this.spotUnallocatedService.setCapturePanelData(this.outputControlData);
        break;
      case tabTypIds.tax: // Tax
        this.defaultCaptureData.tabType = tabType.tax;
        this.setDefaultCapturePanelValues();
        break;
      case tabTypIds.references: // References
        this.referencesData.tabType = tabType.references;
        this.spotUnallocatedService.setCapturePanelData(this.referencesData);
        break;
      case tabTypIds.notes: // Notes
        this.defaultCaptureData.tabType = tabType.notes;
        this.setDefaultCapturePanelValues();
        break;
      case tabTypIds.techInfos: // Technical Infos
        this.technicalInfosData.tabType = tabType.technicalInfos;
        this.spotUnallocatedService.setCapturePanelData(this.technicalInfosData);
        break;
      case tabTypIds.repitition: // Repetition
        this.repetitionData.tabType = tabType.repetition;
        this.spotUnallocatedService.setCapturePanelData(this.repetitionData);
        break;
      case tabTypIds.prevention: // Prevention
        this.defaultCaptureData.tabType = tabType.prevention;
        this.setDefaultCapturePanelValues();
        break;
      default:
        this.spotUnallocatedService.setOutPutControlData(null);
        this.spotUnallocatedService.setCapturePanelData(null);
    }
  }

  private setDefaultCapturePanelValues() {
    this.spotUnallocatedService.setOutPutControlData(null);
    this.spotUnallocatedService.setCapturePanelData(this.defaultCaptureData);
  }

  /**
   * Loading lookup data
   * @private
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  private loadLookupData() {
    return new Promise((resolve, reject) => {
      if (this.isCacheDataExist()) {
        resolve();
        return;
      }

      this.spotUnallocatedService.getSpotUnallocatedData().subscribe((res) => {
        this.lookupData = res;
        const storeObj = {
          spotUnallocatedLookupData: res
        };
        sessionStorage.setItem('lookupData', JSON.stringify(storeObj));
        resolve();
      }, error => {
        this.handleErrorMessage(error);
        reject();
      });
    });
  }

  /**
   * Load Spot Unallocated Capture data
   * @private
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  private loadSpotUnallocatedCaptureData() {
    return new Promise((resolve, reject) => {

      if (this.isSpotUnallocatedCaptureCacheDataExist()) {
        resolve();
        return;
      }

      this.spotUnallocatedService.getSpotUnallocatedCaptureData().subscribe((res) => {
        sessionStorage.setItem('spotUnallocatedCaptureData', JSON.stringify(res));
        this.setupSpotUnallocatedCaptureData(res);
        resolve();
      }, error => {
        this.handleErrorMessage(error);
        reject();
      });
    });
  }

  private setupSpotUnallocatedCaptureData(res) {
    this.outputControlData = res.outputControl;
    this.referencesData = res.references;
    this.technicalInfosData = res.technicalInfos;
    this.repetitionData = res.repetition;
    this.contractData = this.pageTypeName === pageType.display ? res.display : null;

    if (this.pageTypeName === pageType.display) {
      this.spotUnallocatedService.setContactData(this.contractData);
      this.spotUnallocatedService.setCapturePanelData(this.contractData);
    }
  }

  /**
   * Listening to key press events
   * @private
   * @param {*} event
   * @memberof SpotUnallocatedComponent
   */
  private setupKeyPressEvents(event) {
    switch (event.code) {
      case 'F2':
        event.preventDefault();
        this.onCheck();
        break;
      case 'F3':
        event.preventDefault();
        this.onSave();
        break;
      case 'F5':
        event.preventDefault();
        event.stopPropagation();
        this.onReset();
        break;
      case 'F11':
        event.preventDefault();
        this.printPfd();
        break;
      case 'F12':
        event.preventDefault();
        this.onBack();
        break;
    }
  }

  /**
   * Redirect to Deal Type Selection page
   * @private
   * @memberof SpotUnallocatedComponent
   */
  private goToDealSelection() {
    this.router.navigate(['/deal-type-selection']);
  }

  /**
   * Handle error messages
   * @private
   * @param {*} error
   * @memberof SpotUnallocatedComponent
   */
  private handleErrorMessage(errorMsg) {
    const error: AppError = {
      message: errorMsg
    };
    this.serverError = error;
    this.commonService.setError(error);
  }

  /**
   * Handle success messages
   * @private
   * @memberof SpotUnallocatedComponent
   */
  private handleSuccessMessage(res) {

  }

  /**
   * Filter forms input validation errors
   * @private
   * @param {AppMessages} appMessage
   * @memberof SpotUnallocatedComponent
   */
  private filterInputErrors(appMessage: AppMessages) {
    this.setValidationErrorsAndWarnings(appMessage);
    const errorsWarnings: ValidationErrorsWarnings = {
      errors: this.validationErrors,
      warnings: this.validationWarnings,
      elements: this.validationElements
    };

    this.commonService.setValidationErrors(errorsWarnings);
    this.save();
  }

  /**
   * Setup validation errors and warnings
   * @private
   * @param {AppMessages} appMessage
   * @memberof SpotUnallocatedComponent
   */
  private setValidationErrorsAndWarnings(appMessage: AppMessages) {
    const form = appMessage.form;
    const warnings = appMessage.warnings;
    const elements = appMessage.elements;
    const cValues = Object.values(form.controls);
    const cKeys = Object.keys(form.controls);

    cValues.forEach((element, i) => {
      if (element.errors) {
        this.validationErrors.push({
          key: cKeys[i],
          error: element.errors
        });
      }
    });

    this.validationWarnings = this.validationWarnings.concat(warnings);
    this.validationElements = this.validationElements.concat(elements);
  }

  /**
   * Reset validation errors and warnings
   * @private
   * @memberof SpotUnallocatedComponent
   */
  private resetValidationErrorsAndWarnings() {
    this.validationErrors = [];
    this.validationWarnings = [];
    this.validationElements = [];

    const errorsWarnings: ValidationErrorsWarnings = {
      errors: this.validationErrors,
      warnings: this.validationWarnings,
      elements: this.validationElements
    };

    this.commonService.setValidationErrors(errorsWarnings);
    this.commonService.resetError();
    setTimeout(() => { // set small timeout to fix unidirectional data flow rule
      this.serverError = null;
    }, 1);
  }

  /**
   * Check forms validations before save
   * @private
   * @returns
   * @memberof SpotUnallocatedComponent
   */
  private checkFormsSaveValidation() {
    return this.currentState === actionStateType.save
      && this.validationErrors.length === 0
      && this.validationWarnings.length === 0
      && this.actionFireCount === this.actionFireThreshHoldValue;
  }

  /**
   * Save forms data
   * @private
   * @memberof SpotUnallocatedComponent
   */
  private save() {
    const self = this;
    this.commonService.resetError();
    if (this.checkFormsSaveValidation()) {
      this.enteredResult = null;
      const capturePanelFormValues = this.capturePanelForm ? this.capturePanelForm.value : {};
      const contractFormValues = this.contractForm ? this.contractForm.value : {};
      const paymentDeliveryFormValues = this.paymentDeliveryForm ? this.paymentDeliveryForm.value : {};
      const spotUnallocatedObj = { ...capturePanelFormValues, ...contractFormValues, ...paymentDeliveryFormValues };
      SpinnerService.showPreLoader();
      this.spotUnallocatedService.saveSpotUnallocatedData(spotUnallocatedObj).subscribe((res) => {
        SpinnerService.hidePreLoader();
        if (res) {
          this.enteredResult = {
            type: this.activeTab && this.activeTab.id === tabTypIds.references
              ? enteredResultType.cancel : enteredResultType.success, // This line is only for demo purpose please
            // replace with real implementation
            contractNo: '20834'
          };
          this.handleSuccessMessage(res);
        } else {
          self.handleErrorMessage('Data saving failed!');
        }

      });
    }
  }

  private setPageType() {
    const rUrl = this.router.url;
    switch (rUrl) {
      case '/display':
        this.pageTypeName = pageType.display;
        break;
      default:
        this.pageTypeName = '';
    }
  }

  private listeningToEvents() {
    this.resetValidationErrorsAndWarningSubscription = this.commonService.resetValidationErrorsAndWarningsData.subscribe(() => {
      this.resetValidationErrorsAndWarnings();
    });
  }
}
