/*
* VuMatch Widget v1.1
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

var settings =  {
                    "customer_id" : [YOUR_CUSTOMER_ID],
                    "app_key": [YOUR_APP_KEY],
                    "token": [YOUR_API_TOKEN]
                };

// VuMatch REST API call and filling visually products into the widget.
vuMatch = function(image_url, category){

            var vuMatchRequest = $.ajax({

                type: 'POST'
                ,url: 'http://node7.vufind.com/api/vumatch' //VuMatch API Server Address
                ,data: {

                    cat : category, // (REQUIRED) Product category to pull recommendations from [wshoes | dress]
                    customer_id: settings.customer_id,
                    app_key : settings.app_key,
                    token : settings.token,
                    productURL: image_url // (REQUIRED) Product image URL to pull visual recommendations

                }

                ,dataType: 'json'
            });


            // In case the REST call fails, you may fill random images in the widget too.
            vuMatchRequest.fail(function(xhr, textStatus){
                alert("FALSE");
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
                                        {title: 'Product ONE', desc: 'FIRST product description', price: '$199', link: '#'},
                                        {title: 'Product TWO', desc: 'SECOND product description', price: '$299', link: '#'},
                                        {title: 'Product THREE', desc: 'THIRD product description', price: '$399', link: '#'},
                                        {title: 'Product FOUR', desc: 'FOURTH product description', price: '$499', link: '#'},
                                        {title: 'Product FIVE', desc: 'FIFTH product description', price: '$599', link: '#'},
                                        {title: 'Product SIX', desc: 'SIXTH product description', price: '$699', link: '#'},
                                        {title: 'Product SEVEN', desc: 'SEVENTH product description', price: '$799', link: '#'},
                                    ];

                var recommendationsJSON = JSON.parse(recommendations);

                for(var i=1, j=0; i<=recommendationsJSON.recommendations.length, j<recommendationsJSON.recommendations.length; i++, j++){

                    document.getElementById("result"+i).src = recommendationsJSON.recommendations[j].imageURL;
                    

                    // Fill product information
                    var product_url = "<a class='"+category+"' href='"+product_details[j].link+"'>";
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

function vumatchProduct(_c, _p){ $.ajax({ type: 'GET' ,url: 'http://node7.vufind.com/api/vumatch/product' ,async: false ,data: {c : _c, cid : settings.customer_id, u : _p, }});}
$(document).ready(function(){ $("#recommendation1").click(function(){vumatchProduct(document.getElementById("recommendation1").children[1].children[0].className, document.getElementById("recommendation1").children[1].children[0].href.toString());}); $("#recommendation2").click(function(){vumatchProduct(document.getElementById("recommendation2").children[1].children[0].className, document.getElementById("recommendation2").children[1].children[0].href.toString());});    $("#recommendation3").click(function(){vumatchProduct(document.getElementById("recommendation3").children[1].children[0].className, document.getElementById("recommendation3").children[1].children[0].href.toString());});    $("#recommendation4").click(function(){vumatchProduct(document.getElementById("recommendation4").children[1].children[0].className, document.getElementById("recommendation4").children[1].children[0].href.toString());});   $("#recommendation5").click(function(){vumatchProduct(document.getElementById("recommendation5").children[1].children[0].className, document.getElementById("recommendation5").children[1].children[0].href.toString());});    $("#recommendation6").click(function(){vumatchProduct(document.getElementById("recommendation6").children[1].children[0].className, document.getElementById("recommendation6").children[1].children[0].href.toString());});    $("#recommendation7").click(function(){vumatchProduct(document.getElementById("recommendation7").children[1].children[0].className, document.getElementById("recommendation7").children[1].children[0].href.toString());});});
