package com.example.multiplesnakegame;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class MultipleSnakeGameApplication {
	@RestController
	@RequestMapping("/api")
	public class MyRestController {
		@RequestMapping("/")
		public ModelAndView welcome() {
			ModelAndView modelAndView = new ModelAndView();
			modelAndView.setViewName("index.html");
			return modelAndView;
		}

		// Handle HTTP GET request at /hello
		@GetMapping("/hello")
		public String hello() {
			return "Hello from the Java backend!";
		}

		@PostMapping("/data")
		public String receiveData(@RequestBody String data) {
			// Process your data here
			System.out.println("Response: "+ data);
			return "Received: " + data;
		}

		@PostMapping("/rooms")
		public String createRoom(@RequestBody String data) {
			// Process your data here
			System.out.println("Room name: "+ data);
			return data;
		}

		@PostMapping("/game")
		public String choseRoom(@RequestBody String data) {
			// Process your data here
			System.out.println("Chosen game name: "+ data);
			return data;
		}
	}

	public static void main(String[] args) {
		// handle HTTP GET request at /hello


		SpringApplication.run(MultipleSnakeGameApplication.class, args);
	}

}
