import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { AddingBoxComponent } from './components/addingbox/addingbox.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SortingComponent } from './components/sorting/sorting.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, ButtonComponent, TableComponent, AddingBoxComponent, SearchboxComponent, SortingComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class FrontendModule {}
