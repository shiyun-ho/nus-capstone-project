import { Injectable } from '@angular/core';
import { TrackerItem } from '../model/tracker-item';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductDescription } from '../model/product-description';

@Injectable({
  providedIn: 'root'
})

export class TrackerService {

  trackerItems: TrackerItem[] = [];

  totalQty: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  // addToTracker(theTrackedItem: TrackerItem) {

  //   // Check if it exists
  //   let existingTrackerItems: TrackerItem[] = this.getTrackerItems();

  //   // Check if the item already exists
  //   const existingItemIndex = existingTrackerItems.findIndex(
  //     (item) => item.id === theTrackedItem.id
  //   );

  //   if (existingItemIndex > -1) {
  //     // Item already exists, increment the quantity
  //     existingTrackerItems[existingItemIndex].quantity++;
  //   } else {
  //     // Item doesn't exist, add it to the array
  //     existingTrackerItems.push(theTrackedItem);
  //   }

  //   // Assign the product description to the tracked item
  //   existingTrackerItems[existingItemIndex].description = theTrackedItem.description;

  //   // Save the updated tracker items to localStorage
  //   this.saveTrackerItems(existingTrackerItems);

  //   this.calculateTrackerTotals();
  //   console.log('Tracker Items:', existingTrackerItems);
  // }

  addToTracker(trackedItem: TrackerItem, description: ProductDescription) {
    const existingTrackerItems: TrackerItem[] = this.getTrackerItems();
  
    const itemIndex = existingTrackerItems.findIndex(
      (item) => item.id === trackedItem.id
    );
  
    if (itemIndex > -1) {
      existingTrackerItems[itemIndex] = {
        ...trackedItem,
        skinConcern: trackedItem.skinConcern || '', // Assign default value if skinConcern is falsy
      };
    } else {
      existingTrackerItems.push({
        ...trackedItem,
        skinConcern: trackedItem.skinConcern || '', // Assign default value if skinConcern is falsy
      });
    }
  
    // Save the updated tracker items to localStorage
    this.saveTrackerItems(existingTrackerItems);
  
    // Update the total quantity
    this.calculateTrackerTotals();
  
    // Log the updated tracker items for debugging
    console.log('Updated Tracker Items:', existingTrackerItems);
  }

  saveTrackerItems(trackerItems: TrackerItem[]) {
    localStorage.setItem('trackerItems', JSON.stringify(trackerItems));
  }

  getTrackerItems(): TrackerItem[] {
    const storedTrackerItems = localStorage.getItem('trackerItems');

    if (storedTrackerItems) {
      return JSON.parse(storedTrackerItems) as TrackerItem[];
    }

    return [];
  }

  removeFromTracker(theTrackedItem: TrackerItem) {
    theTrackedItem.quantity--;

    if (theTrackedItem.quantity == 0) {
      //remove from list 
      const itemIdx = this.trackerItems.findIndex(tempTrackerItem => tempTrackerItem.id === theTrackedItem.id);

      if (itemIdx > -1) {
        this.trackerItems.splice(itemIdx, 1);

        this.calculateTrackerTotals();
      } else {
        this.calculateTrackerTotals();
      }
    }
    // Update the trackerItems array
    this.updateTrackerItems();
  }

  calculateTrackerTotals() {
    let totalQtyValue: number = 0;

    for (let currTrackerItem of this.trackerItems) {
      totalQtyValue += currTrackerItem.quantity;
    }

    this.totalQty.next(totalQtyValue);

    //check if quantity is showing 
    this.logTrackerData(totalQtyValue);
  }

  logTrackerData(totalQtyValue: number) {
    console.log(`>>>>Tracker details`);
    for (let tempTrackerItem of this.trackerItems) {
      console.log(`name: ${tempTrackerItem.name}, qty: ${tempTrackerItem.quantity}`);
    }

    console.log(`totalQty of products in tracker: ${totalQtyValue}`);
    console.log(`>>>>>>>>`);
  }

  updateTrackerItems() {
    // Update the trackerItems array in localStorage
    localStorage.setItem('trackerItems', JSON.stringify(this.trackerItems));

    // Calculate the tracker totals
    this.calculateTrackerTotals();
  }

}
