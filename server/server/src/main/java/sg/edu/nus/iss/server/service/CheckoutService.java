package sg.edu.nus.iss.server.service;

import sg.edu.nus.iss.server.dto.Purchase;
import sg.edu.nus.iss.server.dto.PurchaseResponse;

public interface CheckoutService {
    
    PurchaseResponse placeOrder(Purchase purchase);
}
