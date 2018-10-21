import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SearchDealsService } from 'src/app/services/search-deals.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-search-deals',
  templateUrl: './search-deals.component.html',
  styleUrls: ['./search-deals.component.scss']
})
export class SearchDealsComponent implements OnInit {
  brandNames: any[] = [];
  types: any[] = [];
  status: any[] = [];
  statusDetails: any[] = [];
  giftTypes: any[] = [];
  orderTypes: any[] = [];
  selections: any[] = [];
  waiveredStatus: any[] = [];
  priceTypes: any[] = [];
  isReadOnly: false;

  searchForm: FormGroup;
  key: string;

  businessUnit = 'Select';
  currencyTypes: any;
  productTypes: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchDealsService: SearchDealsService
  ) { }

  ngOnInit() {
    SpinnerService.showPreLoader();
    // Load all dropdown data
    this.searchDealsService.getSearchDealsData().subscribe(
      res => {
        SpinnerService.hidePreLoader();
        this.brandNames = res.brandNames.map(l => l.value);
        this.types = res.types.map(l => l.value);
        this.status = res.status.map(l => l.value);
        this.statusDetails = res.statusDetails.map(l => l.value);
        this.waiveredStatus = res.waiveredStatus.map(l => l.value);
        this.currencyTypes = res.currencyTypes;
        this.productTypes = res.productTypes;
        this.priceTypes = res.priceTypes;
        this.giftTypes = res.giftTypes;
        this.orderTypes = res.orderTypes;
        this.selections = res.selections;
      }
    );

    this.searchForm = this.fb.group({
      maxNumberofContract: [null],
      businessUnit: [null],
      businessUnitName: [{ value: null, disabled: true }],
      branchCode: [null],
      branchName: [{ value: null, disabled: true }],
      containsUserId: [null],
      traderDetails: [{ value: null, disabled: true }],
      cifNo: [null],
      counterpartyDetails: [{ value: null, disabled: true }],
      waivered: [null],
      status: [null],
      statusDetail: [null],
      contractNumber: [null],
      containsFrontIdFrom: [null],
      containsFrontIdTo: [null],
      containsStartFrom: [null],
      containsStartTo: [null],
      containsEndFrom: [null],
      containsEndTo: [null],
      containsDurationStart: [null],
      containsDurationTo: [null],
      containsVerificationFrom: [null],
      containsVerificationTo: [null],
      productTypeAmountFrom: [null],
      productTypeAmountTo: [null],
      currencyAmountFrom: [null],
      currencyAmountTo: [null],
      productType: [{ value: null, disabled: true }],
      productTypeId: [null],
      currency: [{ value: null, disabled: true }],
      currencyId: [null],
      brandName: [null],
      giftType1: [null],
      giftType2: [null],
      giftType3: [null],
      giftType4: [null],
      isShowAllDetails: [null],
      order1: [null],
      order2: [null],
      order3: [null],
      order4: [null],
      order5: [null],
      order6: [null],
      order7: [null],
      order8: [null],
      selection1: [null],
      selection2: [null],
      selection3: [null],
      selection4: [null],
    });

  }

  /*** Search button click or F3 Click will search the result */
  searchDeals() {
    console.log(this.searchForm.value);
    const request = {
      'limitAnswer': {
        'maxToReturn': this.searchForm.value.maxToReturn,
        'returnAll': this.searchForm.value.isShowAllDetails
      },
      'dealDetails': {
        'metalType': this.searchForm.value.metalType,
        'currency': this.searchForm.value.currency,
        'status': this.searchForm.value.status,
        'statusDetail': this.searchForm.value.statusDetail,
        'valueDate': {
          'from': this.searchForm.value.containsDurationStart,
          'to': this.searchForm.value.containsDurationTo
        },
        'openIssues': {
          'contractsToBeControlled': true,
          'contractsWithPreventions': false,
          'contractsWithIFOcase': false,
          'contractsWithTechnicalErrors': true
        }
      },
      'header': {
        'traceLevel': 0,
        'userLangCd': this.searchForm.value.contractNumber,
        'filler01': ' ',
        'clientId': this.searchForm.value.contractNumber,
      }
    };
    console.log(request);

    this.router.navigate(['/search-deals/deal-list']);
  }

  /*** Reset form */
  resetForm() {
    this.businessUnit = 'Select';
    this.searchForm.reset();
  }

  goBackTomainMenu() {
    this.router.navigate(['/main-menu']);

  }

  selectProductType(event) {
    this.searchForm.patchValue({
      productType: event.name
    });
  }

  selectCurrency(event) {
    this.searchForm.patchValue({
      currency: event.name
    });
  }

  selectPriceType(event) {
    this.searchForm.patchValue({
      traderDetails: event.name
    });
  }

  /***
   * Shortcut key functions
   */
  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key.toUpperCase()) {
      case 'E':
        event.preventDefault();
        this.searchDeals();
        break;
      case 'F3':
        event.preventDefault();
        this.searchDeals();
        break;
      case 'F5':
        event.preventDefault();
        event.stopPropagation();
        this.resetForm();
        break;
      case 'F12':
        event.preventDefault();
        this.goBackTomainMenu();
        break;

    }
  }



}
