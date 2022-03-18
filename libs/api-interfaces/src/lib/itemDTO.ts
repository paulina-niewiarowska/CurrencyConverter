export interface ItemDTO{
  id: number;
  name: string;
  accountingDate: Date;
  currencyConvertingDate: Date;
  costUSDinPenny: number;
  costPLNinGrosze?: number;
}