import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContextMenuModule } from 'ngx-contextmenu';
import {NgxMaskModule} from 'ngx-mask';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PersonalSettingsComponent } from './pages/personal-settings/personal-settings.component';
import { SpotUnallocatedComponent } from './pages/spot-unallocated/spot-unallocated.component';
import { SearchDealsComponent } from './pages/search-deals/search-deals.component';
import { SingleSearchComponent } from './pages/single-search/single-search.component';
import { DealListComponent } from './pages/deal-list/deal-list.component';
import { PmCardComponent } from './components/pm-card/pm-card.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { TextboxComponent } from './components/textbox/textbox.component';
import { ConfirmationDialogBoxComponent } from './components/confirmation-dialog-box/confirmation-dialog-box.component';
import { PmTabComponent } from './components/pm-tab/pm-tab.component';
import { PmTabContentComponent } from './components/pm-tab-content/pm-tab-content.component';
import { ContractDataComponent } from './components/contract-data/contract-data.component';
import { PaymentDeliveryComponent } from './components/payment-delivery/payment-delivery.component';
import { TextComponent } from './components/text/text.component';
import { OutputControlComponent } from './components/output-control/output-control.component';
import { TaxComponent } from './components/tax/tax.component';
import { ReferencesComponent } from './components/references/references.component';
import { NotesComponent } from './components/notes/notes.component';
import { TechnicalInfosComponent } from './components/technical-infos/technical-infos.component';
import { RepetitionComponent } from './components/repetition/repetition.component';
import { PreventionComponent } from './components/prevention/prevention.component';
import { CapturePanelComponent } from './components/capture-panel/capture-panel.component';
import { DealTypeSelectionComponent } from './pages/deal-type-selection/deal-type-selection.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MessageBarComponent } from './shared/message-bar/message-bar.component';
import { InputPopupComponent } from './components/input-popup/input-popup.component';
import { PopupMenuComponent } from './components/popup-menu/popup-menu.component';
import { PadNumberDirective } from './directives/pad-number.directive';
import { FormatDateDirective } from './directives/format-date.directive';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { JavaConsoleComponent } from './pages/java-console/java-console.component';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { InputClearComponent } from './components/input-clear/input-clear.component';
import { SortableColumnComponent } from './components/sortable-column/sortable-column.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LayoutComponent,
    CheckboxComponent,
    MainMenuComponent,
    DropdownComponent,
    PersonalSettingsComponent,
    SpotUnallocatedComponent,
    SearchDealsComponent,
    SingleSearchComponent,
    DealListComponent,
    PmCardComponent,
    DealListComponent,
    TextareaComponent,
    TextboxComponent,
    ConfirmationDialogBoxComponent,
    PmTabComponent,
    PmTabContentComponent,
    ContractDataComponent,
    PaymentDeliveryComponent,
    TextComponent,
    OutputControlComponent,
    TaxComponent,
    ReferencesComponent,
    NotesComponent,
    TechnicalInfosComponent,
    RepetitionComponent,
    PreventionComponent,
    CapturePanelComponent,
    DealTypeSelectionComponent,
    DatePickerComponent,
    MessageBarComponent,
    InputPopupComponent,
    PopupMenuComponent,
    PadNumberDirective,
    FormatDateDirective,
    RadioButtonComponent,
    JavaConsoleComponent,
    SortableColumnComponent,
    SortableTableDirective,
    InputClearComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    NgbModule,
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    }),
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
