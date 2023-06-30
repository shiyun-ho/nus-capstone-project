package sg.edu.nus.iss.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import sg.edu.nus.iss.server.model.Product;

// @CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // //query method to match by category id
    //     //SELECT * FROM product WHERE id= ?
    //     //endpoint: /api/products/search/findByCategoryId?id=2
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    //Query method for search bar
        //SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%')
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable); 

    

}
