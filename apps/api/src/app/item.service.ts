import { Injectable } from '@nestjs/common';
import { Connection, DeleteResult, ObjectID, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConverterService } from './converter.service';
import { ItemDTO } from '@currencyconverter/api-interfaces';

@Injectable()
export class ItemService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
    private readonly converterService: ConverterService
  ) {}

  public async addToDatabase(
    name: string,
    currencyConvertingDate: Date,
    priceusd: number
  ): Promise<ItemDTO> {

    const priceusdpenny = priceusd * 100;

    const dateString = currencyConvertingDate.toJSON().slice(0, 10);

    const item: Item = {
      id: undefined,
      name: name,
      accountingDate: new Date(),
      currencyConvertingDate: currencyConvertingDate,
      costUSDinPenny: priceusdpenny,
      costPLNinGrosze: await this.converterService.convertToPLN(priceusdpenny, dateString),
    };
    const itemfromdb = await this.itemRepo.save(item);
    console.log('Item added', itemfromdb);
    return itemfromdb;
  }

  public getAll(): Promise<ItemDTO[]> {
    return this.itemRepo.find(); //w api.module linijka TypeOrmModule.forFeature([Item]) tworzy itemRepo
  }

  public getItemById(searchId: number): Promise<ItemDTO> {
    return this.itemRepo.findOne({ id: searchId });
  }

  public getItemsByName(searchName: string): Promise<ItemDTO[]> {
    return this.itemRepo.find({ name: searchName });
  }

  public getItemsByDate(searchDate: Date): Promise<ItemDTO[]> {
    const year = searchDate.getFullYear();
    const month = searchDate.getMonth() + 1;
    const day = searchDate.getDate();
    return this.itemRepo.query(
      `SELECT * FROM items WHERE YEAR(accounting_date)=${year} AND MONTH(accounting_date)=${month} AND DAY(accounting_date)=${day}`
    );
  }

  public async removeItemById(idToRemove: number): Promise<boolean> {
    return (await this.itemRepo.delete({ id: idToRemove })).affected > 0;
  }

  public async updateItemById(
    id: number,
    newName: string,
    currencyConvertingDate: Date,
    newPriceusd: number
  ): Promise<Item> {

    const newPriceusdpenny = newPriceusd * 100;

    const dateString = currencyConvertingDate.toJSON().slice(0, 10);

    const newItem: Item = {
      id: id,
      name: newName,
      accountingDate: new Date(),
      currencyConvertingDate: currencyConvertingDate,
      costUSDinPenny: newPriceusdpenny,
      costPLNinGrosze: await this.converterService.convertToPLN(
        newPriceusdpenny,
        dateString
      ),
    };
    const itemfromdb = this.itemRepo.save(newItem);
    console.log('Item updated', itemfromdb);
    return itemfromdb;
  }
}
