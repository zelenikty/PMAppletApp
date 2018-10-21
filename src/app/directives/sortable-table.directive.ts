import { Directive, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { SortTableService } from '../services/sort-table.service';
import { Subscription } from 'rxjs';

/**
 * This is helper class to get sorted column data to table component
 */
@Directive({
  selector: '[appSortableTable]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

  constructor(private sortService: SortTableService) {}

    @Output()
    sorted = new EventEmitter();

    private columnSortedSubscription: Subscription;

    ngOnInit() {
        this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
            this.sorted.emit(event);
        });
    }

    ngOnDestroy() {
        this.columnSortedSubscription.unsubscribe();
    }
}
