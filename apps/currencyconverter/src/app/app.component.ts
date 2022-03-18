import { Component } from '@angular/core';
import { SearchParams } from './components/searchbox/searchbox.component';

export enum TabsEnum {
  Empty, AddItemBox, ItemsTable, SearchingBox
}

@Component({
  selector: 'currencyconverter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public activeTab: TabsEnum = TabsEnum.Empty;
  public searchPar?: SearchParams;

  toggleAddItemBox(){
    this.activeTab = TabsEnum.AddItemBox;
  }

  toggleItemsTable(){
     this.activeTab = TabsEnum.ItemsTable;
     this.searchPar = undefined;
  }

  toggleSearchingBox(){
    if(this.activeTab === TabsEnum.SearchingBox)
    this.activeTab = TabsEnum.ItemsTable;
    else
    this.activeTab = TabsEnum.SearchingBox;
  }

  isTableActive(): boolean {
    return this.activeTab===TabsEnum.ItemsTable;
  }

  isAddingBoxActive(): boolean {
    return this.activeTab===TabsEnum.AddItemBox;
  }

  isSearchBoxActive():boolean {
    return this.activeTab===TabsEnum.SearchingBox;
  }

  onSearch(searchingEvent: SearchParams) {
    this.searchPar = searchingEvent;
  }
}
