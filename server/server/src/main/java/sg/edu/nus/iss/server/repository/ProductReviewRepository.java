package sg.edu.nus.iss.server.repository;

import org.springframework.data.domain.Pageable;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import sg.edu.nus.iss.server.model.ProductDescription;
import sg.edu.nus.iss.server.model.ProductReview;

// @CrossOrigin(origins = "http://localhost:4200")
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "productReview", path="product-review")
public interface ProductReviewRepository extends JpaRepository<ProductReview, Long> {


    //endpoint: http://localhost:8080/api/product-review/search/findByProductId?productId=10
    @Query("SELECT pr FROM ProductReview pr WHERE pr.product.id = :productId")
    Page<ProductReview> findByProductId(@Param("productId") Long productId, Pageable pageable);

    // Page<ProductReview> findProductReviewByProductId(@Param("productId") Long productId, Pageable pageable);


    


}
