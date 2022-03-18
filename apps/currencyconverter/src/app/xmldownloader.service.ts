import { Injectable } from '@angular/core';
import { ItemDTO } from '@currencyconverter/api-interfaces';
import * as JsonToXML from "js2xmlparser";
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class XMLDownloaderService {

  constructor() { }

  saveItems(items: ItemDTO[]){
    const xmlString = JsonToXML.parse("invoice", {item: items});
    const blob = new Blob([xmlString], {type: "text/plain;charset=utf-8"});
    const now = new Date();
    saveAs(blob, `invoice-${now.toLocaleString()}.xml`);
  }


}
