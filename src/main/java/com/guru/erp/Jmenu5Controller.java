package com.guru.erp;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class Jmenu5Controller {
	
	private static final Logger logger = LoggerFactory.getLogger(Jmenu5Controller.class);
	
	@RequestMapping(value = "/jmenu5", method = RequestMethod.GET)
	public String jmenu5(Locale locale, Model model) {
		logger.info("Welcome jmenu5! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "jmenu5";
	}
}