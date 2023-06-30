package sg.edu.nus.iss.server.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="products")
public class Product implements Serializable{

    @Id
    @Column(name = "id", nullable = false)
    private Long id; 
    
    @Column(name = "product_id", nullable = false)
    private Long productId;
    
    @Column(name = "sku")
    private String sku; 

    @Column(name= "product_type")
    private String productType; 

    @Column(name = "name")
    private String name; 

    @Column(name = "unit_price")
    private BigDecimal unitPrice; 

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "product_url")
    private String productUrl;

    @Column(name = "brand")
    private String brand; 

    @Column(name = "current_category")
    private String currentCategory; 

    @Column(name = "category_name")
    private String categoryName; 

    
    @JsonBackReference
    //Product table has many to one relationship to ProductCategory: Many products to One category
    @ManyToOne(fetch = FetchType.EAGER)
    //foreign key is category_id
    @JoinColumn(name="category_id", referencedColumnName="id", nullable= false)
    private ProductCategory category;
    // private ProductCategory category;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private ProductDescription description;

    @JsonBackReference
    @OneToMany(targetEntity=ProductReview.class, cascade = CascadeType.ALL, mappedBy = "product", fetch = FetchType.EAGER)
    private List<ProductReview> reviews = new ArrayList<>();

    //getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getProductUrl() {
        return productUrl;
    }

    public void setProductUrl(String productUrl) {
        this.productUrl = productUrl;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCurrentCategory() {
        return currentCategory;
    }

    public void setCurrentCategory(String currentCategory) {
        this.currentCategory = currentCategory;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public ProductCategory getCategory() {
        return category;
    }

    public void setCategory(ProductCategory category) {
        this.category = category;
    }

    public List<ProductReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<ProductReview> reviews) {
        this.reviews = reviews;
    }

    public void addReview(ProductReview review) {
        reviews.add(review);
        review.setProduct(this);
    }

    public void removeReview(ProductReview review) {
        reviews.remove(review);
        review.setProduct(null);
    }

    

    @Override
    public String toString() {
    return "Product Category Id: [categoryId]";
    }

    public ProductDescription getDescription() {
        return description;
    }

    public void setDescription(ProductDescription description) {
        this.description = description;
    }

    


    // public ProductCategory getCategory() {
    //     return category;
    // }

    // public void setCategoryId(ProductCategory categoryId) {
    //     this.category = category;
    // }
    
    
}
