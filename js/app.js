var main = function(){
	$('#oidsubmitbtn').on('click', function(e){
		e.preventDefault();
		$('#blogdata').html(
			'<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

		var bid = $('#objectId').val();
		// var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid;
		var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;

		// $.getJSON(blogentry, function(jd) {
		// 	$('#blogdata').html('<p>Title: ' + jd.title + '</p>');
		// });

		// //CORS???
		// // Create the XHR object.
		// function createCORSRequest(method, url) {
		//   var xhr = new XMLHttpRequest();
		//   if ("withCredentials" in xhr) {
		//     // XHR for Chrome/Firefox/Opera/Safari.
		//     xhr.open(method, url, true);
		//   } else if (typeof XDomainRequest != "undefined") {
		//     // XDomainRequest for IE.
		//     xhr = new XDomainRequest();
		//     xhr.open(method, url);
		//   } else {
		//     // CORS not supported.
		//     xhr = null;
		//   }
		//   return xhr;
		// }

		// // Helper method to parse the title tag from the response.
		// function getTitle(text) {
		//   return text.match('<title>(.*)?</title>')[1];
		// }

	// 	// Make the actual CORS request.
	// 	function makeCorsRequest() {
	// 	  // All HTML5 Rocks properties support CORS.
	// 	  var url = 'http://updates.html5rocks.com';

	// 	  var xhr = createCORSRequest('GET', url);
	// 	  if (!xhr) {
	// 	    alert('CORS not supported');
	// 	    return;
	// 	  }

	// 	  // Response handlers.
	// 	  xhr.onload = function() {
	// 	    var text = xhr.responseText;
	// 	    var title = getTitle(text);
	// 	    alert('Response from CORS request to ' + url + ': ' + title);
	// 	  };

	// 	  xhr.onerror = function() {
	// 	    alert('Woops, there was an error making the request.');
	// 	  };

	// 	  xhr.send();
	// 	}

		requestJSON(blogentry, function(json) {
			if(json.message == "Not Found" || bid == "") {
				$('#blogdata').html("<h2>No Blog Id Found</h2>");
			}
			else {
				var title = json.title;
				var text = json.text;
				var time = json.time;
				// var bid = json._id;

				var outhtml = '<h2>'+title+'</h2>';
				// outhtml = outhtml + '<div class="bcontent">'+text+'</div>';
				// outhtml = outhtml + '<p>'+time+'</p>';
				outhtml = outhtml + '<div class="bloglist clearfix">';
				outputPageContent();

				function outputPageContent() {
					$('#blogdata').html(outhtml);
				}
			}
		});
	});

	function requestJSON(url, callback) {
	    $.ajax({
	      url: url,
	      complete: function(xhr) {
	        callback.call(null, xhr.responseJSON);
	      }
	    });
	}
};

$(document).ready(main);