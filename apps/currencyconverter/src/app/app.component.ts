import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchParams } from './components/searchbox/searchbox.component';

export enum v {
  Empty, AddItemBox, ItemsTable, SearchingBox
}

@Component({
  selector: 'currencyconverter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public activeTab: v = v.ItemsTable; //v.Empty;
  public searchPar?: SearchParams;

  constructor(private http: HttpClient) {}


  toggleAddItemBox(){
    this.activeTab = v.AddItemBox;
  }

  toggleItemsTable(){
     this.activeTab = v.ItemsTable;
     this.searchPar = undefined;
  }

  toggleSearchingBox(){
    if(this.activeTab === v.SearchingBox)
    this.activeTab = v.ItemsTable;
    else
    this.activeTab = v.SearchingBox;
  }

  isTableActive(): boolean {
    return this.activeTab===v.ItemsTable;
  }

  isAddingBoxActive(): boolean {
    return this.activeTab===v.AddItemBox;
  }

  isSearchBoxActive():boolean {
    return this.activeTab===v.SearchingBox;
  }

  onSearch(searchingEvent: SearchParams) {
    this.searchPar = searchingEvent;
  }
}
