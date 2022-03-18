import { NBPRate, NBPResultDTO } from "@currencyconverter/api-interfaces";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";

@Injectable() 
export class ConverterService{
    
    constructor(private httpService: HttpService){}

    async convert(dateString: string): Promise<NBPRate> {
        //format daty: 2022-01-03
        const response = await lastValueFrom(this.httpService.get<NBPResultDTO>(`https://api.nbp.pl/api/exchangerates/rates/a/usd/${dateString}/?format=json`))
        return response.data.rates[0];
    }

    async convertToPLN(costUSD: number, convDate: string): Promise<number> {
        const rate = (await this.convert(convDate)).mid;
        return costUSD*rate;
      }
}