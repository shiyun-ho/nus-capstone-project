package sg.edu.nus.iss.server.model;

import java.io.Serializable;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "product_category")
public class ProductCategory implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    private Long id; 
    
    @Column(name = "category_name")
    private String categoryName; 

    @Column(name = "url")
    private String url; 

    @Column(name = "category_id", nullable = false)
    private Long categoryId;
    

    //one category to many products
        //any operation (CRUD) performed on category will affect Product table 
    // @OneToMany(cascade = CascadeType.ALL, mappedBy = "categoryId")
    @JsonManagedReference
    @OneToMany(targetEntity=Product.class, cascade = CascadeType.ALL, mappedBy = "category", fetch = FetchType.EAGER)
    //collection
    private Set<Product> products;

    // public void addProduct(Product product) {
    //     if (product != null) {
    //         if (products == null) {
    //             products = new HashSet<>();
    //         }
    //         products.add(product);
    //         product.setCategoryId(this);
    //     }
    // }


    //getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    // @JsonProperty("categoryId")
    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
    return "Category [categoryId]";
    }
    


}
