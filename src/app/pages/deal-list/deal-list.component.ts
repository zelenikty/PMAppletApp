import { Component, OnInit, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { DealListService } from '../../services/deal-list.service';
import { NgbModal, NgbModalRef, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from '../../services/spinner.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import * as JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as $ from 'jquery';

@Component({
  selector: 'app-deal-list',
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent implements OnInit {

  @ViewChild('tblDealList') tblDealList: ElementRef;
  @ViewChild('content') content: ElementRef;
  tblWidth: any;
  tblWidthInitial: any;
  dealList: any;
  activeCode: any;
  key: string;
  selectItem: any;
  modal: any;
  confirmModel: NgbModalRef;
  isDeleteConf: boolean;
  start: any;
  pressed: boolean;
  startWidth: any;
  startX: any;
  parent: ElementRef;
  hasOpenModal: boolean;
  isToBeDone: boolean;
  confirmMsg: string;
  columnNames: any[] = [];

  constructor(
    private dealListService: DealListService,
    private modalService: NgbModal,
    private excelService: ExcelService,
    private router: Router,
    public renderer: Renderer2,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    SpinnerService.showPreLoader();
    this.tblWidthInitial = this.tblDealList.nativeElement.offsetWidth;
    this.dealListService.getDealListData().subscribe(res => {
      this.dealList = res;
      this.activeCode = 0;
      this.selectItem = res[0];
      this.modal = this.content;
      for (const key in this.selectItem) {

        if (this.selectItem.hasOwnProperty(key)) {
          if ((key !== 'id')) {
            if ((key !== 'isModified')) {
              this.columnNames.push(key);
            }
          }
        }
      }
      setTimeout(() => {
        SpinnerService.hidePreLoader();
      }, 2000);
    });
    this.hasOpenModal = false;
  }

  /** Sort table rows */
  onSorted(event) {
    if (event.sortDirection === 'asc') {
      this.dealList = this.dealList.sort(
        (a, b) => (a[event.sortColumn] > b[event.sortColumn]) ? 1 : ((b[event.sortColumn] > a[event.sortColumn]) ? -1 : 0));
    } else {
      this.dealList = this.dealList.sort(
        (a, b) => (a[event.sortColumn] < b[event.sortColumn]) ? 1 : ((b[event.sortColumn] < a[event.sortColumn]) ? -1 : 0));
    }
  }

  /**
   * set table width when scrolling
   */
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {
    this.tblWidth = this.tblWidthInitial + event.target.scrollLeft;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.tblWidthInitial = this.tblDealList.nativeElement.offsetWidth;
    this.tblWidth = this.tblWidthInitial;

    const myDiv = document.getElementById('dataTable');
    myDiv.scrollTop = 0;
    myDiv.scrollLeft = 0;

  }

  /**
   * Select Deal item
   */
  selectDealItem(content, item, i) {
    this.activeCode = i;
    this.selectItem = item;
    this.modal = content;
  }

  goBackToSearchPage() {
    this.router.navigate(['/search-deals']);

  }

  refreshTableData() {
    SpinnerService.showPreLoader();
    this.dealListService.getDealListData().subscribe(res => {
      this.dealList = res;
      this.tblWidthInitial = this.tblDealList.nativeElement.offsetWidth;
      this.tblWidth = this.tblWidthInitial;

      const myDiv = document.getElementById('dataTable');
      myDiv.scrollTop = 0;
      myDiv.scrollLeft = 0;
      const width = 100;
      if (this.parent) {
        this.renderer.setStyle(this.parent, 'min-width', width + 'px', 1);
        this.renderer.setStyle(this.parent, 'max-width', width + 'px', 1);
        const index = $(this.parent).index() + 1;
        $('#dataTable tr td:nth-child(' + index + ')').css({ 'min-width': width, 'max-width': width });
      }

      setTimeout(() => {
        SpinnerService.hidePreLoader();
      }, 2000);

    });
  }

  /*** Show button click or S press*/
  show() {
    this.router.navigate(['/display']);
  }
  /***  Verify button click or S press */
  verify() {
    if (this.modal && !this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isToBeDone = true;
      this.confirmMsg = 'To be done in integration ';
      this.confirmModel = this.modalService.open(this.modal, { centered: true });
    }
  }
  /***  Delete button click or S press*/
  delete() {
    if (this.modal && !this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isDeleteConf = true;
      this.confirmMsg = 'Are you sure that you want to delete this order?';
      this.confirmModel = this.modalService.open(this.modal, { centered: true });
    }

  }
  /***  Cancel button click or S press*/
  cancel() {
    if (this.modal && !this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isDeleteConf = false;
      this.confirmMsg = 'Are you sure that you want to cancel this order?';
      this.confirmModel = this.modalService.open(this.modal, { centered: true });
    }
  }
  /***  Modify button click or S press*/
  modify() {
    this.router.navigate(['/display']);

  }
  /***  Repeat button click or S press*/
  repeat() {
    if (this.modal && !this.hasOpenModal) {
      this.hasOpenModal = true;
      this.isToBeDone = true;
      this.confirmMsg = 'To be done in integration ';
      this.confirmModel = this.modalService.open(this.modal, { centered: true });
    }

  }

  /** Export data to Excel */
  exportToExcel() {
    this.excelService.exportAsExcelFile(this.dealList, 'deallist');
  }
  /** Print to PDF */
  printPfd() {
    SpinnerService.showPreLoader();
    html2canvas(document.getElementById('dataTable')).then(function (canvas) {
      const img = canvas.toDataURL('image/png');
      const doc = new JsPDF();
      doc.addImage(img, 'JPEG', 5, 20);
      doc.save('deallist' + '_export_' + new Date().getTime() + '.pdf');
      SpinnerService.hidePreLoader();

    });
  }

  /***
   * Shortcut key functions
   */
  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    this.key = event.key;
    event.preventDefault();
    switch (this.key.toUpperCase()) {
      case 'S':
        this.show();
        break;
      case 'V':
        this.verify();
        break;
      case 'D':
        this.delete();
        break;
      case 'C':
        this.cancel();
        break;
      case 'M':
        this.modify();
        break;
      case 'R':
        this.repeat();
        break;
      case 'Y':
        this.deleteConfirm();
        break;
      case 'N':
        this.deleteCancel();
        break;
      case 'F5':
        event.stopPropagation();
        this.refreshTableData();
        break;
      case 'F2':
        this.exportToExcel();
        break;
      case 'F11':
        this.printPfd();
        break;
      case 'F12':
        this.goBackToSearchPage();
        break;

    }
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

  /** Re sizer mouse down */

  onMouseDown(event) {
    this.parent = this.renderer.parentNode(event.target);
    this.pressed = true;
    this.startX = event.x;
    this.startWidth = event.target.parentNode.clientWidth;
    this.initResizableColumns();
  }

  private initResizableColumns() {
    this.renderer.listen('body', 'mousemove', (event) => {
      if (this.pressed) {
        const width = this.startWidth + (event.x - this.startX);
        this.renderer.setStyle(this.parent, 'min-width', width + 'px', 1);
        this.renderer.setStyle(this.parent, 'max-width', width + 'px', 1);
        const index = $(this.parent).index() + 1;
        $('#dataTable tr td:nth-child(' + index + ')').css({ 'min-width': width, 'max-width': width });
      }
    });
    this.renderer.listen('body', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
      }
    });
  }



}
