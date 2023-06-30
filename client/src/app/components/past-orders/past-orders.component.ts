import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PastOrders } from 'src/app/model/past-orders';
import { PastOrdersService } from 'src/app/services/past-orders.service';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css'],
  providers: [DatePipe],
})
export class PastOrdersComponent implements OnInit {
  
  pastOrdersList: PastOrders[]=[];
  browserStorage: Storage = sessionStorage; 

  constructor(private pastOrdersSvc: PastOrdersService) {}

  ngOnInit(): void {
    this.handlePastOrders();  
  }

  handlePastOrders() {
    //retrieve email from browser storage
    let userEmail = this.browserStorage.getItem('userEmail')!;
 
    if(userEmail == null) userEmail = '{"userEmail":"null"}';
 
    const theEmail = JSON.parse(userEmail);

    //retrieve the items
    this.pastOrdersSvc.getPastOrders(theEmail).subscribe(
      data=>{
        this.pastOrdersList = data._embedded.orders; 
      }
    )
  }

}
