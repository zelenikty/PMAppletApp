import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPadNumber]'
})
export class PadNumberDirective {
  @Input('appPadNumber') appPadNumber;
  constructor(private el: ElementRef) { }

  @HostListener('blur') onblur() {
    if (this.appPadNumber) {

      const value = this.el.nativeElement.value;

      if (value && value.length > 0) {
        this.el.nativeElement.value = this.pad(value, this.appPadNumber);
      }
    }
  }

  /**
   * Adding leading zeross
   * @param {*} n
   * @param {*} width
   * @param {*} [z]
   * @returns
   * @memberof PadNumberDirective
   */
  pad(n, width, z?) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
