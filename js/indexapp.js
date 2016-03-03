$(document).ready(function(){

	var blogentry = 'http://127.0.0.1:5000/api/blog';
	// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog';
	var text = [];
	var title = [];
	var time = [];
	var bid = [];

	requestJSON(blogentry, function(json) {

		var outhtml = '<h2>'+'Most Recent (5) Entries'+'</h2>';
		outhtml = outhtml + '<ul>';

		

		// json.array.length for full array
		for (var i = 0; i < 5; i++) {
			text.push(json.array[i].text);
			title.push(json.array[i].title);
			time.push(json.array[i].time);
			bid.push(json.array[i]._id);
			var pos = i + 1;
			outhtml = outhtml + '<div class="container singleblog" id="singleblog' + pos + '">';
			outhtml = outhtml + '<li>' + '<a href="detail.html' +   '">' + 'Title: ' + title[i] + '</a>' + '</li>';
			outhtml = outhtml + '<li>' + 'Time: ' + time[i] + '</li>';
			outhtml = outhtml + '<li>' + 'ID: ' + bid[i] + '</li>';
			outhtml = outhtml + '</div>';

			// $('#singleblog').html(outhtml);
			
		}
		outhtml = outhtml + '</ul>';

		outputPageContent();

		function outputPageContent() {
			$('#all-blog-titles').html(outhtml);
		}

		$('#singleblog1').on('click', function(e){

				$('#all-blog-titles').hide();
				var douthtml = '<h2>' + 'text' + '</h2>';
				var douthtml = '<h2>'+ 'Title: ' + title[0] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[0]+'</div>';
				douthtml = douthtml + '<p>'+ 'Body : ' + text[0] + '</p>';
				douthtml = douthtml + '<div class="container" id=editbox><form id="form-edit"><div class="form-group"><textarea class="form-control status-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
				douthtml = douthtml + '<p class="counter">0</p><a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a>';
				douthtml = douthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a>';
				doutputPageContent();

				$('#editbtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[0];
					// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
					var formData = {
						'title' : $('#edit-title-box').val(),
						'text'  : $('#edit-text-box').val()
					};
					
					$.ajax({
						type     : 'POST',
						url      : blogentry,
						data     : formData,
						crossDomain : true,
						dataType : 'json',
						success  : function(){
							location.reload();
						}
					});

				});

			function doutputPageContent() {
				$('#single-blog-detail').html(douthtml);
			}
			

		});
	});

		$('#singleblog1').on('click', function(e){

				$('#all-blog-titles').hide();
				var douthtml = '<h2>' + 'text' + '</h2>';
				// var douthtml = '<h2>'+ 'Title: ' + title[0] + '</h2>';
				// douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[0]+'</div>';
				// douthtml = douthtml + '<p>'+ 'Body : ' + text[0] + '</p>';
				// douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
				// douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
				// douthtml = douthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a>';
				doutputPageContent();

				$('#editbtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[0];
					// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
					var formData = {
						'title' : $('#edit-title-box').val(),
						'text'  : $('#edit-text-box').val()
					};
					
					$.ajax({
						type     : 'POST',
						url      : blogentry,
						data     : formData,
						crossDomain : true,
						dataType : 'json',
						success  : function(){
							location.reload();
						}
					});

				});

			function doutputPageContent() {
				$('#single-blog-detail').html(douthtml);
			}
			

		});

		$('#singleblog2').on('click', function(e){

				$('#all-blog-titles').hide();
				var douthtml = '<h2>' + 'text' + '</h2>';
				var douthtml = '<h2>'+ 'Title: ' + title[1] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[1]+'</div>';
				douthtml = douthtml + '<p>'+ 'Body : ' + text[1] + '</p>';
				douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
				douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
				doutputPageContent();

				function doutputPageContent() {
					$('#single-blog-detail').html(douthtml);
				}
			

		});

		$('#singleblog3').on('click', function(e){

				$('#all-blog-titles').hide();
				var douthtml = '<h2>' + 'text' + '</h2>';
				var douthtml = '<h2>'+ 'Title: ' + title[2] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[2]+'</div>';
				douthtml = douthtml + '<p>'+ 'Body : ' + text[2] + '</p>';
				douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
				douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
				doutputPageContent();

				function doutputPageContent() {
					$('#single-blog-detail').html(douthtml);
				}
			

		});

		$('#singleblog4').on('click', function(e){

				$('#all-blog-titles').hide();
				var douthtml = '<h2>' + 'text' + '</h2>';
				var douthtml = '<h2>'+ 'Title: ' + title[3] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[3]+'</div>';
				douthtml = douthtml + '<p>'+ 'Body : ' + text[3] + '</p>';
				douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
				douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
				doutputPageContent();

				function doutputPageContent() {
					$('#single-blog-detail').html(douthtml);
				}
			

		});

		$('#singleblog5').on('click', function(e){

				$('#all-blog-titles').hide();
				var douthtml = '<h2>' + 'text' + '</h2>';
				var douthtml = '<h2>'+ 'Title: ' + title[4] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[4]+'</div>';
				douthtml = douthtml + '<p>'+ 'Body : ' + text[4] + '</p>';
				douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
				douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
				doutputPageContent();

				function doutputPageContent() {
					$('#single-blog-detail').html(douthtml);
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


});