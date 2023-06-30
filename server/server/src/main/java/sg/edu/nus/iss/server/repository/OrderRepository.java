package sg.edu.nus.iss.server.repository;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import sg.edu.nus.iss.server.model.Order;

@RepositoryRestResource
// @CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin()
public interface OrderRepository extends JpaRepository<Order, Long>{
    
    Page<Order> findByCustomerEmail(@Param("email") String email, Pageable pageable); 
    
}
