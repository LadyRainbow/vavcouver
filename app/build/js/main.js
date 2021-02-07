$ = jQuery.noConflict(true);
$(document).ready(function () {
    var $window = $(window);
    var windowHeight = $window.height();
    var windowWidth = $window.width();
    var $header = $('header');

    var $popUpGeneralBlock = $('.pop-up-general-block');

    var $overlayPopUpWRP = $('.pop-up-overlay-wrapper');
    var $overlay = $('.overlay-pop-up');
    var $closePopUpBtn = $('.pop-up-general-block-close-btn');

    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    let vhMenu = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vhMenu', `${vhMenu}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vhMenu = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vhMenu', `${vhMenu}px`);
    });


    // soft scroll
    $(".scrollTo").on("click", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        var id  = $(this).attr('href');
        var top = $(id).offset().top;
        // анимируем переход к блоку, время: 500 мс
        $('body,html').animate({scrollTop: top}, 500);
        // находим высоту, на которой расположен блок
    });


    // scroll header
    $(window).scroll(function() {
        headerChange();
    });

    function headerChange () {
        if($window.scrollTop() > 200) {
            $header.addClass('header-scroll');
        } else {
            $header.removeClass('header-scroll');
        }
    };

    // open/close search
    $('.search-btn').click(function () {
        $(this).parent().addClass('open');
    });

    $(document).mouseup(function (e){ // событие клика по веб-документу
		var div = $(".input-search-wrp"); // тут указываем ID элемента
		if (!div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0) { // и не по его дочерним элементам
			div.removeClass('open');
            div.removeClass('open-result');
            $('.search-input-result').removeClass('search-input-result-show');  // скрываем его
		}
	});
    $('.search-input-close').click(function () {
        $(".input-search-wrp").removeClass('open');
        $('.input-search-wrp').removeClass('open-result');
        $('.search-input-result').removeClass('search-input-result-show');
    });

    $('.search-input').focus(function () {
        $('.input-search-wrp').addClass('open-result');
        $('.search-input-result').addClass('search-input-result-show');
    });
    // open/close search END

    // open/close search mob
    $('.search-input-mob').focus(function () {
        $('.search-input-result-mob').addClass('search-input-result-show');
    });
    $('.search-mob').click(function () {
        $('.search').fadeIn();
    });
    $('.btn-mob-search-close').click(function () {
        $('.search').fadeOut();
        $('.search-input-result-mob').removeClass('search-input-result-show');
    });
    // open/close search mob END

    // lang togle
    $('.lang-toggle').click(function () {
        $(this).toggleClass('ru');
    });

    // tabs
    $('.small-tabs li').click(function () {
        $('.small-tabs li').removeClass('active');
        $(this).addClass('active');
        var lkId = $(this).attr('data-tab');
        $('.more-read-news-blocks').removeClass('active');
        $('#' + lkId + '').addClass('active');
    });
    $('.small-tabs1 li').click(function () {
        $('.small-tabs1 li').removeClass('active');
        $(this).addClass('active');
        var lkId = $(this).attr('data-tab');
        $('.more-read-news-blocks1').removeClass('active');
        $('#' + lkId + '').addClass('active');
    });
    $('.hot-tab li').click(function () {
        $('.hot-tab li').removeClass('active');
        $(this).addClass('active');
        var lkId = $(this).attr('data-tab');
        $('.hot-body').removeClass('active');
        $('#' + lkId + '').addClass('active');
    });

    // hot news page news
    $('.hot-tabs li').click(function () {
        $('.hot-tabs li').removeClass('active');
        $(this).addClass('active');
        var lkId = $(this).attr('data-hot');
        $('.hot-switch').removeClass('active');
        $('.hot-switch[data-hot="'+ lkId + '"]').addClass('active');
    });

    // Collapse
    $('.collaps-top').on('click', function () {
        if ($(this).closest('.collaps-card').hasClass('active')) {
            $('.collaps-body').slideUp();
            $('.collaps-card').removeClass('active');
        } else {
          $('.collaps-body').slideUp();
          $('.collaps-card').removeClass('active');
          $(this).closest('.collaps-card').find('.collaps-body').slideDown();
          $(this).closest('.collaps-card').addClass('active');
        };
    });

    // slider
    $('.banner-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 2,
        prevArrow: $('.prev-bunner-arrow'),
        nextArrow: $('.next-bunner-arrow'),
        dots: true,
        appendDots: '.main-dots-wrp',
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
        ]
    });

    $('.slider-busi-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('.prev-busi-arrow'),
        nextArrow: $('.next-busi-arrow'),
        fade: true,
        asNavFor: '.slider-busi-nav'
    });
    $('.slider-busi-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-busi-for',
        dots: false,
        focusOnSelect: true,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                  arrows: false,
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
        ]
    });

    if(windowWidth > 1365) {
        $('.slider-busi-nav .slick-track').addClass('none');
    };

    var countSearch = 0;
    $('.search-tab span').each(function () {
        countSearch += parseInt($(this).html(), 10);
        $('.total-search').text(countSearch/2);
    });
    $('.search-tab').click(function (e) {
        e.preventDefault();
        $('.search-tab').removeClass('active');
        $(this).addClass('active');
        var lkId = $(this).attr('data-hot');
        $('.result-block').removeClass('active');
        $('#'+ lkId + '').addClass('active');
    });

    $('.section-polls-answer').each(function (i) {
        $(this).find('.radio-polls-input-js').attr('name', 'polls'+ i);
        $(this).find('.radio-polls-input-js').eq(0).prop('checked', true);
        $(this).find('.radio-polls-input-js').eq(0).addClass('checked');
    });

    $('.block-poll-js').each(function (i) {
        $(this).find('.radio-polls-input-js').each(function (a) {
            $(this).attr('value', 'polls'+ i + a)
        });
        $(this).find('.poll-result').each(function (a) {
            $(this).attr('data-value', 'polls'+ i + a)
        });
    });

    // voting
    $('.vote-btn-start').each(function () {

        var  countClicks = 0;
        $(this).on("click", function(e){
            e.preventDefault();
            var voteValue = $(this).closest('.block-poll-js').find('.radio-polls-input-js:checked').val();
            countClicks += 1;
            $(this).closest('.block-poll-js').find('.poll-final span').text(countClicks);
            var countAnswers = $(this).closest('.block-poll-js').find('.poll-result').length;
            var yourAnswer = $(this).closest('.block-poll-js').find('.poll-result[data-value="' + voteValue + '"]');
            yourAnswer.find('.poll-result-line').css('width', '100%');
            yourAnswer.find('.poll-result-percent').text('100%');
            yourAnswer.find('.poll-result-count').text(countClicks);

            yourAnswer.addClass('answered');
            $(this).closest('.block-poll-js').find('.poll-questions').addClass('hidden');
            $(this).closest('.block-poll-js').find('.poll-results').removeClass('hidden');
        });
    })

    $('.radio-polls-input').change(function () {
        $('.radio-polls-input').removeClass('checked');
    })

   // form checked
    $('.checkbox-check').change(function() {
      if(this.checked) {
          $(this).closest('form').find('.btn-checkbox').removeClass('btn-checkbox-disabled');
      }
      else {
          $(this).closest('form').find('.btn-checkbox').addClass('btn-checkbox-disabled');
      }
    });
    $('.checkbox-check-data').change(function() {
      if(this.checked) {
          $('.data-end').removeClass('btn-checkbox-disabled');
      }
      else {
          $('.data-end').addClass('btn-checkbox-disabled');
      }
    });



    $('.datetimepicker1').datetimepicker({
        locale: 'ru',
        format: 'DD/MM/YYYY'
    });

    // go back
    $('.back-arrow').click(function(){
        window.history.back();
    });

    // close klyon btn
    $('.close-klyon').click(function(){
        $('.fly-btn-sticky').addClass('hidden');
    });

    // menu
    $('.burger-menu').click(function () {
        var $burger = $(this);
        $('body').toggleClass('active');
        if(windowWidth < 768) {
            $burger.toggleClass('active');
            $('.menu').toggleClass('active');
        } else {
            if($burger.hasClass('active')) {
                $('header').removeClass('header-scroll');
                $('.menu-desctop').removeClass('active');
                $burger.removeClass('active');
                $('.menu-column2').removeClass('active');
                $('.menu-column3').removeClass('active');
                $('.menu-column2-sub').removeClass('active');
                $('.menu-column2-sub .parent-link a').removeClass('active');
            } else {
                $burger.addClass('active');
                $('header').addClass('header-scroll');
                $('.menu-desctop').addClass('active');
            }
        };
    });
    // hover
    $('.menu-desctop-list .parent-link').mouseenter(function () {
        $('.menu-desctop-list .parent-link a').removeClass('active');
        $(this).find('a').addClass('active');
        var index = $(this).attr('data-parent');
        if(index == 'none') {
            $('.menu-column2-sub').removeClass('active');
            $('.menu-column2').removeClass('active');
            $('.menu-column3').removeClass('active');
            $('.menu-column2-sub .parent-link a').removeClass('active');
        } else {
            $('.menu-column2-sub').removeClass('active');
            $('.menu-column2').addClass('active');
            $('.menu-column2-sub[data-parent=' + index + ']').addClass('active');
        }
    });
    $('.menu-column2-sub .parent-link').mouseenter(function () {
        $('.menu-column2-sub .parent-link a').removeClass('active');
        $(this).find('a').addClass('active');
        var index = $(this).attr('data-parent');
        if(index == 'none') {
            $('.menu-column3-sub').removeClass('active');
            $('.menu-column3').removeClass('active');
        } else {
            $('.menu-column3-sub').removeClass('active');
            $('.menu-column3').addClass('active');
            $('.menu-column3-sub[data-parent=' + index + ']').addClass('active');
        }
    });


    // only number
    $(".input-number").keypress(function(event){
      event = event || window.event;
      if (event.charCode && event.charCode!=0 && event.charCode!=8 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) )
        return false;
    });

    // pagination
    if($('.news-page').length) {
        $('.pagination-container').pagination({
            dataSource: [1, 2, 3, 4],
            pageSize: 1,
            showPrevious: true,
            showNext: true,
            showNavigator: true,
            formatNavigator: '<p class="number-pages">Страница <span class="current-page"><%= currentPage %></span> из <span class="total-page"><%= totalPage %></span></p>',
            callback: function(data, pagination) {
                $('.J-paginationjs-page:nth-last-child(2) a').text('Последняя');
           }
        });
    };

    $('.link-to-article li').click(function (e) {
        e.preventDefault();
        $('.link-to-article li').removeClass('active');
        $(this).addClass('active');
        var lkId = $(this).attr('data-hot');
        $('.hotlink-switch').removeClass('active');
        $('.hotlink-switch[data-hot="'+ lkId + '"]').addClass('active');
        if($('.news-page').length) {
            $('.hot-switch').removeClass('active');
            $('.hot-switch[data-hot="'+ lkId + '"]').addClass('active');
        }
    });
    $('.open-cat-btn').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#cat').addClass('active');
        if($('.vacancy-page').length) {
            var lkId = $(this).attr('data-hot');
            $('.hotlink-switch').removeClass('active');
            $('.hotlink-switch[data-hot="'+ lkId + '"]').addClass('active');
        }
    });
    $('.hotlink-switch a').click(function (e) {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
        var title = $(this).text();
        $('.open-cat-btn p').text(title);
        $('.open-cat-btn').addClass('active');
    });

    // rating stars
    var countClick = 0;
    $('.star-rate').click(function () {
        $('.star-rate').addClass('active');
        $('.stars-rate').addClass('active');
        $('.yet-rated').addClass('active');
        $('.not-rated').addClass('hidden');
        var rateSingle = $(this).attr('data-rate');
        countClick = countClick + 1;
    });

    // rating smiles
    var countClickSmilesGeneral = 0;
    $('.smiles-block').click(function () {
        $('.yet-rated-smiles').addClass('active');
        $('.not-rated-smiles').addClass('hidden');
        countClickSmilesGeneral = countClickSmilesGeneral + 1;
        $('.count-rating-smiles').text(countClickSmilesGeneral);
        var countClickSmiles = Number($(this).closest('.smiles-block-wrp').find('.vote').text()) + 1;
        $(this).closest('.smiles-block-wrp').find('.vote').text(countClickSmiles);
        $('.vote').addClass('active');
    });

    $('.show-comment-btn').click(function () {
        $('.comment-pole-wrp').addClass('active');
        $('.comment-pole-wrp textarea').focus();
        $(this).addClass('hidden');
    });
    $('.vac-cube').click(function () {
        $('.vac-cube').removeClass('active');
        $(this).addClass('active');
    });
    $('.comment-hidden-btn').click(function () {
        $('.comment-pole-wrp').removeClass('active');
        $('.show-comment-btn').removeClass('hidden');
    });
    // masked
    $('.mask-phone').mask('+999999?9999999999', {placeholder: ""});
    // when getting focus
        $('.hour').focus(function () {
            $(this).attr('type', 'time');
        });

        // when losing focus
        $('.hour').focusout(function () {
            $(this).attr('type', 'text');
        });

    // drag & drop
    var $fileInput = $('.file-input');

    // highlight drag area
    $fileInput.on('dragenter focus click', function() {
      $(this).closest('.file-drop-area').addClass('is-active');
    });

    // back to normal state
    $fileInput.on('dragleave blur drop', function() {
      $(this).closest('.file-drop-area').removeClass('is-active');
    });

    // change inner text
    $fileInput.on('change', function() {
        var thisInput = $(this);
      var filesCount = $(this)[0].files.length;
      var filesSize = this.files[0].size;
      var filesSizeKb;
      var $textContainer = thisInput.closest('.file-drop-area').find('.file-msg');

    if (filesCount > 0)  {
        if (filesSize > 1048576) {
            thisInput.closest('.file-drop-area').find('.drop-success').addClass('hidden');
            thisInput.closest('.file-drop-area').find('.drop-error').removeClass('hidden');
            thisInput.val('');
        } else {
            thisInput.closest('.file-drop-area').addClass('active');

            thisInput.closest('.file-drop-area').find('.drop-success').removeClass('hidden');
            thisInput.closest('.file-drop-area').find('.drop-error').addClass('hidden');

            thisInput.closest('.file-drop-area').find('.remove').addClass('active');
            thisInput.closest('.file-drop-area').find('.fake-btn').addClass('hidden');

            filesSizeKb = filesSize / 1024;
            thisInput.closest('.file-drop-area').find('.file-size').addClass('active').text(filesSizeKb.toFixed() + ' Кб');;

            if (filesCount === 1) {
            // if single file is selected, show file name
                var fileName = $(this).val().split('\\').pop();
                $textContainer.addClass('active').text(fileName);
            } else {
                // otherwise show number of files
                $textContainer.text('Выбрано файлов: ' + filesCount);
            }
        }
      }
    });
    $('.remove').click(function () {
        $(this).closest('.file-drop-area').removeClass('active');
        $(this).removeClass('active');
        $(this).closest('.file-drop-area').find('.file-size').removeClass('active').text('');
        $(this).closest('.file-drop-area').find('.file-input').val('');
        $(this).closest('.file-drop-area').find('.file-msg').removeClass('active').text('или перетяните сюда');
        $(this).closest('.file-drop-area').find('.fake-btn').removeClass('hidden');
    });

    // vacancy text
    var textBig = $('.announcment-block-super .announcment-text').text().length;
    var textSmall = $('.announcment-block-small-text .announcment-text').text().length;
    // console.log(textBig + ' - ' + textSmall);

    $('.announcment-block-big-text .announcment-text').each(function(i) {
        var text = $(this).text();
        if ($(this).closest('.announcment-block-big-text').hasClass('bus')) {
            if ($(this).width() > 470) {
                if (text.length > 355) {
                    text = text.substr(0,352) + '...';
                    $(this).text(text);
                }
            } else {
                if (text.length > 235) {
                    text = text.substr(0,235) + '...';
                    $(this).text(text);
                }
            }
        }
        else {
            if ($(this).width() > 600) {
                if (text.length > 355) {
                    text = text.substr(0,352) + '...';
                    $(this).text(text);
                }
            } else {
                if (text.length > 288) {
                    text = text.substr(0,285) + '...';
                    $(this).text(text);
                }
            }
        }
    });
    $('.announcment-block-small-text .announcment-text').each(function(i) {
        var text = $(this).text();
        if ($(this).closest('.announcment-block-small-text').hasClass('bus')) {
            if ($(this).width() > 473) {
                if (text.length > 177) {
                    text = text.substr(0,177) + '...';
                    $(this).text(text);
                }
            } else {
                if (text.length > 117) {
                    text = text.substr(0,117) + '...';
                    $(this).text(text);
                }
            }
        }
        else {
            if ($(this).width() > 600) {
                if (text.length > 176) {
                    text = text.substr(0,176) + '...';
                    $(this).text(text);
                }
            } else {
                if (text.length > 144) {
                    text = text.substr(0,144) + '...';
                    $(this).text(text);
                }
            }
        }
    });

    $('.custom-select-list li').click(function () {
        $(this).closest('.custom-select-wrapper').find('.custom-select-head').removeClass('placeholder')
    });

    $('.select-parent li').click(function () {
        var subCatSelect = $(this).attr('data-cat');
        $('.subCatSelect').removeClass('active');
        $('.subCatSelect[data-cat="'+ subCatSelect + '"]').addClass('active');
    });

    // Функция подсчета количества символов - START
    limitChars('#limitInput', 70, '.count-symbols-input span');
    limitChars('#limitTextarea', 500, '.count-symbols-textarea span');
    limitChars('#limitTextarea2', 200, '.count-symbols-textarea span');
    limitChars('#limitTextareaBus', 1000, '.count-symbols-textarea span');
    limitChars('#limitTextareaAfisha', 1500, '.count-symbols-textarea span');
    limitChars('#limitInputTopic', 40, '.count-symbols-input2 span');
    limitChars('#limitTextareaLk', 250, '.count-symbols-textarea span');
    limitChars('#limitInputSigna', 50, '.count-symbols-input span');

    function limitChars(myObject, max, leftChars){
        $(myObject).keyup(function(){
            var count = $(this).val().length; // кол-во уже введенных символов
            var num = max - count; // кол-во символов, которое еще можно ввести

            if(num > 0){
                // если не достигнут лимит символов
                $(leftChars).text(num);
            } else {
                // если достигнут лимит символов
                $(leftChars).text('0');
                this.value = this.value.substr(0, max);
            }
        });
    }
    // Функция подсчета количества символов - END

    // vacancy full paid
    function vacFull (myObject, max) {
        var vacPaidText = $(myObject).text();
        vacPaidText = vacPaidText.substr(0, max);
        $(myObject).text(vacPaidText);
    };
    vacFull ('.vacancyPaid-text-count', 500);
    vacFull ('.vacancyFree-text-count', 200);
    // vacFull ('.businessPaid-text-count', 1000);

    $('.show-pass').click(function(){
        var $thisField = $(this).siblings($('.comment-input'));
        var type = $thisField.attr('type') == "text" ? "password" : 'text';
        $(this).toggleClass('open-eye');
        $thisField.attr('type', type);
    });

    // drag & grab images
    $('.input-images-busPaid').imageUploader({
        extensions: ['.jpg','.jpeg','.png'],
        mimes: ['image/jpeg','image/png','image/jpg'],
        maxFiles: 5,
        maxSize: 1 * 1024 * 1024,
    });
    $('.uploaded').sortable();


    $('.input-images-lk').imageUploader({
        preloaded: [{id: 1, src:'../../build/img/ava-lk.jpg'}],
        extensions: ['.jpg','.jpeg','.png'],
        mimes: ['image/jpeg','image/png','image/jpg'],
        maxFiles: 1,
        maxSize: 1 * 1024 * 1024,
    });

    if(windowWidth > 1199) {
        $('.tooltip-active').tooltip();
    };
    $('.tooltip-img').tooltip();




    // pop-ups
    function thnx () {
        $('.pop-up-overlay-wrapper').addClass('active');
        $('body, html').addClass('active');
        $('.pop-up-general-block').removeClass('active');
        $('#thnx').addClass('active');
    };
    $('.write-us-btn').click(function () {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#message').addClass('active');
    });
    $('.open-thnx').click(function (e) {
        e.preventDefault();
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#thnx').addClass('active');
    });
    // Оставить жалобу
    $('.complaint-btn').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#complaint').addClass('active');
    });
    // Войти в личный кабинет
    $('.logIn-btn').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#logIn').addClass('active');
    });
    // Зарегистрироваться
    $('.regIn-btn').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#regIn').addClass('active');
    });
    // Восстановить пароль
    $('.findPass-btn').click(function (e) {
        $overlayPopUpWRP.addClass('active');
        $('body, html').addClass('active');
        $popUpGeneralBlock.removeClass('active');
        $('#findPass').addClass('active');
    });
    // успешно восстановлено
    function thnxPass () {
        $('.pop-up-overlay-wrapper').addClass('active');
        $('body, html').addClass('active');
        $('.pop-up-general-block').removeClass('active');
        $('#thnxPass').addClass('active');
    };

    // close all
    $overlay.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });
    $closePopUpBtn.click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });
    $('.pop-form-btn-close').click(function () {
        $overlayPopUpWRP.removeClass('active');
        $('body, html').removeClass('active');
        $popUpGeneralBlock.removeClass('active');
    });

});
