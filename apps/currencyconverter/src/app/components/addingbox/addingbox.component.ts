import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ItemDTO, NewItemDTO } from '@currencyconverter/api-interfaces';

@Component({
  selector: 'currencyconverter-addingbox',
  templateUrl: './addingbox.component.html',
  styleUrls: ['./addingbox.component.scss']
})
export class AddingBoxComponent implements OnInit {

  @Output() itemAdded = new EventEmitter<ItemDTO>();

  public dateNow = (new Date()).toJSON().slice(0,10);
  public newItem = {addNameValue: "", addConvDateValue: "", addUSDPriceValue: NaN}; //lub undefined as number | undefined
  public addedItem?: ItemDTO;
  public error = "";

  constructor(private readonly client: HttpClient) { }

  ngOnInit(): void {
  }

  addNew(){
    const itemek: NewItemDTO = {
      name: this.newItem.addNameValue,
      currencyConvertingDateString: this.newItem.addConvDateValue,
      priceUSD: this.newItem.addUSDPriceValue ?? 0 // ?? - operator mówiący, że jeśli pierwsza wartość będzie undefined/null, to zastosuj wartość podaną po operatorze
    }
    this.client.post<ItemDTO>('/api/add-item', itemek).subscribe({ //subscribe - wywołuje post i czeka na wynik
      next: addedItem => { // wykonje się, gdy tylko przyjdzie wynik i będzie on pozytywny
        this.error = "";
        this.itemAdded.emit(addedItem);
        this.addedItem = addedItem;
        setTimeout(()=>{
          this.addedItem = undefined;
        }, 5000);
        this.newItem.addNameValue = "";
        this.newItem.addConvDateValue = "";
        this.newItem.addUSDPriceValue = NaN;
      }, error: (error) => { // wykonuje się, gdy przyjdzie wynik, ale będzie on negatywny
        this.error = "The NBP server returned an error. Consider changing the date (weekends do not work).";
        console.log(error)
    }});
    
  }



}
