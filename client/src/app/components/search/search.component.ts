import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private router: Router) {}

  ngOninIt(){

  }

  doSearch(value: string){
    console.log(`value=${value}`); 
    //route data to search route to ProductListComponent
    this.router.navigateByUrl(`/search/${value}`);
  }

}
