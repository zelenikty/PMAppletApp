import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ValidationErrorsWarnings } from '../../models/validationErrorsWarnings';
import { AppError } from '../../models/appError';

/** This is the bottom message bar */
@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent implements OnInit {
  validationErrorsWarnings: ValidationErrorsWarnings;
  error: any;
  serverError: any;
  warning: any;
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.commonService.validationErrors.subscribe((res: ValidationErrorsWarnings) => {
      this.validationErrorsWarnings = res;
      this.error = res.errors[0];
      this.warning = res.warnings[0];
      const element = res.elements[0];
      if (element) {
        element.focus();
      }
    });

    this.commonService.errorHandling.subscribe((res: AppError) => {
      this.serverError = res ? {
        message: res.message
      } : null;
    });
  }

}
