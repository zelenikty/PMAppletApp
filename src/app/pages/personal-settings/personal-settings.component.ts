import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.scss']
})
export class PersonalSettingsComponent {

  options: any[] = [10, 20, 30, 40];
  key: any;
  noOfRowDisplayed: any;
  settingsForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder) {

    this.settingsForm = this.fb.group({
      hostPrinter: [null],
      maxNumofRows: [null],
      Type1: [null],
      Type2: [null],
      Type3: [null],
      Type4: [null],
      AllDefaultTask: [null],
      soptAccordingToFCurrency: [null],
      soptAccordingToLastEntry: [null],
      isShowAbbreviation: [null],
      noOfRowDisplayed: [null]
    });
  }

  /** Save persoanl Data */
  save() {
    console.log(this.settingsForm.value);
    SpinnerService.showPreLoader();
    setTimeout(() => {
      SpinnerService.hidePreLoader();

    }, 1000);
  }

  /**Reset form */
  reset() {
    this.noOfRowDisplayed = -1;
    this.settingsForm.patchValue(
      {
        noOfRowDisplayed: null
      }
    );
    this.settingsForm.reset();
  }

  /**back to menu */
  back() {
    this.router.navigate(['/main-menu']);

  }

  /***
   * Shortcut key functions
   */
  @HostListener('document:keydown', ['$event'])
  keyPressHandle(event: KeyboardEvent) {
    this.key = event.key;
    switch (this.key) {

      case 'F3':
        event.preventDefault();
        this.save();
        break;
      case 'F5':
        event.preventDefault();
        event.stopPropagation();
        this.reset();
        break;
      case 'F12':
        event.preventDefault();
        this.back();
        break;

    }
  }

}
