import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "items"})
export class Item {
  @PrimaryGeneratedColumn({name: "id"})
  id: number;

  @Column({name: "name"})
  name: string;

  @Column({name: "accounting_date"})
  accountingDate: Date;

  @Column({name: "currency_converting_date"})
  currencyConvertingDate: Date;

  @Column({name: "cost_usd"})
  costUSDinPenny: number;
  
  @Column({name: "cost_pln"})
  costPLNinGrosze: number;
}