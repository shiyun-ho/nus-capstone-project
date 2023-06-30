import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TrackerItem } from 'src/app/model/tracker-item';
import { TrackerService } from 'src/app/services/tracker.service';



@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css'],
  providers: [TitleCasePipe]
})
export class TrackerComponent implements OnInit {

  trackerItems: TrackerItem[] = [];
  totalQty: number = 0;
  skinConcernForms: FormGroup[] = [];
  trackerItemsWithConcern: TrackerItem[] = [];

  constructor(private trackerSvc: TrackerService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.trackerSvc.calculateTrackerTotals();
    this.listTrackerDetails();

    this.trackerItems.forEach((_, index) => {
      this.skinConcernForms.push(this.createSkinConcernForm());
    });
  }

  createSkinConcernForm(): FormGroup {
    return this.formBuilder.group({
      skinConcern: ['']
    });
  }

  getSkinConcernControl(index: number): FormControl {
    const formGroup = this.skinConcernForms[index];
    return formGroup.controls['skinConcern'] as FormControl;
  }

  onSubmit(index: number) {

    console.log('>>>>Starting onSubmit()');

    // Get the skin concern value from the corresponding form control
    const skinConcernControl = this.getSkinConcernControl(index);
    const skinConcernValue = skinConcernControl.value;
    console.log('Skin Concern Value:', skinConcernValue);

    // Get the corresponding trackerItem using the index
    const trackerItem = this.trackerItems[index];

    // // Set the skinConcern property of the trackerItem
    // trackerItem.skinConcern = skinConcernValue;

    // Check if the trackerItem already has a skinConcern array
    if (!trackerItem.skinConcern) {
      trackerItem.skinConcern = []; // Initialize the skinConcern array
    }

    // Add the new skinConcern value to the array
    trackerItem.skinConcern.push(skinConcernValue);

    // Reset the skin concern form field
    skinConcernControl.reset();

    console.log('>>>>>Tracker items with skin concern', this.trackerItems);

  }

  listTrackerDetails() {
    console.log('listTrackerDetails called');

    // Get the trackerItems from localStorage
    const storedTrackerItems = localStorage.getItem('trackerItems');

    if (storedTrackerItems) {
      // Parse the stored items
      this.trackerItems = JSON.parse(storedTrackerItems);
    }

    // Subscribe to the tracker totalQty
    this.trackerSvc.totalQty.subscribe(data => this.totalQty = data);

    console.log('Tracker Items:', this.trackerItems);
  }

  increaseQty(theTrackedItem: TrackerItem) {
    const description = theTrackedItem.description;
    this.trackerSvc.addToTracker(theTrackedItem, description);
  }


  decreaseQty(theTrackedItem: TrackerItem) {
    this.trackerSvc.removeFromTracker(theTrackedItem);
  }

  getCommonIngredients(): string[] {
    // Create an array to store all the ingredient lists
    const ingredientLists: string[][] = [];
  
    // Filter the trackerItemsWithConcern array to include only items with skin concerns
    const itemsWithConcern = this.trackerItems.filter(item => item.skinConcern && item.skinConcern.length > 0);
    console.log('itemsWithConcern', itemsWithConcern);

    // Iterate over each tracker item with skin concerns
    itemsWithConcern.forEach(item => {
      // Split the ingredients string and add it to the ingredientLists array
      const ingredients = item.description.ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());
      ingredientLists.push(ingredients);
    });
    console.log('ingredientLists', ingredientLists);
  
    // Find the common ingredients using the reduce and filter functions
    const commonIngredients = ingredientLists.reduce((accumulator, currentList) => {
      return accumulator.filter(ingredient => currentList.includes(ingredient));
    }, ingredientLists[0] || []);
    console.log('commonIngredients', commonIngredients)
  
    // Return the array of common ingredients
    return commonIngredients.length > 0 ? commonIngredients : ['No common ingredients found'];
  }
  

  // getCommonIngredients(): string[] {
  //   // Create an array to store all the ingredient lists
  //   const ingredientLists: string[][] = [];
    
  //   // Filter the trackerItemsWithConcern array to include only items with skin concerns
  //   const itemsWithConcern = this.trackerItemsWithConcern.filter(item => item.skinConcern && item.skinConcern.length > 0);
  //   console.log('itemsWithConcern', itemsWithConcern)
    
  //   // Iterate over each tracker item with skin concerns
  //   itemsWithConcern.forEach(item => {
  //     // Split the ingredients string and add it to the ingredientLists array
  //     const ingredients = item.description.ingredients.split(',');
  //     ingredientLists.push(ingredients);

  //     console.log('ingredientLists', ingredientLists);
  //   });
    
  //   // Find the common ingredients using the reduce and filter functions
  //   const commonIngredients = ingredientLists.reduce((accumulator, currentList) => {
  //     return accumulator.filter(ingredient => currentList.includes(ingredient));
  //   }, ingredientLists[0] || []);

  //   console.log('commonIngredients', commonIngredients);
    
  //   // Return the array of common ingredients
  //   return commonIngredients.length > 0 ? commonIngredients : ['No common ingredients found'];
  // }
  

  // getCommonIngredients(tempTrackerItem: TrackerItem): string[] {
  //   // Split the ingredients string and add it to the ingredientList array
  //   const ingredientList = tempTrackerItem.description.ingredients.split(',');
  
  //   // Filter the trackerItemsWithConcern array to include only items with skin concerns
  //   const itemsWithConcern = this.trackerItemsWithConcern.filter(item => item.skinConcern && item.skinConcern.length > 0);
  
  //   // Find the common ingredients by checking if each item's ingredients are present in the ingredientList
  //   const commonIngredients = ingredientList.filter(ingredient => {
  //     return itemsWithConcern.every(item => item.description.ingredients.split(',').includes(ingredient));
  //   });
  
  //   // Return the array of common ingredients
  //   return commonIngredients.length > 0 ? commonIngredients : ['No common ingredients found'];
  // }
  
  
  

  // getCommonIngredients(tempTrackerItem: TrackerItem): string[] {
  //   // Create an array to store all the ingredient lists
  //   const ingredientLists: string[][] = [];
  
  //   // Iterate over each tracker item
  //   this.trackerItemsWithConcern.forEach(item => {
  //     // Check if the item has skin concerns
  //     if (item.skinConcern && item.skinConcern.length > 0) {
  //       // Split the ingredients string and add it to the ingredientLists array
  //       const ingredients = item.description.ingredients.split(',');
  //       ingredientLists.push(ingredients);
  //     }
  //   });
  
  //   // Find the common ingredients using the reduce and filter functions
  //   const commonIngredients = ingredientLists.reduce((accumulator, currentList) => {
  //     return accumulator.filter(ingredient => currentList.includes(ingredient));
  //   }, []);
  
  //   // Return the array of common ingredients
  //   return commonIngredients.length > 0 ? commonIngredients : ['No common ingredients found'];
  // }
  


  
 

}

