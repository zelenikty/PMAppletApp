import { Directive, Input, OnInit, OnChanges, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormatDate]'
})
export class FormatDateDirective implements OnInit, OnChanges {

  @Input('appFormatDate') appFormatDate;
  constructor(private el: ElementRef) { }


  ngOnInit() {
    this.setupInitDateFormat();
  }

  /**
   * Change Date format while fire onchange event
   * @memberof FormatDateDirective
   */
  ngOnChanges() {
    setTimeout(() => {
      const value = this.el.nativeElement.value;
      if (value && value !== '') {
        const dArr = value.split('/');
        if (dArr && dArr.length === 3) {
          const newDate = `${dArr[1]}.${dArr[0]}.${dArr[2]}`;
          this.el.nativeElement.value = newDate;
        }

      } else {
        this.el.nativeElement.value = 'Select';
      }
    }, 1);

  }

  /**
   * Change initial Date format
   * @private
   * @memberof FormatDateDirective
   */
  private setupInitDateFormat() {
    setTimeout(() => {
      if (this.appFormatDate) {
        const dArr = this.appFormatDate.split('-');
        if (dArr.length === 3) {
          const newDate = `${dArr[1]}.${dArr[2]}.${dArr[0]}`;
          this.el.nativeElement.value = newDate;
        }
      } else {
        this.el.nativeElement.value = 'Select';
      }

    }, 1);
  }

}
