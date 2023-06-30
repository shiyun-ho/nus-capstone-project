package sg.edu.nus.iss.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import sg.edu.nus.iss.server.model.ProductCategory;

// @CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
//expose repo as REST resource and allow us to interact without HTTP methods
    //collection resource is from productCategory
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{
    
}
