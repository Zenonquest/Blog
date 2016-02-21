var main = function(){
	$('.icon-menu').select();
         
    $('.icon-menu').click(function(){
    
        $('.menu').animate({
            left: '0px'
        }, 200);
        
        $('body').animate({
            left: '285px'
        }, 200); 
    });
    
    $('.icon-close').click(function(){
        $('.menu').animate({
            left:'-285px'},
            200);
            
        $('body').animate({
            left:'0px'},
            200);
        
    });

	$('#viewonebtn').on('click', function(e){
		e.preventDefault();
		$('#blogdata').html(
			'<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

		var bid = $('#objectId').val();
		var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid;
		// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;

		requestJSON(blogentry, function(json) {
			if(json.message == "Not Found" || bid == "") {
				$('#blogdata').html("<h2>No Blog Id Found</h2>");
			}
			else {
				var title = json.title;
				var text = json.text;
				var time = json.time;
				var bid = json._id;

				var outhtml = '<h2>'+ 'Title: ' + title+'</h2>';
				outhtml = outhtml + '<div class="bcontent">'+ 'Time: ' + time+'</div>';
				outhtml = outhtml + '<p>'+ 'Body : ' + text+'</p>';
				outhtml = outhtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" rows="2" placeholder="New Blog Text?"></textarea></div></form>';
				outhtml = outhtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
				outputPageContent();

				function outputPageContent() {
					$('#blogdata').html(outhtml);
				}
			}
		});
	});

	$('#editbtn').on('click', function(e){
		//send data to server
	});

	$('#viewallbtn').on('click', function(e){
		e.preventDefault();
		$('#blogdata').html(
			'<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

		var blogentry = 'http://127.0.0.1:5000/api/blog';
		// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;

		requestJSON(blogentry, function(json) {

			var outhtml = '<h2>'+'Most Recent (5) Entries'+'</h2>';
			outhtml = outhtml + '<ul>';

			// json.array.length for full array
			for (var i = 0; i < 5; i++) {
				var text = json.array[i].text;
				var title = json.array[i].title;
				var time = json.array[i].time;
				var bid = json.array[i]._id;
				var pos = i + 1;
				outhtml = outhtml + '<div class=container id=singleblog>'
				outhtml = outhtml + '<p>' + 'Blog entry #' + pos + '</p>';

				outhtml = outhtml + '<li>' + 'Title: ' + title + '</li>';
				outhtml = outhtml + '<li>' + 'Time: ' + time + '</li>';
				outhtml = outhtml + '<li>' + 'Body: ' + text + '</li>';
				outhtml = outhtml + '<li>' + 'ID: ' + bid + '</li>'; 
				outhtml = outhtml + '</div>';

				// $('#singleblog').html(outhtml);
			}
			outhtml = outhtml + '</ul>';

			outputPageContent();

			function outputPageContent() {
				$('#blogdata').html(outhtml);
			}
		});
	});

	$(document).keypress(function(evvent){
		if(event.which === 111) {
			$('#editbox').hide();
		}
		else if(event.which === 110) {
			$('#editbox').show();
		}
	});

	$('.status-box').keyup(function() {
	    var postLength = $(this).val().length;
	    var charactersLeft = 140 - postLength;
	    $('.counter').text(charactersLeft);
	  
	    if(charactersLeft < 0) {
	      $('.btn').addClass('disabled'); 
	    }
	    else if(charactersLeft == 140) {
	      $('.btn').addClass('disabled');
	    }
	    else {
	      $('.btn').removeClass('disabled');
	    }
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