import { Component, EventEmitter, OnInit, Output } from '@angular/core';

export interface SearchParams {
  name?: string;
  date?: string;
}

@Component({
  selector: 'currencyconverter-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
})
export class SearchboxComponent implements OnInit {
  @Output() searchNow = new EventEmitter<SearchParams>(); //aby dowiedzieć się, czego szukamy (user's input)

  public dateNow = new Date().toJSON().slice(0, 10);

  public searchValue = ''; //dwustronne wiązanie - jeśli zmieni się coś w widoku (html), ta zmienna również ulegnie zmianie, i na odwrót
  public searchDate = '';

  constructor() {}
  ngOnInit(): void {}

  searchForName(value: string) {
    this.searchValue = value;
    this.emitSearchEvent();
  }

  searchForDate(value: string) {
    this.searchDate = value;
    this.emitSearchEvent();
  }

  emitSearchEvent(): void {
    this.searchNow.emit({
      name: this.searchValue.length > 0 ? this.searchValue : undefined,
      date: this.searchDate.length > 0 ? this.searchDate : undefined,
    });
  }
}
