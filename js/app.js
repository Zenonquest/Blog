var main = function(){
	$('#oidsubmitbtn').on('click', function(e){
		e.preventDefault();
		$('#blogdata').html(
			'<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

		var bid = $('#objectId').val();
		var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid;

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