package sg.edu.nus.iss.server.service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import sg.edu.nus.iss.server.dto.Purchase;
import sg.edu.nus.iss.server.dto.PurchaseResponse;
import sg.edu.nus.iss.server.model.Customer;
import sg.edu.nus.iss.server.model.Order;
import sg.edu.nus.iss.server.model.OrderItem;
import sg.edu.nus.iss.server.repository.CustomerRepository;


@Service
public class CheckoutServiceImplementation implements CheckoutService{

    private CustomerRepository customerRepo; 

    @Autowired
    public CheckoutServiceImplementation(CustomerRepository customerRepo){
        this.customerRepo = customerRepo;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        //retrieve order info from dto
        Order order = purchase.getOrder();

        //generate tracking number
        String orderTrackingNumber = UUID.randomUUID().toString();
        order.setOrderTrackingNumber(orderTrackingNumber);
        
        //order with order Items
        Set<OrderItem> orderItems = purchase.getOrderItems();
        // orderItems.forEach(item -> order.add(item));
        if (orderItems == null) {
            orderItems = new HashSet<>();
        }
        order.getOrderItems().addAll(orderItems);

        //order with all addresses
        order.setBillingAddress(purchase.getBillingAddress());
      
        order.setShippingAddress(purchase.getShippingAddress());

        //cust with order
        Customer cust = purchase.getCustomer();

        // //get customer email
        String theEmail = cust.getEmail(); 

        // Customer customerFromDatabase = customerRepo.findByEmail(theEmail);

        // if (customerFromDatabase != null){
        //     cust = customerFromDatabase; 
        // }

        // Cust with order
        cust.add(order);

        //save to db
        customerRepo.save(cust);

        //return response of tracking number
        return new PurchaseResponse(orderTrackingNumber);
    }

    
    
}
