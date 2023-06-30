package sg.edu.nus.iss.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.server.dto.Purchase;
import sg.edu.nus.iss.server.dto.PurchaseResponse;
import sg.edu.nus.iss.server.service.CheckoutService;

// @CrossOrigin("http://localhost:4200")
@CrossOrigin()
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutSvc; 
    
    @Autowired
    private CheckoutController(CheckoutService checkoutSvc){
        this.checkoutSvc = checkoutSvc; 
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutSvc.placeOrder(purchase);

        return purchaseResponse; 
    }
    
}
