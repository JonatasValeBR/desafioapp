package com.jonatasvale.desafioapp.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;

@Configuration
public class SwaggerConfig {

	private static final String GROUP = "backend-api";
	private static final String SCHEME_KEY = "OAuth2";

	
	@Bean
	public GroupedOpenApi groupOpenApi() {
		return GroupedOpenApi.builder().group(GROUP).pathsToMatch("/**").build();
	}

	@Bean
	public OpenAPI springOpenApi() {
		return new OpenAPI().info(apiInfo()).addSecurityItem(new SecurityRequirement().addList(SCHEME_KEY, "global"));
	}

	private Info apiInfo() {
		return new Info().title("Backend Spring -Desafio App").description("Rotas do backend utilizadas").version("v1")
				.license(new License().name("Apache 2.0").url("http://springdoc.org"))
				.contact(new Contact().name("Jonatas Vale").url("https://github.com/jonatasvalebr")
						.email("jonatasvalebr@gmail.com"));
	}

}