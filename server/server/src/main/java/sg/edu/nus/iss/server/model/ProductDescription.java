package sg.edu.nus.iss.server.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="product_details")
public class ProductDescription {

    @Id
    @Column(name = "id", nullable = false)
    private Long id; 

    // @Column(name = "product_id", nullable = false)
    // private Long productId;
    
    //ProductDescription has a one to one relationship with Product table. One Product to One Description
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "description")
    private String description;

    @Column(name = "rating_value")
    private BigDecimal ratingValue; 

    @Column(name = "rating_count")
    private Long ratingCount;
    
    @Column(name = "review_count")
    private Long reviewCount;

    @Column(name = "best_rating")
    private BigDecimal bestRating; 

    @Column(name = "worst_rating")
    private BigDecimal worstRating; 

    @Column(name = "ingredients")
    private String ingredients;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getRatingValue() {
        return ratingValue;
    }

    public void setRatingValue(BigDecimal ratingValue) {
        this.ratingValue = ratingValue;
    }

    public Long getRatingCount() {
        return ratingCount;
    }

    public void setRatingCount(Long ratingCount) {
        this.ratingCount = ratingCount;
    }

    public Long getReviewCount() {
        return reviewCount;
    }

    public void setReview_Cunt(Long reviewCount) {
        this.reviewCount = reviewCount;
    }

    public BigDecimal getBestRating() {
        return bestRating;
    }

    public void setBestRating(BigDecimal bestRating) {
        this.bestRating = bestRating;
    }

    public BigDecimal getWorstRating() {
        return worstRating;
    }

    public void setWorstRating(BigDecimal worstRating) {
        this.worstRating = worstRating;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    
    
}


