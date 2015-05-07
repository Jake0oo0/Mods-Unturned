$(document).ready(function(){
	var preview = $(".uploadscreen_previewimgwrap");
	$(".uploadscreenbutton").change(function(event){
		var input = $(event.currentTarget);
		var file = input[0].files[0];
		var reader = new FileReader();
		reader.onload = function(e){
			image_base64 = e.target.result;
			preview.attr("src", image_base64);
		};
		reader.readAsDataURL(file);
	});

	$('.login-button').magnificPopup({
		type: 'inline',
		midClick: true,
		mainClass: 'mfp-zoom-in',
      	removalDelay: 500
	});

	$('.reset-link-button').magnificPopup({
		type:'inline',
		midClick: true,
		mainClass: 'mfp-zoom-in',
      	removalDelay: 500
	});

	$('.contact-button').magnificPopup({
      type:'inline',
      midClick: true,
      mainClass: 'mfp-zoom-in',
      removalDelay: 500
    });

	function handleEnter(elem) {
		elem = elem.target;
		var location = -1;
		var image_elem = null;
		if ($(elem).hasClass('menutext')) {
			location = $(elem).parent().parent().index() + 1
			image_elem = $('.menuimgwrap:nth-child('+ location +')')
			$(elem).parent().parent().addClass('hovering');
			$(image_elem).addClass('hovering');
		} else if ($(elem).hasClass('menuimgwrap')) {
			location = $(elem).index() + 1
			image_elem = $('.menuitem:nth-child('+ location +')')
			$(elem).addClass('hovering');
			$(image_elem).addClass('hovering');
		}
	}

	function handleLeave(elem) {
		elem = elem.target;
		var location = -1;
		var image_elem = null;
		if ($(elem).hasClass('menutext')) {
			location = $(elem).parent().parent().index() + 1
			image_elem = $('.menuimgwrap:nth-child('+ location +')')
			$(elem).parent().parent().removeClass('hovering');
			$(image_elem).removeClass('hovering');
		} else if ($(elem).hasClass('menuimgwrap')) {
			location = $(elem).index() + 1
			image_elem = $('.menuitem:nth-child('+ location +')')
			$(elem).removeClass('hovering');
			$(image_elem).removeClass('hovering');
		}
	}
	$('.menuitem, .menuimgwrap').hover(handleEnter, handleLeave);

	$('#slider').nivoSlider({
		effect: 'slideInRight',      
		animSpeed: 600,
		pauseTime: 5000,
		startSlide: 0,
		directionNav: false,
		controlNav: false,
		controlNavThumbs: false,
		pauseOnHover: true,
		manualAdvance: false,
		prevText: '',
		nextText: '',
		randomStart: false,
	});

	$(".registerwrap input[id='user_password_confirmation']").keyup(checkPasswordMatch);
	$(".registerwrap input[id='user_password']").keyup(checkPasswordMatch);
	$(".signinwrap input[id='user_password']").keyup(checkUserPasswordLength);
});


$(document).on('ajax:success', 'form#log_in_user', function(e, data, status, xhr) {
	location.reload(true);
}).on('ajax:error', 'form#log_in_user', function(e, data, status, xhr) {
	error = data.responseJSON.error;
	$('.signinwrap').find('.notificationtext').text(error);
	$('.signinwrap .errormessage').effect({effect: "shake", direction: "up", distance: 5, times: 2});
});

$(document).on('ajax:success', 'form#register_user', function(e, data, status, xhr) {
	location.reload(true);
}).on('ajax:error', 'form#register_user', function(e, data, status, xhr) {
	errorResponse = data.responseText;
	formattedErrors = renderErrors(errorResponse);
	$('.registerwrap').find('.notificationtext').html(formattedErrors);
	if (formattedErrors.length > 1) {
		$('.registercircleinfo').css('visibility', 'hidden');
	} else {
		$('.registercircleinfo').css('visibility', 'visible');
	}
	$('.registerwrap .errormessage').effect({effect: "shake", direction: "up", distance: 5, times: 2});
});

$(document).on('ajax:success', 'form#change_password', function(e, data, status, xhr) {
	location.reload(true);
}).on('ajax:error', 'form#change_password', function(e, data, status, xhr) {
	errorResponse = data.responseText;
	formattedErrors = renderErrors(errorResponse);
	$('.inputwrap').find('.passwordreset_notificationmessagewrap').html(formattedErrors);
	$('.inputwrap .errormessage').effect({effect: "shake", direction: "up", distance: 5, times: 2});
});

$(document).on('ajax:success', 'form#send_email', function(e, data, status, xhr) {
	location.reload(true);
}).on('ajax:error', 'form#send_email', function(e, data, status, xhr) {
	errorResponse = data.responseText;
	formattedErrors = renderErrors(errorResponse);
	$('.passwordreset_notificationmessagewrap').find('.passwordreset_notificationtext').html(formattedErrors);
	$('.passwordreset_notificationmessagewrap .errormessage').effect({effect: "shake", direction: "up", distance: 5, times: 2});
});

$(document).on('ajax:success', 'form#finish_steam', function(e, data, status, xhr) {
	location.reload(true);
}).on('ajax:error', 'form#finish_steam', function(e, data, status, xhr) {
	errorResponse = data.responseText;
	formattedErrors = renderErrors(errorResponse);
	$('.passwordreset_notificationmessagewrap').find('.passwordreset_notificationtext').html(formattedErrors);
	$('.loginpagewrap .errormessage').effect({effect: "shake", direction: "up", distance: 5, times: 2});
});