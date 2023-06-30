package sg.edu.nus.iss.server.config;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import sg.edu.nus.iss.server.model.Product;
import sg.edu.nus.iss.server.model.ProductCategory;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer{

    private EntityManager entityManager; 

    @Autowired
    public DataRestConfiguration(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors){

        //array to disable HTTP methods 
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE}; 

        //disable HTTP methods for Product: PUT, POST, DELETE
        config.getExposureConfiguration()
            //block ONLY PRODUCT
            .forDomainType(Product.class)
            .withItemExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions))
            .withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions));

        //disable HTTP methods for Product Category: PUT, POST, DELETE
        config.getExposureConfiguration()
            //block ONLY PRODUCT
            .forDomainType(ProductCategory.class)
            .withItemExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions))
            .withCollectionExposure((metdata, HttpMethods) -> HttpMethods.disable(theUnsupportedActions));

        //call internal helper to expose ids
        exposeIds(config);

    }

    private void exposeIds(RepositoryRestConfiguration config){
        //expose enity ids

        //get list of all entity classes from manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities(); 

        // //create list of entity types
        // List<Class> entityClasses = new ArrayList<>(); 

        // for (EntityType tempEntityType: entities){
        //     entityClasses.add(tempEntityType.getJavaType());
        // }

        // //expose entity ids for array of entity/domain types
        // Class[] domainTypes = entityClasses.toArray(new Class[0]);

        Class<?>[] domainTypes = entities.stream()
                .map(EntityType::getJavaType)
                .toArray(Class[]::new);


        config.exposeIdsFor(domainTypes); 

    }
    
}


