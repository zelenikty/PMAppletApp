import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { SortTableService } from 'src/app/services/sort-table.service';
import { Subscription } from 'rxjs';

/**
 * Table header column sorting icon display
 */
@Component({
  selector: 'app-sortable-column, [app-sortable-column]',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  private columnSortedSubscription: Subscription;
  @Input() columnName: string;

  @Input() sortDirection = '';


  constructor(private sortService: SortTableService) { }

  ngOnInit() {
    // subscribe to sort changes so we can react when other columns are sorted
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      // reset this column's sort direction to hide the sort icons
      if (this.columnName !== event.sortColumn) {
        this.sortDirection = '';
      }
    });
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

  @HostListener('click')
  sort() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortService.columnSorted({ sortColumn: this.columnName, sortDirection: this.sortDirection });
  }
}
