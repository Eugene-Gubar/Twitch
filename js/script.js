$(document).ready(function() {

	var channels = ["freecodecamp","test_channel","ESL_SC2"];

	function getTwitchJSON(name) {
		var urlStreams = 'https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?';
		var urlChannels = 'https://wind-bow.gomix.me/twitch-api/channels/' + name + '?callback=?';

			$.getJSON(urlStreams, function(streams) {

				var game, status;

				if (streams.stream === null) {
					game = "Offline";
					status = "offline";
				} else if (streams.stream === undefined) {
					game = "Account Closed";
					status = "offline";
				} else {
					game = streams.stream.game;
					status = "online";
				}

				$.getJSON(urlChannels, function(data) {

					if (data.error !== 'Not Found') {
						var bgImg = data.profile_banner ? data.profile_banner : 'https://tatica.fedorapeople.org/Themes/F12/wallpaper-mosaico6.svg';
						var logoImg = data.logo ? data.logo : 'https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Combologo_474x356.png';
						$('.list-group').append('<a target="_blank" style="background: url('+ bgImg +') no-repeat top center;" href="'+ data.url +'" class="list-group-item '+ status +'"><img src="'+ logoImg +'" alt=""><span class="name"><strong>'+ data.name +'</strong></span><span class="status"> '+ status +'</span><p class="description">'+ data.status +'</p></a>');
					}

				});
				
			});

	}



	channels.forEach(function(element) {
		getTwitchJSON(element);
	});


	$('#all').on('click', function() {
		$('.list-group>a').removeClass('hidden');
	});
	$('#online').on('click', function() {
		$('.online').each(function() {
			$(this).removeClass('hidden');
		});
		$('.offline').each(function() {
			$(this).addClass('hidden');
		});
	});
	$('#offline').on('click', function() {
		$('.online').each(function() {
			$(this).addClass('hidden');
		});
		$('.offline').each(function() {
			$(this).removeClass('hidden');
		});
	});

	
	$("#btn-send").on('click', function() {

		var value = $("#inp-search").val().replace(/\s/g, '');

		if (value !== '') {
			var channels = value.split(',');
			console.log(channels);
			channels.forEach(function(element) {
				console.log(element);
				getTwitchJSON(element);
			});
		}

	});


});