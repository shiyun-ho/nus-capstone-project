package sg.edu.nus.iss.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import com.okta.spring.boot.oauth.Okta;

@Configuration
public class SecurityConfiguration {
    @Bean
   protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      
      //protect endpoint /api/orders
      http.authorizeHttpRequests(requests ->
                  requests
                        .requestMatchers("/api/orders/**")
                        // .permitAll()
                        // .authenticated()
                        .anonymous()
                        .anyRequest().permitAll())
            .oauth2ResourceServer()
            .jwt();
 
      //add CORS filters
      http.cors();
      
      //add content negotiation strategy
      http.setSharedObject(ContentNegotiationStrategy.class, new
            HeaderContentNegotiationStrategy());
      
      //force a non-empty response body for 401 to let user know that the response is 401
      Okta.configureResourceServer401ResponseBody(http);
      
      // // disable CSRF since we are not using Cookies for session tracking
      http.csrf().disable();
      
      return http.build();
   }
 
    
}
