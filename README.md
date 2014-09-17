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
This page shows the VuMatch widget in action. On page load, a sample product image URL is passed to the ```js vuMatch(...)``` function which makes a call to the VuMatch REST API and pulls 7 product images. These images are then populated into the widget. Placeholder product information (title, description & price) are filled in. You will need to pull in this information from your website DB and fill in the title, description and pricing information as well as the product page URL.

## VuMatch REST API Call


