// package sg.edu.nus.iss.server.config;

// import org.springframework.beans.factory.annotation.Autowired;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.data.repository.support.Repositories;
// import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
// import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
// import org.springframework.web.servlet.config.annotation.CorsRegistry;



// //Configuration to expose @Id annotations
// @Configuration
// public class RepositoryConfiguration implements RepositoryRestConfigurer{
//     // @Bean
//     // public RepositoryRestConfigurer repositoryRestConfigurer() {
//     //     return RepositoryRestConfigurer.withConfig(repositoryRestConfiguration ->
//     //         repositoryRestConfiguration.exposeIdsFor(Product.class)
//     //     );
//     // }

//     @Autowired
//     private Repositories repositories;

//     @Override
//     public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
//         this.repositories.iterator().forEachRemaining(r -> {
//             config.exposeIdsFor(r);
//         });
//     }
    
// }
