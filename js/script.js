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

				$.getJSON(urlChannels, function(channels) {

					console.log(game, status);
					console.log(channels);

				});
				
			});

	}



	getTwitchJSON('ESL_SC2');


});