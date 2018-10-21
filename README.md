# PMAppletApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

This will not run. I did not delete test related files for the help of futher develpment
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


# Angular App
-------------------------------------------------------------------------------------
Running as seperate app 
  http://localhost:4200/

  1) Navigate to "PMAppletApp" folder
  2) *Run* npm install
  3) *Run* ng serve
  4) App will be up at http://localhost:4200/

  Make sure to run the server app also
  
# Configuration
 `apiUrl` has configuredunder `\src\environments\environment.ts`

# Used Libraries
-------------------------------------------------------------------------------------
  1) @ng-bootstrap
  2) ngx-contextmenu
  3) ngx-mask
  4) ng-pick-datetime
  5) file-saver
  6) excel
  7) xlsx  

# Reusable Components
-------------------------------------------------------------------------------------

    1. Common Components
    -------------------------------------------------------------------------------------
      1)  Checkbox                 - components/checkbox                `<app-checkbox></app-checkbox>`
      2)  Textbox                  - components/textbox                 `<app-textbox></app-textbox>`
      3)  Textarea                 - components/textarea                `<app-textarea></app-textarea>`
      4)  Dropdown                 - components/dropdown                `<app-dropdown></app-dropdown>`
      5)  Date-Picker              - components/date-picker             `<appdate-picker></date-picker>`
      6)  InputPopup 			         - components/input-popup				      `<app-input-popup></app-input-popup>`
	    7)  CapturePanel 			       - components/capture-panel			      `<app-capture-panel></app-capture-panel>`
	    8)  InputClear 			         - components/capture-panel			      `<app-input-clear></app-input-clear>`
	    9)  Notes 			  	         - components/notes					          `<app-notes></app-notes>`
	    10) RadioButton 			       - components/radio-button			      `<app-radio-button></app-radio-button>`
	    11) Text 			  		         - components/text					          `<app-text></app-text>`
	    12) PopupMenu                - components/popup-menu				      `<app-popup-menu></app-popup-menu>`
		 
	
    2. Page Shared Components
    -------------------------------------------------------------------------------------
      1) Layout               - shared/layout
      2) Header               - shared/header
	    3) MessageBar		  	  - shared/message-bar

    3. Page Components
    -------------------------------------------------------------------------------------
      1)  Deal List						- pages/deal-list
      2)  Deal Type Selection			- pages/deal-type-selection
      3)  Java console					- pages/java-console
      4)  Main Menu						- pages/main-menu
      5)  Personal Settings				- pages/personal-settings
      6)  Data Input Forms				- pages/data-input-forms
      7)  Search Deals					- pages/search-deals 
      8)  Single Search					- pages/single-search       
      9)  Spot Unallocated				- pages/spot-unallocated       
      10) User Management Results		- pages/user-management-results
	  
# Page URL's
-------------------------------------------------------------------------------------
  1) main-menu								-   Main Menu	
  2) deal-type-selection					-   Deal Type Selection
  3) deal-type-selection/spot-unallocated   -   Spot Unallocated
  4) single-search							-   Single Search	
  5) search-deals							-   Search Deals	
  6) search-deals/deal-list					-   Deal List
  7) personal-settings						-   Personal Settings	
  8) java-console							-   Java console


## Display Java DOC
Pressing F1 from any screen will open the Java Console

## Refresh Pages
F5 click can not overide on browsers. So I replaced F5 with F10
http://apps.topcoder.com/forums/?module=Thread&threadID=924882&start=0


# Sample vedio demo
https://www.youtube.com/watch?v=BPm6HF9gn40





