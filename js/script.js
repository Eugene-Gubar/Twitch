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

					$('.list-group').append('<a style="background: url('+ data.profile_banner +') no-repeat top center;" href="'+ data.url +'" class="list-group-item '+ status +'"><img src="'+ data.logo +'" alt=""><span class="name"><strong>'+ data.name +'</strong></span><span class="status">'+ status +'</span><p class="description">'+ data.status +'</p></a>');


				});
				
			});

	}



	getTwitchJSON('ESL_SC2');


});