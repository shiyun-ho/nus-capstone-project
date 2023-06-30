package sg.edu.nus.iss.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sg.edu.nus.iss.server.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail);
    
}
