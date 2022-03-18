import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

@Injectable()
export class DecimalTransformer implements ValueTransformer {

  to(decimal?: Decimal): string {
    return decimal?.toString();
  }
  
  from(decimal?: string): Decimal | null {
    return decimal ? new Decimal(decimal) : null;
  }
}