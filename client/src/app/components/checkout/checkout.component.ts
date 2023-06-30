import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { OrderItem } from 'src/app/model/order-item';
import { Purchase } from 'src/app/model/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormServiceService } from 'src/app/services/form-service.service';
import { parse, v4 as uuidv4 } from 'uuid';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CurrencyPipe]
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  totalPrice: number = 0.00;
  totalQty: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder: FormBuilder, private formSvc: FormServiceService, 
    private cartSvc: CartService, private checkoutSvc: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails(); 

    this.checkoutForm = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.email])

      }),
      shippingAddress: this.formBuilder.group({
        // postalCode: new FormControl('', [Validators.required, Validators.minLength(2)]),
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        unitNo: new FormControl('', [Validators.required, Validators.minLength(2)]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.pattern('^[0-9]+$'), Validators.maxLength(6)])
        // state: new FormControl('', [Validators.required, Validators.minLength(2)]),
        // country: new FormControl('', [Validators.required, Validators.minLength(2)]),
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        unitNo: new FormControl('', [Validators.required, Validators.minLength(2)]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(6),
          Validators.pattern('^[0-9]+$'), Validators.maxLength(6)])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2)]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'),
        Validators.minLength(16), Validators.maxLength(16)]),
        securityCode: new FormControl('', [Validators.required, 
        Validators.minLength(3), Validators.pattern('^[0-9]{3}$'), Validators.maxLength(3)]),
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    //credit card months
    const startMonth: number = 1;

    this.formSvc.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log(`Retrieved credit card month:` + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    this.formSvc.getCreditCardYears().subscribe(
      data => {
        console.log(`Retrieved credit card year:` + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )
  }
  reviewCartDetails() {
    
    //subscribe to cart svc (total qty and total p)
    this.cartSvc.totalQty.subscribe(
      totalQty => {this.totalQty = totalQty; 
    });

    this.cartSvc.totalPrice.subscribe(
      totalPrice => {this.totalPrice = totalPrice; 
    });
  }

  copyShippingDetails(event: any) {

    if (event.target.checked) {
      this.checkoutForm.controls['billingAddress']
        .setValue(this.checkoutForm.controls['shippingAddress'].value);
    } else {
      this.checkoutForm.controls['billingAddress'].reset();
    }
  }

  //customer form group
  get firstName() {
    return this.checkoutForm.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutForm.get('customer.lastName');
  }
  get email() {
    return this.checkoutForm.get('customer.email');
  }

  //shipping address form group
  get shipAddpostalCode() {
    return this.checkoutForm.get('shippingAddress.postalCode');
  }
  get shipAddStreetName() {
    return this.checkoutForm.get('shippingAddress.streetName');
  }
  get shipAddUnitNo() {
    return this.checkoutForm.get('shippingAddress.unitNo');
  }
  get shipAddZipCode() {
    return this.checkoutForm.get('shippingAddress.zipCode');
  }

  //billing address form group
  get billAddpostalCode() {
    return this.checkoutForm.get('billingAddress.postalCode');
  }
  get billAddStreetName() {
    return this.checkoutForm.get('billingAddress.streetName');
  }
  get billAddUnitNo() {
    return this.checkoutForm.get('billingAddress.unitNo');
  }
  get billAddZipCode() {
    return this.checkoutForm.get('billingAddress.zipCode');
  }

  //security card form group
  get cardType() {
    return this.checkoutForm.get('creditCard.cardType');
  }
  get nameOnCard () {
    return this.checkoutForm.get('creditCard.nameOnCard');
  }
  get cardNumber () {
    return this.checkoutForm.get('creditCard.cardNumber');
  }
  get securityCode () {
    return this.checkoutForm.get('creditCard.securityCode');
  }
  get expirationMonth() {
    return this.checkoutForm.get('creditCard.expirationMonth');
  }
  get expirationYear() {
    return this.checkoutForm.get('creditCard.expirationYear');
  }

  onSubmit() {
    console.log(`>>> Registering information sent`)
    console.log(this.checkoutForm.get(`customer`)?.value);

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return; 
    }

    //on submission, set order, get cart items, create orderItems from cartItems
    let order = new Order(); 
    order.totalPrice = this.totalPrice; 
    order.totalQuantity = this.totalQty; 

    const cartItems = this.cartSvc.cartItems; 

    //Handle OrderItem - loop through to add cartItems to orderItems
    let orderItem: OrderItem[] =[]; 
    for (let i=0; i<cartItems.length; i++){
      orderItem[i] = new OrderItem(cartItems[i]);
    }

    //Handle Purchase
    //set purchase
    let purchase = new Purchase(); 
    purchase.customer = this.checkoutForm.controls['customer'].value; 

    //address handling 
    // purchase.shippingAddress = this.checkoutForm.controls['shippingAddress'].value; 
    // purchase.billingAddress = this.checkoutForm.controls['billingAddress'].value; 
    // Generate UUIDs for billingAddress and shippingAddress
    // const billingAddressId = uuidv4();
    // const shippingAddressId = uuidv4();

    const billingAddressId = parseInt(parse(uuidv4()).toString().replace(/-/g, ''), 16);
    const shippingAddressId = parseInt(parse(uuidv4()).toString().replace(/-/g, ''), 16);


    // Set shipping and billing address with generated UUIDs
    purchase.shippingAddress = {
      ...this.checkoutForm.value.shippingAddress,
      id: shippingAddressId,
    };

    purchase.billingAddress = {
      ...this.checkoutForm.value.billingAddress,
      id: billingAddressId,
    };

    purchase.order = order; 
    purchase.orderItem = orderItem; 
    
    //call backend with checkoutSvc
    this.checkoutSvc.placeOrder(purchase).subscribe(
      {
        //call springboot and see if it communicates to SB successfully
        next: response => {
          alert(`You have placed your order successfully. \nOrder tracking number: 
          ${response.orderTrackingNumber}`);
          //reset the cart
          this.resetCart(); 
        } ,
        error: error => {
          alert(`There was an error: ${error.message}`); 
          console.log(`>>>>>Order Info: `, purchase)
          // Serialize the form data into JSON
          const payload = JSON.stringify(purchase);

          // Print the JSON payload
          console.log('JSON Payload:', payload);
        }
      }
    );
  }

  resetCart() {
    //reset cart 
    this.cartSvc.cartItems = []; 
    this.cartSvc.totalPrice.next(0);
    this.cartSvc.totalQty.next(0);

    //reset form
    this.checkoutForm.reset();
    
    //navigate back to main page
    this.router.navigateByUrl("/products"); 
  }



}
