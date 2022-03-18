import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ItemService } from './item.service';
import { Item } from './entities/item.entity';
import { ConverterService } from './converter.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dbuser',
      password: 'dbpassw0rd',
      database: 'dbconverter',
      entities: [Item],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Item]),
    HttpModule
  ],
  controllers: [AppController], //kontroler - wywołuje metody z serwisów na prośbę użytkownika (obsługa żądań)
  providers: [ItemService, //serwis odpowiedzialny za wrzucanie itemków do bazy danych i wyciąganie ich z niej (crud)
    ConverterService, //serwis odpowiedzialny za pobieranie z banku kursu walut i przeliczanie ich
    ]
})
export class ApiModule {}
