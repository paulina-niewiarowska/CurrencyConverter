import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'currencyconverter-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss']
})
export class SortingComponent implements OnInit {

  @Input() name!: string;
  @Output() sort=new EventEmitter<string>();

  sortingClass = 'any';

  constructor() { }

  ngOnInit(): void {
  }

  public toggleSorting(): void {
   this.sortingClass = this.sortingClass === 'any' ? 'down' : this.sortingClass === 'down' ? 'up' : 'any';
   this.sort.emit(this.sortingClass);
  }

  public disableSorting(): void {
    this.sortingClass = 'any';
  }
}
