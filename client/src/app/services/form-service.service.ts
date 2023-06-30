import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{
    let data: number[] = []; 

    //array for month
    for (let theMonth = startMonth; theMonth <= 12; theMonth++){
      //add items to array
      data.push(theMonth);
    }

    //wrap data as an observable to allow subscription to receive async 
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = []; 

    const startYear: number = 2023; 
    const endYear: number = 2033; 

    //array for year
    for (let theYear= startYear; theYear <= endYear; theYear++){
      //generate from 2023 to 2033
      data.push(theYear);
    }

    return of(data); 
  }

}
