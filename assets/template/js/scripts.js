/*closestchild*/
;(function($){
  $.fn.closestChild = function(selector) {
    let $children, $results;
    
    $children = this.children();
    
    if ($children.length === 0)
      return $();
  
    $results = $children.filter(selector);
    
    if ($results.length > 0)
      return $results;
    else
      return $children.closestChild(selector);
  };
})(window.jQuery);
/* /. closestchild*/


$(function(){     

        let top_show = 280, speed = 500, $backButton = $('#up');
        $(window).scroll(function () { 
            if ($(this).scrollTop() > top_show) {
                $backButton.addClass('active');
            }
            else {
                $backButton.removeClass('active');
            }
        });
        $backButton.click(function () { 
            scrollto(0, speed);
        });

        // scrollto
        window.scrollto = function(destination, speed) {
            if (typeof speed == 'undefined') {
                speed = 800;
            }
            jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination-60}, speed);
        };
        $("a.scrollto").click(function () {
            let elementClick = $(this).attr("href")
            let destination = $(elementClick).offset().top;
            scrollto(destination);
            return false;
        });
        // end scrollto  
        
        
        // CHANGING HEIGHT HEADER AT THE SCROLL
        
        var h_hght = 100;
        var h_mrg = 0;
        
        var elem = $('.header-top');
        var top = $(this).scrollTop();
         
        if(top > h_hght){
            elem.addClass('active');
        }           
         
        $(window).scroll(function(){
            top = $(this).scrollTop();
             
            if (top+h_mrg < h_hght) {
                elem.removeClass('active');
            } else {
                elem.addClass('active');
            }
        });
        
        // /. CHANGING HEIGHT HEADER AT THE SCROLL 


        // fancybox
        $('.fancybox').fancybox({
            padding: 0,
            helpers: {
            overlay: {
                    locked: false
                }
            },
            lang : 'ru',
            i18n : {
                'ru' : {
                    CLOSE : 'Закрыть',
                    NEXT: "Далее",
                    PREV: "Назад",
                    ERROR: "Запрошенные данные не могут быть загружены. <br/> Повторите попытку позже.",
                    PLAY_START: "Начать слайд-шоу",
                    PLAY_STOP: "Завершить слайд-шоу",
                    FULL_SCREEN: "На весь экран",
                    THUMBS: "Миниатюры",
                    DOWNLOAD: "Скачать",
                    SHARE: "Поделиться",
                    ZOOM: "Увеличить"
                }
            }
        });
        
        $('.fancyboxModal').fancybox({
            autoResize:true,            
            padding: 0,
            fitToView : false, 
            maxWidth: '100%',
            scrolling : "no",
            wrapCSS : 'fancybox-animate-wrap',
            touch: false,
            autoFocus: false,
            lang : 'ru',
            i18n : {
                'ru' : {
                    CLOSE : 'Закрыть',
                    NEXT: "Далее",
                    PREV: "Назад",
                }
            }
        });

        $('.fancyboxvideo').fancybox({
            padding: 0,
            width: '1300px',
            height: '',
            maxWidth: '100%',
            maxHeight: '100%',
            helpers: {
            overlay: {
                    locked: false
                }
            },
            lang : 'ru',
            i18n : {
                'ru' : {
                    CLOSE : 'Закрыть',
                    NEXT: "Далее",
                    PREV: "Назад",
                }
            }
        });
        // end fancybox
        
        
        
        // validation
        $('.rf').each(function(){
            let item = $(this),
            btn = item.find('.btn');
            
            function checkInput(){
                item.find('select.required').each(function(){
                    if($(this).val() == '0'){
                        $(this).parents('.form-group').addClass('error');
                        $(this).parents('.form-group').find('.error-message').show();
                    } else {
                        $(this).parents('.form-group').removeClass('error');
                    }
                });                
                
                item.find('input[type=text].required').each(function(){
                    if($(this).val() != ''){
                        $(this).removeClass('error');
                    } else {
                        $(this).addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                    }
                });

                item.find('input[type=tel].required').each(function(){
                    if($(this).val() != ''){
                        $(this).removeClass('error');
                    } else {
                        $(this).addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                    }
                });
                
                item.find('textarea.required').each(function(){
                    if($(this).val() != ''){
                        $(this).removeClass('error');
                    } else {
                        $(this).addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                    }
                });
                
                item.find('input[type=email]').each(function(){
                    let regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
                    let $this = $(this);
                    if($this.hasClass('required')){
                        if (regexp.test($this.val())) {
                            $this.removeClass('error');
                        } else {
                            $this.addClass('error');
                            $(this).parent('.form-group').find('.error-message').show();
                        }
                    } else{
                        if($this.val() != ''){
                            if (regexp.test($this.val())) {
                                $this.removeClass('error');
                            }else {
                                $this.addClass('error');
                                $(this).parent('.form-group').find('.error-message').show();
                            }
                        } else{
                            $this.removeClass('error');
                        }
                    }                    
                });                
                
                item.find('input[type=checkbox].required').each(function(){
                    if($(this).is(':checked')){
                        $(this).removeClass('error');
                    } else {
                        $(this).addClass('error');
                        $(this).parent('.form-group').find('.error-message').show();
                    }
                });
            }

            btn.click(function(){
                checkInput();
                let sizeEmpty = item.find('.error:visible').length;
                if(sizeEmpty > 0){
                    return false;
                } else {                    
                    item.submit();
                    $.fancybox.close();
                }
            });
        });
        
        $('select').change(function(){
            if($(this).val() == ''){     
                $(this).parents('.form-group').removeClass('selected');
            } else {
                $(this).parents('.form-group').addClass('selected');
                $(this).parents('.form-group').removeClass('error');
            }
        });
        // end validation       



        // Carousels
        $('.reviews-type1-carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 800,
            arrows: true,
            prevArrow: '#slick_prev1',
            nextArrow: '#slick_next1',
            dots: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                    },
                }
            ]
        });
        
        
        $('.page-gallery').slick({
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            infinite: true,
            asNavFor: '.page-gallery-thumbs-carousel',
            autoplaySpeed: 4000,
            speed: 500,
        });
           
        $('.page-gallery-thumbs-carousel').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.page-gallery',
            focusOnSelect: true,
            swipeToSlide: true,
            infinite: true,
            arrows: false,
            centerPadding: '0',
            responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false
            }
            }]
        });
        
        // End Carousels      
       

        // проверка на Internet Explorer 6-11
        let isIE = /*@cc_on!@*/false || !!document.documentMode;        
        if(isIE){
            $('body').addClass('ie');
        }
        // end


        



        let menuButton = $('.menu-button'), mobMenuWrap = $('.mobile-menu-wrapper');
        menuButton.click(function(){
            $('body').toggleClass('overflow_hidden');
            menuButton.toggleClass('active');
            mobMenuWrap.toggleClass('open');
        });
        $('.mobile-menu-wrapper, .menu-button').click(function(e){
            if ($(e.target).hasClass('fancyboxModal') == false) {
                e.stopPropagation();
            }
        });
        
        $('.swipe-area, .overlay').swipe({
            swipeStatus:function(event, phase, direction, distance, duration, fingers)
                {
                    if (phase=='move' && direction =='left') {
                        mobMenuWrap.addClass('open');
                        menuButton.addClass('active');
                        $('body').addClass('overflow_hidden');
                        return false;
                    }
                    if (phase=='move' && direction =='right') {
                        mobMenuWrap.removeClass('open');
                        menuButton.removeClass('active');
                        $('body').removeClass('overflow_hidden');
                        return false;
                    }
                }
        });
               
        $('body').click(function(){
            mobMenuWrap.removeClass('open');
            menuButton.removeClass('active');
            $('body').removeClass('overflow_hidden');
        });
        
        
        $('.mobile-menu ul > li').has('ul').addClass('down');
        $('.mobile-menu .down > ul').before('<span class="dropdown-button"></span>');

        
        $('.mobile-menu .dropdown-button').click(function(){
            $(this).toggleClass('active');
            if($(this).siblings('ul').is(':visible')){
                $(this).siblings('ul').slideUp();
            }else{
                $(this).siblings('ul').slideDown();
            }
            
        });


        if (window.devicePixelRatio > 1) {
            let lowresImages = $('img[data-retinasrc]'), thiswidth, thisheight;
            
            
            lowresImages.each(function(i) {
                thiswidth = $(this).width();
                thisheight = $(this).height();
                
                $(this).attr( 'width', thiswidth );
                $(this).attr( 'height', thisheight );
                
                let lowres = $(this).attr('src');
                let highres = $(this).data('retinasrc');
                $(this).attr('src', highres);
            });
            
        }   


        // accordeon
        let $thisElement,
            $thisElementContent,
            $elements,
            $elementsContent;

        $('.accordeon .item-head').click(function() {
            $thisElement = $(this).parent();
            $thisElementContent = $thisElement.find('.item-body');
            $elements = $thisElement.siblings();
            $elementsContent = $elements.find('.item-body');

            $elements.removeClass('active');
            $elementsContent.slideUp();
            if (!$thisElement.hasClass('active')) {
                $thisElement.addClass('active');
                $thisElementContent.slideDown();
            } else {
                $thisElement.removeClass('active');
                $thisElementContent.slideUp();
            }

        });
        // end accordeon  

        let btn_theme, btn_title;
        $('[data-theme]').click(function(){
            btn_theme = $(this).data('theme');
            btn_title = $(this).data('title');

            $('#themeinput').val(btn_theme);
            $('#feedback_title').text(btn_title);
        });



        // Anchor menu   
            
        let lastId,
        anchorMenu = $(".anchor-menu"),
        anchorMenuHeight = 100 /*$(".anchor-menu").outerHeight()+15*/,
        menuItems = anchorMenu.find('li > a[href^="#"]'),
        scrollItems = menuItems.map(function(){
            let item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

        menuItems.click(function(e){
            let href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-anchorMenuHeight+1;
            $('html, body').stop().animate({ 
                scrollTop: offsetTop 
            }, 500);

            mobMenuWrap.removeClass('open');
            menuButton.removeClass('active');
            $('body').removeClass('overflow_hidden');

            e.preventDefault();
        });
        
        function currentAnchorLink(){
            let fromTop = $(this).scrollTop()+anchorMenuHeight;
            let cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                return this;
            });
            cur = cur[cur.length-1];
            let id = cur && cur.length ? cur[0].id : "";
            if (lastId !== id) {
                lastId = id;
                anchorMenu.find('.active').removeClass("active");
                menuItems.parent().removeClass("active").end().filter('[href="#'+id+'"]').parent().addClass("active");
            }
        }
        currentAnchorLink();
        // Bind to scroll
        $(window).scroll(function(){
            currentAnchorLink();              
        });        
            
        // End anchor menu


}); // end ready