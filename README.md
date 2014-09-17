VuMatch Widget Documentation
==============

## Introduction
The VuMatch widget lets you embed AI powered visual product recommendations into your eCommerce web store. This document explains how you can set up the widget for your website.

![Example widget](http://i.imgur.com/Hpz3R1k.gif)

## File Structure

*    **css/vumatch-style.css**
This contains the styling of the widget. You may customize and add your skin too.

*    **img/**
This contains the image assets. You can change the default product image to show if a product image URL 404'd. Ideally, images should be resized to **120x159px**.

*    **js/jssor.core.js**
This widget makes use of the JSSOR slider for the product image thumbnail carousel. This script implements the core slider components, transitions etc. The configuration of the slider in in *js/vumatch.js*.

*    **vumatch-demo.html**
This page shows the VuMatch widget in action. On page load, a sample product image URL is passed to the **```vuMatch(...)```** function which makes a call to the VuMatch REST API and pulls 7 product images. These images are then populated into the widget. Placeholder product information (title, description & price) are filled in. You will need to pull in this information from your website DB and fill in the title, description and pricing information as well as the product page URL.

## VuMatch REST Call Config
The ```vuMatch(...)``` in ```js/vumatch.js``` makes the REST API call to VuMatch API. The required and optional config params are:

```javascript

type: 'POST',
url: 'http://54.161.162.216:8082/api/vumatch' //VuMatch API Server Address,
data: {
	cat : category, // [REQUIRED] Product category. Could be 'dress' (women dresses) or 'wshoes' (women shoes)
    customer_id: 'demo', // [REQUIRED] Customer ID. Put in your unique ID.
	app_key : 'dee1eb769deb1c7ed850fc2ab18c31e7', // [REQUIRED] Your VuMatch API key
	token : '3hbv1ionxeoyl9pzsy49e7bl5yh45i830nxuono4vzq309ii80whj9mu022rwge7', // [REQUIRED] Your VuMatch API token
	productURL: image_url // [REQUIRED] Product image URL to pull visual recommendations

```

## Populating Product Image & Info After REST Call
Once your product page loads, you'll need to make the call to ```vuMatch(...)``` with the product image URL and category (wshoes | dress) in order to pull in visually similar recommendations. Once the API sends back results (JSON response), it updates the product images in the widget:

```javascript

//The 'recommendations' are returned by the VuMatch API. This response is parsed into JSON and then populated into the widget.
var recommendationsJSON = JSON.parse(recommendations);

	// Loop over the recommendations. For demo, the API returns 7 similar products.
	for(var i=1, j=0; i<=recommendationsJSON.length, j<recommendationsJSON.length; i++, j++){

		//The widget has div elements named 'recommendation1' (and so on...) to hold product image & info. 
		document.getElementById("result"+i).src = recommendationsJSON.recommendations[j].imageURL;

			// Fill product information
            var product_url = "<a href='"+product_details[j].link+"'>";
            document.getElementById("recommendation"+i).children[1].innerHTML = product_url+product_details[j].title+'</a>';
            document.getElementById("recommendation"+i).children[2].innerHTML = product_url+product_details[j].desc+'</a>';
			document.getElementById("recommendation"+i).children[3].innerHTML = product_url+product_details[j].price+'</a>';
	}

```

## Filling Product Information
VuMatch API returns the image URLs of the visually similar products. You will have to pull in other information pieces about each of the recommended product: title, short description and price. Currently, there's a place holder for these product info pieces:

```javascript

var product_details = [

	{title: 'Product ONE', desc: 'FIRST product description', price: '$199', link: 'http://store.com/product_page.html'},
	{title: 'Product TWO', desc: 'SECOND product description', price: '$299', link: 'http://store.com/product_page.html'},
	{title: 'Product THREE', desc: 'THIRD product description', price: '$399', link: 'http://store.com/product_page.html'},
	{title: 'Product FOUR', desc: 'FOURTH product description', price: '$499', link: 'http://store.com/product_page.html'},
	{title: 'Product FIVE', desc: 'FIFTH product description', price: '$599', link: 'http://store.com/product_page.html'},
	{title: 'Product SIX', desc: 'SIXTH product description', price: '$699', link: 'http://store.com/product_page.html'},
	{title: 'Product SEVEN', desc: 'SEVENTH product description', price: '$799', link: 'http://store.com/product_page.html'}
	
];

```

One possible way is to trigger another call into your DB to pull product information based on either the product image URL or SKU which is returned for VuMatch professional users. This call should be triggered inside the ```vuMatchRequest.success(function(...){...})``` function.


## Getting Started
You can integrate VuMatch widget into your eCommerce store in less than 3 hours and add AI powered product recommendations.

[Contact Us](https://developers.vufind.com/signup.php "Contact Us")

