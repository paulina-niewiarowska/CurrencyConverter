import { Injectable } from '@angular/core';
import { ItemDTO } from '@currencyconverter/api-interfaces';
import { XMLBuilder } from 'fast-xml-parser';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class XMLDownloaderService {
  constructor() {}

  saveItems(items: ItemDTO[]) {
    const builder = new XMLBuilder({});
    const xmlString = builder.build({ invoice: { item: items } });
    const blob = new Blob([xmlString], { type: 'text/plain;charset=utf-8' });
    const now = new Date();
    saveAs(blob, `invoice-${now.toLocaleString()}.xml`);
  }
}
