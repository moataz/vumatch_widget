/*
* VuMatch Widget v0.5
* http://www.vufind.com/
* 
* TERMS OF USE - vumatch
* 
* Copyright 2014 VuFind Inc.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


// VuMatch REST API call and filling visually products into the widget.
vuMatch = function(image_url, category){

            var vuMatchRequest = $.ajax({

                type: 'POST'
                ,url: 'http://node7.vumatch.com:8082/api/vumatch' //VuMatch API Server Address
                ,data: {

                    cat : category, // (REQUIRED) Product category to pull recommendations from [wshoes | dress]
                    customer_id: [YOUR_CUSTOMER_ID]
                    app_key : [YOUR_API_KEY]
                    token : [YOUR_API_TOKEN]
                    productURL: image_url // (REQUIRED) Product image URL to pull visual recommendations

                }

                ,dataType: 'json'
            });


            // In case the REST call fails, you may fill random images in the widget too.
            vuMatchRequest.fail(function(xhr, textStatus){
                return false;
            });
          
            // This fills in the product image and information into the widget. \
            // The API just returns the product image so you will need to pull additional product information \
            // from your data source and will it in the product_details JSON object array.
            vuMatchRequest.success(function(recommendations) {

                // Once the response is received, details of each of the recommended product would need \
                // to be fetched and filled into the product_details JSON array. If only product images \
                // need to be shown and no details (title, short description and price) then you can fill \
                // the product array with empty strings.
                var product_details = [
                                        {title: 'Product ONE', desc: 'FIRST product description', price: '$199', link: 'http://abc.com/a.html'},
                                        {title: 'Product TWO', desc: 'SECOND product description', price: '$299', link: 'http://abc.com/a.html'},
                                        {title: 'Product THREE', desc: 'THIRD product description', price: '$399', link: 'http://abc.com/a.html'},
                                        {title: 'Product FOUR', desc: 'FOURTH product description', price: '$499', link: 'http://abc.com/a.html'},
                                        {title: 'Product FIVE', desc: 'FIFTH product description', price: '$599', link: 'http://abc.com/a.html'},
                                        {title: 'Product SIX', desc: 'SIXTH product description', price: '$699', link: 'http://abc.com/a.html'},
                                        {title: 'Product SEVEN', desc: 'SEVENTH product description', price: '$799', link: 'http://abc.com/a.html'},
                                    ];

                var recommendationsJSON = JSON.parse(recommendations);

                for(var i=1, j=0; i<=recommendationsJSON.length, j<recommendationsJSON.length; i++, j++){

                    document.getElementById("result"+i).src = recommendationsJSON.recommendations[j].imageURL;
                    
                    // Fill product information
                    var product_url = "<a href='"+product_details[j].link+"'>";
                    document.getElementById("recommendation"+i).children[1].innerHTML = product_url+product_details[j].title+'</a>';
                    document.getElementById("recommendation"+i).children[2].innerHTML = product_url+product_details[j].desc+'</a>';
                    document.getElementById("recommendation"+i).children[3].innerHTML = product_url+product_details[j].price+'</a>';
                }


                return true;
            });
    }

// This function initializes the vumatch widget's carousel. You may change the configuration e.g width/height \
// number of products to display etc.
vumatch_init = function (containerId) {
            var options = {
                $AutoPlay: true,                                  
                $AutoPlaySteps: 1,
                $AutoPlayInterval: 4000,
                $PauseOnHover: 1,
                $ArrowKeyNavigation: true,
                $MinDragOffsetToSlide: 20,    
                $SlideDuration: 160,               
                $SlideWidth: 120,
                $SlideSpacing: 5,   
                $ParkingPosition: 0, 
                $DisplayPieces: 3,
                $FillMode: 2,
                
                $ArrowNavigatorOptions: {
                    $Class: $JssorArrowNavigator$,             
                    $ChanceToShow: 1,  
                    $AutoCenter: 2,
                    $Steps: 1
                }
            };

            var jssor_slider1 = new $JssorSlider$(containerId, options);

            if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
                $JssorUtils$.$OnWindowResize(window, ScaleSlider);
            }
        };
