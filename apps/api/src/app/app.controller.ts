import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ItemService } from './item.service';
import { ItemDTO, NewItemDTO } from '@currencyconverter/api-interfaces';

@Controller()
export class AppController {
  constructor(private readonly itemService: ItemService) {}

  @Post('add-item')
  postItem(@Body() bodyitem: NewItemDTO): Promise<ItemDTO> {
    return this.itemService.addToDatabase(bodyitem.name, new Date(bodyitem.currencyConvertingDateString), bodyitem.priceUSD);
  }

  @Get('get-all-items')
  getAllItems(): Promise<ItemDTO[]> {
    return this.itemService.getAll();
  }

  @Get('get-item-by-id/:id')
  getItemById(@Param('id') paramId: string): Promise<ItemDTO> {
    return this.itemService.getItemById(parseInt(paramId))[0];
  }

  @Get('get-items-by-name/:name')
  getItemsByName(@Param('name') paramName: string): Promise<ItemDTO[]> {
    return this.itemService.getItemsByName(paramName);
  }

  @Get('get-items-by-date/:date')
  getItemsByDate(@Param('date') paramDate: string): Promise<ItemDTO[]> {
    return this.itemService.getItemsByDate(new Date(paramDate))
  }

  @Delete('remove-item-by-id/:id')
  deleteItemById(@Param('id') paramId: string): Promise<boolean> {
    return this.itemService.removeItemById(parseInt(paramId));
  }

  @Put('update/:id')
  updateItem(@Param('id') itemId: string, @Body() itemBody: ItemDTO) {
    this.itemService.updateItemById(parseInt(itemId), itemBody.name, new Date(itemBody.accountingDate), itemBody.costUSDinPenny);
  }
  
}
