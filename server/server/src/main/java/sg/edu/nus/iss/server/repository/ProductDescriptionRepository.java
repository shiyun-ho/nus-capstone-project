package sg.edu.nus.iss.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import sg.edu.nus.iss.server.model.ProductDescription;

// @CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "productDescription", path="product-description")
//endpoint: http://localhost:8080/api/product-description
public interface ProductDescriptionRepository extends JpaRepository<ProductDescription, Long>{

    // Query method to retrieve description by ID
    // endpoint: /api/product-description/{id}
    Optional<ProductDescription> findById(@Param("id") Long id);
    
}
