import { Component, AfterContentInit, ContentChildren, QueryList, Output, EventEmitter, HostListener } from '@angular/core';
import { PmTabContentComponent } from '../pm-tab-content/pm-tab-content.component';
import { PmTabService } from '../../services/pm-tab.service';

@Component({
  selector: 'app-pm-tab',
  templateUrl: './pm-tab.component.html',
  styleUrls: ['./pm-tab.component.scss']
})
export class PmTabComponent implements AfterContentInit {

  @ContentChildren(PmTabContentComponent) tabs: QueryList<PmTabContentComponent>;

  @Output() tabSelection = new EventEmitter();

  constructor(private usTabService: PmTabService) { }
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this.tabs.filter((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first, 0);
    }
  }

  selectTab(tab: PmTabContentComponent, index) {
    if (!tab.disable) {
      // deactivate all tabs
      this.tabs.toArray().forEach(selectedTab => selectedTab.active = false);

      // activate the tab the user has clicked on.
      this.activateTab(tab);
    }

  }

  /**
   * Listening to keyboard key up events and navigate to between tabs
   * @param {*} event
   * @memberof ContractDataComponent
   */
  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    switch (event.code) {
      case 'F7': // Previous tab
        const previousTab = this.getPreviousTab();
        this.activateTab(previousTab);

        break;
      case 'F8': // Next tab
        const nextTab = this.getNextTab();
        this.activateTab(nextTab);
        break;
    }
  }

  private getPreviousTab() {
    const tabArr = this.tabs.toArray();
    const activeTab = tabArr.filter(t => t.active)[0];
    let previousTab;

    if (activeTab.id > 1) {
      previousTab = tabArr.filter(t => t.id === activeTab.id - 1)[0];
    }

    if (activeTab.id === 1) {
      previousTab = tabArr.filter(t => t.id === 10)[0];
    }

    return previousTab;
  }

  private getNextTab() {
    const tabArr = this.tabs.toArray();
    const activeTab = tabArr.filter(t => t.active)[0];
    let nextTab;

    if (activeTab.id < 10) {
      nextTab = tabArr.filter(t => t.id === activeTab.id + 1)[0];
    }

    if (activeTab.id === 10) {
      nextTab = tabArr.filter(t => t.id === 1)[0];
    }

    return nextTab;
  }

  private activateTab(tab) {
    // deactivate all tabs
    this.tabs.toArray().forEach(selectedTab => selectedTab.active = false);
    // activate the tab the user has clicked on.
    tab.active = true;
    this.usTabService.tabSelectionChange(tab.id - 1);

    this.tabSelection.emit(this.tabs.toArray());

  }

}
