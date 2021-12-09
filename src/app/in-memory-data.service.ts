import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TableUnits } from './tableUnit';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tableUni = [
      { id: 1, name: "stian", age:"31", lutefiskElsker:false, birthDay: "	2021-12-22T23:00:00.000Z"},
      { id: 2, name: "siri", age:"29", lutefiskElsker:true, birthDay: "	1959-03-02T03:00:00.000Z"}
  
    ];
    return {tableUni};
  }
  genId(tableUni: TableUnits[]): number {
    return tableUni.length > 0 ? Math.max(...tableUni.map(tableUni => tableUni.id)) + 1 : 11;
  }

}