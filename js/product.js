
        $(document).ready(function(){

            $(".search-input").on("keyup", function() {
                var value = $(this).val().toLowerCase();

                $(".product-card").each(function() {
                    var productName = $(this).find(".p-name").text().toLowerCase();

                    if (productName.indexOf(value) > -1) {
                        $(this).fadeIn();
                    } else {
                        $(this).hide();   
                    }
                });
            });

            $(".product-card").each(function(index){
            $(this).attr("data-original-index", index);
             });

            $(".filter-trigger").click(function(){
                $(".sidebar-overlay").fadeIn(300);
                $(".filter-sidebar").css("right", "0");
            });

            $(".close-btn, .sidebar-overlay").click(function(){
                $(".filter-sidebar").css("right", "-100%");
                $(".sidebar-overlay").fadeOut(300);
            });

            $(".nav-item").click(function(){
                $(".nav-item").removeClass("active"); 
                $(this).addClass("active"); 
                var category = $(this).attr("data-filter");
                if(category == "all") {
                    $(".product-card").fadeIn(); 
                } else {
                    $(".product-card").hide();
                    $('.product-card[data-category="' + category + '"]').fadeIn(700);
                }
            });

            $(".filter-option:not(.sort-option)").click(function(){
                $(this).toggleClass("selected"); 
            });

            $(".sort-option").click(function(){
                if($(this).hasClass("selected")){
                    $(this).removeClass("selected");
                } else {
                    $(".sort-option").removeClass("selected");
                    $(this).addClass("selected");
                }
            });

            $("#btn-apply").click(function(){
                var selectedSizes = [];
                var selectedBrands = [];
                var selectedTypes = [];
                var selectedColors = [];

                $('.filter-option.selected[data-type="size"]').each(function(){
                    selectedSizes.push($(this).attr("data-value"));
                });

                $('.filter-option.selected[data-type="brand"]').each(function(){
                    selectedBrands.push($(this).attr("data-value")); 
                });

                $('.filter-option.selected[data-type="type"]').each(function(){
                    selectedTypes.push($(this).attr("data-value")); 
                });

                $('.filter-option.selected[data-type="color"]').each(function(){
                    selectedColors.push($(this).attr("data-value"));
                });

                $(".product-card").each(function(){
                    var product = $(this);
                    var pSize = product.attr("data-size");
                    var pBrand = product.attr("data-brand"); 
                    var pType = product.attr("data-type");
                    var pColor = product.attr("data-color");

                    var showSize = true;
                    var showBrand = true;
                    var showTypes = true;
                    var showColor = true;

                    if(selectedSizes.length > 0) {
                        if(!selectedSizes.includes(pSize)) { showSize = false; }
                    }

                    if(selectedBrands.length > 0) {
                        var isBrandFound = selectedBrands.some(b => b.toLowerCase() === pBrand.toLowerCase());
                        if(!isBrandFound) { showBrand = false; }
                    }

                    if(selectedTypes.length > 0) {
                        if(!selectedTypes.includes(pType)) { 
                            showTypes = false; 
                        }
                    }

                    if(selectedColors.length > 0) {
                        if(!selectedColors.includes(pColor)) { showColor = false; }
                    }
                    
                    if(showSize && showBrand && showTypes && showColor) {
                        product.fadeIn();
                    } else {
                        product.hide();
                    }
                });

                var sortMode = $('.sort-option.selected').attr('data-value'); 
                
                if(sortMode) {
                    var container = $('.product-grid');
                    var items = container.children('.product-card');


                    items.sort(function(a, b){
                        var priceA = parseInt($(a).attr('data-price'));
                        var priceB = parseInt($(b).attr('data-price'));

                        if(sortMode === 'asc') {
                            return priceA - priceB; 
                        } else {
                            return priceB - priceA; 
                        }
                    });

                    container.append(items);
                }


                $(".filter-sidebar").css("right", "-100%");
                $(".sidebar-overlay").fadeOut();
            });

            $(".act-btn:contains('Hoàn tác')").click(function(){
                $(".filter-option").removeClass("selected");
                $(".product-card").fadeIn();
            });
        });
