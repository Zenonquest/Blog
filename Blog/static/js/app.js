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
		var blogentry = 'https://questblog.herokuapp.com/api/blog/'+ bid;
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
				outhtml = outhtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="New Blog Text?"></textarea></div></form></div>';
				outhtml = outhtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
				outputPageContent();

				function outputPageContent() {
					$('#blogdata').html(outhtml);
				}
			}
		});
	});

	//submit create form
	$('#btn-create').on('click', function(e){
		e.preventDefault();
		var blogentry = 'https://questblog.herokuapp.com/api/blog';

		//get form data
		formData = {
			'title' : $('#create-title-area').val(),
			'text'  : $('#create-text-area').val()
		};

		$.ajax({
			type     : 'POST',
			url      : blogentry,
			data     : JSON.stringify(formData),
			crossDomain : true,
			dataType : 'json',
			contentType : 'application/json',
			success  : function(){
				location.reload();
			}
		});	
	});


	//submit create form
	$('#btn-newuser').on('click', function(e){
		e.preventDefault();
		var newuserURL = 'https://questblog.herokuapp.com/api/signup';

		//get form data
		formData = {
			'username' : $('#create-username-area').val(),
			'password'  : $('#create-password-area').val()
		};

		// var blogentry = 'https://questblog.herokuapp.com/api/blog';
		$.ajax({
			type     : 'POST',
			url      : newuserURL,
			data     : JSON.stringify(formData),
			crossDomain : true,
			dataType : 'json',
			contentType : 'application/json',
			success  : function(){
				location.reload();
			}
		});	
	});

	//display login forms 
	$('#btn-login').on('click', function(e){
		var outhtml = '<div class="container" id="container-login">';
		outhtml = outhtml + '<form id="form-login"><div id="login-username-group class="form-group">';
		outhtml = outhtml + '<label for="username">Username</label>';
		outhtml = outhtml + '<textarea class="form-control" id="login-username-area" name="username" placeholder="Your username here"></textarea></div>';
		outhtml = outhtml + '<div id="login-passwrd-group class="form-group">';
		outhtml = outhtml + '<textarea class="form-control status-box" id="login-password-area" name="password" onKeyPress="handleTyping(event)" rows="1" placeholder="Your password here"></textarea></div>';
		outhtml = outhtml + '<textarea rows="10" cols="30" id="hidden-login-password-area"  style="display:none"></textarea>';
		outhtml = outhtml + '<a href = "#" id="btn-login-submit" class="btn btn-primary btn-login" role="button">Login</a><a href = "#" id="btn-login-close" class="btn btn-primary btn-login" role="button">Close</a></div></form>';

		outputPageContent();

		function outputPageContent() {
			$('#login-user-detail').html(outhtml);
		}

		

		$('#btn-login-submit').on('click', function(e){
			e.preventDefault();
			var loginURL = 'https://questblog.herokuapp.com/api/login';

			//get form data 
			formData = {
				'username' : $('#login-username-area').val(),
				'password' : $('#login-password-area').val()

			};

			$.ajax({
				type     : 'POST',
				url      : loginURL,
				data     : JSON.stringify(formData),
				crossDomain : true,
				dataType : 'json',
				contentType : 'application/json',
				success  : function(){
					location.reload();
				}
			});

			$('#btn-login-close').on('click', function(){
				$('#login-user-detail').hide();
			});
		});

		//typing -> password
		function handleTyping(e){
		    setTimeout(function(){handleTypingDelayed(e)},500);
		}

		function handleTypingDelayed(e){

		    var text = document.getElementById('hidden-login-password-area').value;
		    var stars = document.getElementById('hidden-login-password-area').value.length;
		    unicode = eval(unicode);
		    var unicode=e.keyCode? e.keyCode : e.charCode;

		    if ( (unicode >=65 && unicode <=90) 
		            || (unicode >=97 && unicode <=122) 
		                || (unicode >=48 && unicode <=57) ){
		        text = text+String.fromCharCode(unicode);    
		        stars += 1;
		    }else{
		        stars -= 1;
		    }

		    document.getElementById('hidden-login-password-area').value = text;
		    document.getElementById('login-password-area').value = generateStars(stars);
		}

		function generateStars(n){
		    var stars = '';
		    for (var i=0; i<n;i++){
		        stars += '.';
		    }
		    return stars;
		}
	});

	//hide/show with n and o
	$(document).keypress(function(event){
		if(event.which === 111) {
			$('#editbox').hide();
		}
		else if(event.which === 110) {
			$('#editbox').show();
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




//////////////////////////OLD STUFF//////////////////////////////

	// $('#editbtn').on('click', function(e){
	// 	e.preventDefault();
	// 	$('#detail-info').html(
	// 		'<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

	// 	// Read a page's GET URL variables and return them as an associative array.
	// 	function getUrlVars()
	// 	{
	//     	var vars = [], hash;
	// 	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	// 	    for(var i = 0; i < hashes.length; i++)
	// 	    {
	// 	        hash = hashes[i].split('=');
	// 	        vars.push(hash[0]);
	// 	        vars[hash[0]] = hash[1];
	// 	    }
	//     return vars;
	// 	}

	// 	var bid = getUrlVars()["bid"]
	// 	var blogentry = 'https://questblog.herokuapp.com/api/blog/'+ bid;
	// 	// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;

	// 	requestJSON(blogentry, function(json) {
	// 		if(json.message == "Not Found" || bid == "") {
	// 			$('#blogdata').html("<h2>No Blog Id Found</h2>");
	// 		}
	// 		else {
	// 			var title = json.title;
	// 			var text = json.text;
	// 			var time = json.time;
	// 			var bid = json._id;

	// 			var outhtml = '<h2>'+ 'Title: ' + title+'</h2>';
	// 			outhtml = outhtml + '<div class="bcontent">'+ 'Time: ' + time+'</div>';
	// 			outhtml = outhtml + '<p>'+ 'Body : ' + text+'</p>';
	// 			outhtml = outhtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="New Blog Text?"></textarea></div></form></div>';
	// 			outhtml = outhtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
	// 			outputPageContent();

	// 			function outputPageContent() {
	// 				$('#blogdata').html(outhtml);
	// 			}
	// 		}
	// 	});
	// });


/*	$('#viewallbtn').on('click', function(e){
		e.preventDefault();
		$('#blogdata').html(
			'<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

		var blogentry = 'https://questblog.herokuapp.com/api/blog';
		// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog';

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
				outhtml = outhtml + '<div class="container" id="singleblog">'
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
	});*/