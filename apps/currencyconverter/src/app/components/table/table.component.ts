import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { ItemDTO } from '@currencyconverter/api-interfaces';
import { lastValueFrom } from 'rxjs';
import { XMLDownloaderService } from '../../xmldownloader.service';
import { SearchParams } from '../searchbox/searchbox.component';
import { SortingComponent } from '../sorting/sorting.component';

@Component({
  selector: 'currencyconverter-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  tablename = 'All items';
  contents: ItemDTO[] = [];
  itemsToDisplay = this.contents;

  @Input() searchParams?: SearchParams;

  @ViewChildren(SortingComponent) sortingComponenents!: SortingComponent[]; //szuka wszystkich sorting components w widoku i wrzuca je w tablicę

  constructor(private readonly httpClient: HttpClient, private readonly xmlService: XMLDownloaderService) {}

  async ngOnInit(): Promise<void> {
    this.contents = await lastValueFrom(
      this.httpClient.get<ItemDTO[]>('/api/get-all-items')
    );
    this.itemsToDisplay = this.contents;
  }

  ngOnChanges(): void {
    this.itemsToDisplay = this.contents.filter(
      (item) =>
        (this.searchParams?.name && !this.searchParams?.date && item.name.includes(this.searchParams.name)) ||
        (!this.searchParams?.name && this.searchParams?.date && new Date(item.accountingDate).toJSON().slice(0, 10) === this.searchParams.date) ||
        (this.searchParams?.name && this.searchParams?.date && item.name.includes(this.searchParams.name) && new Date(item.accountingDate).toJSON().slice(0, 10) === this.searchParams.date) ||
        (!this.searchParams?.name && !this.searchParams?.date)
    );
  }

  public onSort(whatWeSort: string, direction: string) {
    this.sortingComponenents
      .filter((c) => c.name !== whatWeSort)
      .forEach((c) => c.disableSorting());
    switch (whatWeSort) {
      case 'id': {
        this.performSorting((a, b) => a.id - b.id, direction);
        break;
      }
      case 'name': {
        this.performSorting((a, b) => b.name.localeCompare(a.name), direction);
        break;
      }
      case 'currencyDate': {
        this.performSorting(
          (a, b) =>
            new Date(a.currencyConvertingDate).getTime() -
            new Date(b.currencyConvertingDate).getTime(),
          direction
        );
        break;
      }
      case 'date': {
        this.performSorting(
          (a, b) =>
            new Date(a.accountingDate).getTime() -
            new Date(b.accountingDate).getTime(),
          direction
        );
        break;
      }
      case 'usd': {
        this.performSorting(
          (a, b) => a.costUSDinPenny - b.costUSDinPenny,
          direction
        );
        break;
      }
      case 'pln': {
        this.performSorting(
          (a, b) => a.costPLNinGrosze! - b.costPLNinGrosze!,
          direction
        );
        break;
      }
    }
  }
  private performSorting(
    compareFn: (a: ItemDTO, b: ItemDTO) => number,
    direction: string
  ) {
    if (direction === 'up') {
      this.itemsToDisplay.sort(compareFn);
    } else if (direction === 'down') {
      this.itemsToDisplay.sort(compareFn).reverse();
    } else {
      this.performSorting((a, b) => a.id - b.id, 'up');
    }
  }


  xmlExport(){
    this.xmlService.saveItems(this.itemsToDisplay);
  }

}
