package com.example.multiplesnakegame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import static com.example.multiplesnakegame.GreetingController.template;


@SpringBootApplication
public class MultipleSnakeGameApplication {

	@RestController
	public class MyRestController {
		@RequestMapping("/")
		public ModelAndView welcome() {
			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("index.html");
			return modelAndView;
		}
	}


	public static void main(String[] args) {
		// handle HTTP GET request at /hello


		SpringApplication.run(MultipleSnakeGameApplication.class, args);
	}

}
