$(document).ready(function(){

	{% if g.user.is_authenticated() %}
	var blogentry = 'http://127.0.0.1:5000/api/blog/' + current_user.username;
	{% else %}
	var blogentry =  'http://127.0.0.1:5000/api/blog';
	{% endif %}
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
			outhtml = outhtml + '<p>' + pos + ': ' + title[i] + '</p>';
			outhtml = outhtml + '</div>';
			
		}
		outhtml = outhtml + '</ul>';

		outputPageContent();

		function outputPageContent() {
			$('#all-blog-titles').html(outhtml);
		}

		$('#singleblog1').on('click', function(e){

				$('#all-blog-titles').hide();

				var douthtml = '<h2>' + title[0] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Submission Date: ' + time[0]+'</div>';
				douthtml = douthtml + '<p>' + text[0] + '</p>';
				// douthtml = douthtml + '<div class="container" id=edit-title-box><form id="form-title-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-title-area" rows="1" placeholder=' + title[0] + '></textarea></div></form></div>';
				// douthtml = douthtml + '<div class="container" id=edit-text-box><form id="form-text-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-text-area" rows="2" placeholder=' + text[0] + '></textarea></div></form></div>';
				var bouthtml = '<div class="container" id=btns-box><a href = "#" id = "openeditbtn" class="btn btn-primary" role="button">Edit This Entry</a>';
				bouthtml = bouthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a></div>';
				doutputPageContent();

				$('#openeditbtn').on('click', function(e){
					$('#buttons-blog-detail').hide();
					$('#edit-blog-detail').show();
					var eouthtml = '<div class="container" id=edit-box><form id="form-edit"><div class="form-group"><textarea class="form-control" id="edit-title-area" name="title" rows="1" placeholder=' + title[0] + '></textarea></div>';
					eouthtml = eouthtml + '<div class="form-group"><textarea class="form-control" id="edit-text-area" name="text" rows="20" placeholder=' + text[0] + '></textarea></div></form></div>';
					eouthtml = eouthtml + '<div class="container" id=btns-box-final><a href = "#" id = "editbtn" class="btn btn-primary" role="button">Confirm Edit</a>';
					eouthtml = eouthtml + '<a href = "#" id = "canceleditbtn" class="btn btn-primary" role="button">Cancel Edit</a><p class="counter" id="counter-edit">0</p></div>';
					eoutputPageContent();

					function eoutputPageContent() {
							$('#edit-blog-detail').html(eouthtml);
						}

						$('#editbtn').on('click', function(e){
						e.preventDefault();

						var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[0];
						// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
						var formData = {
							'title' : $('#edit-title-area').val(),
							'text'  : $('#edit-text-area').val()
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

					$('#canceleditbtn').on('click', function(){
						$('#edit-blog-detail').hide();
						$('#buttons-blog-detail').show();
					});

				});

				

				$('#deletebtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[0];
					
					$.ajax({
						type     : 'DELETE',
						url      : blogentry,
						crossDomain : true,
						dataType : 'json',
						contentType: 'application/json',
						success  : function(){
							location.reload();
						}
					});

				});

			function doutputPageContent() {
				$('#single-blog-detail').html(douthtml);
				$('#buttons-blog-detail').html(bouthtml);
			}
			

		});

		$('#singleblog2').on('click', function(e){

				$('#all-blog-titles').hide();

				var douthtml = '<h2>' + title[1] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Submission Date: ' + time[1]+'</div>';
				douthtml = douthtml + '<p>' + text[1] + '</p>';
				// douthtml = douthtml + '<div class="container" id=edit-title-box><form id="form-title-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-title-area" rows="1" placeholder=' + title[0] + '></textarea></div></form></div>';
				// douthtml = douthtml + '<div class="container" id=edit-text-box><form id="form-text-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-text-area" rows="2" placeholder=' + text[0] + '></textarea></div></form></div>';
				var bouthtml = '<div class="container" id=btns-box><a href = "#" id = "openeditbtn" class="btn btn-primary" role="button">Edit This Entry</a>';
				bouthtml = bouthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a></div>';
				doutputPageContent();

				$('#openeditbtn').on('click', function(e){
					$('#buttons-blog-detail').hide();
					$('#edit-blog-detail').show();
					var eouthtml = '<div class="container" id=edit-box><form id="form-edit"><div class="form-group"><textarea class="form-control" id="edit-title-area" name="title" rows="1" placeholder=' + title[0] + '></textarea></div>';
					eouthtml = eouthtml + '<div class="form-group"><textarea class="form-control" id="edit-text-area" name="text" rows="20" placeholder=' + text[0] + '></textarea></div></form></div>';
					eouthtml = eouthtml + '<div class="container" id=btns-box-final><a href = "#" id = "editbtn" class="btn btn-primary" role="button">Confirm Edit</a>';
					eouthtml = eouthtml + '<a href = "#" id = "canceleditbtn" class="btn btn-primary" role="button">Cancel Edit</a><p class="counter" id="counter-edit">0</p></div>';
					eoutputPageContent();

					function eoutputPageContent() {
						$('#edit-blog-detail').html(eouthtml);
					}

					$('#canceleditbtn').on('click', function(){
						$('#edit-blog-detail').hide();
						$('#buttons-blog-detail').show();
					});

				});

				$('#editbtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[1];
					// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
					var formData = {
						'title' : $('#edit-title-area').val(),
						'text'  : $('#edit-text-area').val()
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

				$('#deletebtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[1];
					
					$.ajax({
						type     : 'DELETE',
						url      : blogentry,
						crossDomain : true,
						dataType : 'json',
						contentType: 'application/json',
						success  : function(){
							location.reload();
						}
					});

				});

			function doutputPageContent() {
				$('#single-blog-detail').html(douthtml);
				$('#buttons-blog-detail').html(bouthtml);
			}
			

		});

		$('#singleblog3').on('click', function(e){

				$('#all-blog-titles').hide();

				var douthtml = '<h2>' + title[2] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Submission Date: ' + time[2]+'</div>';
				douthtml = douthtml + '<p>' + text[2] + '</p>';
				// douthtml = douthtml + '<div class="container" id=edit-title-box><form id="form-title-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-title-area" rows="1" placeholder=' + title[0] + '></textarea></div></form></div>';
				// douthtml = douthtml + '<div class="container" id=edit-text-box><form id="form-text-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-text-area" rows="2" placeholder=' + text[0] + '></textarea></div></form></div>';
				var bouthtml = '<div class="container" id=btns-box><a href = "#" id = "openeditbtn" class="btn btn-primary" role="button">Edit This Entry</a>';
				bouthtml = bouthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a></div>';
				doutputPageContent();

				$('#openeditbtn').on('click', function(e){
					$('#buttons-blog-detail').hide();
					$('#edit-blog-detail').show();
					var eouthtml = '<div class="container" id=edit-box><form id="form-edit"><div class="form-group"><textarea class="form-control" id="edit-title-area" name="title" rows="1" placeholder=' + title[2] + '></textarea></div>';
					eouthtml = eouthtml + '<div class="form-group"><textarea class="form-control" id="edit-text-area" name="text" rows="20" placeholder=' + text[2] + '></textarea></div></form></div>';
					eouthtml = eouthtml + '<div class="container" id=btns-box-final><a href = "#" id = "editbtn" class="btn btn-primary" role="button">Confirm Edit</a>';
					eouthtml = eouthtml + '<a href = "#" id = "canceleditbtn" class="btn btn-primary" role="button">Cancel Edit</a><p class="counter" id="counter-edit">0</p></div>';
					eoutputPageContent();

					function eoutputPageContent() {
						$('#edit-blog-detail').html(eouthtml);
					}

					$('#canceleditbtn').on('click', function(){
						$('#edit-blog-detail').hide();
						$('#buttons-blog-detail').show();
					});

				});

				$('#editbtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[2];
					// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
					var formData = {
						'title' : $('#edit-title-area').val(),
						'text'  : $('#edit-text-area').val()
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

				$('#deletebtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[2];
					
					$.ajax({
						type     : 'DELETE',
						url      : blogentry,
						crossDomain : true,
						dataType : 'json',
						contentType: 'application/json',
						success  : function(){
							location.reload();
						}
					});

				});

			function doutputPageContent() {
				$('#single-blog-detail').html(douthtml);
				$('#buttons-blog-detail').html(bouthtml);
			}
			

		});

		$('#singleblog4').on('click', function(e){

				$('#all-blog-titles').hide();

				var douthtml = '<h2>' + title[3] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Submission Date: ' + time[3]+'</div>';
				douthtml = douthtml + '<p>' + text[3] + '</p>';
				// douthtml = douthtml + '<div class="container" id=edit-title-box><form id="form-title-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-title-area" rows="1" placeholder=' + title[0] + '></textarea></div></form></div>';
				// douthtml = douthtml + '<div class="container" id=edit-text-box><form id="form-text-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-text-area" rows="2" placeholder=' + text[0] + '></textarea></div></form></div>';
				var bouthtml = '<div class="container" id=btns-box><a href = "#" id = "openeditbtn" class="btn btn-primary" role="button">Edit This Entry</a>';
				bouthtml = bouthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a></div>';
				doutputPageContent();

				$('#openeditbtn').on('click', function(e){
					$('#buttons-blog-detail').hide();
					$('#edit-blog-detail').show();
					var eouthtml = '<div class="container" id=edit-box><form id="form-edit"><div class="form-group"><textarea class="form-control" id="edit-title-area" name="title" rows="1" placeholder=' + title[3] + '></textarea></div>';
					eouthtml = eouthtml + '<div class="form-group"><textarea class="form-control" id="edit-text-area" name="text" rows="20" placeholder=' + text[3] + '></textarea></div></form></div>';
					eouthtml = eouthtml + '<div class="container" id=btns-box-final><a href = "#" id = "editbtn" class="btn btn-primary" role="button">Confirm Edit</a>';
					eouthtml = eouthtml + '<a href = "#" id = "canceleditbtn" class="btn btn-primary" role="button">Cancel Edit</a><p class="counter" id="counter-edit">0</p></div>';
					eoutputPageContent();

					function eoutputPageContent() {
						$('#edit-blog-detail').html(eouthtml);
					}

					$('#canceleditbtn').on('click', function(){
						$('#edit-blog-detail').hide();
						$('#buttons-blog-detail').show();
					});

				});

				$('#editbtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[3];
					// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
					var formData = {
						'title' : $('#edit-title-area').val(),
						'text'  : $('#edit-text-area').val()
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

				$('#deletebtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[3];
					
					$.ajax({
						type     : 'DELETE',
						url      : blogentry,
						crossDomain : true,
						dataType : 'json',
						contentType: 'application/json',
						success  : function(){
							location.reload();
						}
					});

				});

			function doutputPageContent() {
				$('#single-blog-detail').html(douthtml);
				$('#buttons-blog-detail').html(bouthtml);
			}
			

		});

		$('#singleblog5').on('click', function(e){

				$('#all-blog-titles').hide();

				var douthtml = '<h2>' + title[4] + '</h2>';
				douthtml = douthtml + '<div class="bcontent">' + 'Submission Date: ' + time[4]+'</div>';
				douthtml = douthtml + '<p>' + text[4] + '</p>';
				// douthtml = douthtml + '<div class="container" id=edit-title-box><form id="form-title-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-title-area" rows="1" placeholder=' + title[0] + '></textarea></div></form></div>';
				// douthtml = douthtml + '<div class="container" id=edit-text-box><form id="form-text-edit"><div class="form-group"><textarea class="form-control status-box" id="edit-text-area" rows="2" placeholder=' + text[0] + '></textarea></div></form></div>';
				var bouthtml = '<div class="container" id=btns-box><a href = "#" id = "openeditbtn" class="btn btn-primary" role="button">Edit This Entry</a>';
				bouthtml = bouthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a></div>';
				doutputPageContent();

				$('#openeditbtn').on('click', function(e){
					$('#buttons-blog-detail').hide();
					$('#edit-blog-detail').show();
					var eouthtml = '<div class="container" id=edit-box><form id="form-edit"><div class="form-group"><textarea class="form-control" id="edit-title-area" name="title" rows="1" placeholder=' + title[4] + '></textarea></div>';
					eouthtml = eouthtml + '<div class="form-group"><textarea class="form-control" id="edit-text-area" name="text" rows="20" placeholder=' + text[4] + '></textarea></div></form></div>';
					eouthtml = eouthtml + '<div class="container" id=btns-box-final><a href = "#" id = "editbtn" class="btn btn-primary" role="button">Confirm Edit</a>';
					eouthtml = eouthtml + '<a href = "#" id = "canceleditbtn" class="btn btn-primary" role="button">Cancel Edit</a><p class="counter" id="counter-edit">0</p></div>';
					eoutputPageContent();

					function eoutputPageContent() {
						$('#edit-blog-detail').html(eouthtml);
					}

					$('#canceleditbtn').on('click', function(){
						$('#edit-blog-detail').hide();
						$('#buttons-blog-detail').show();
					});

				});

				$('#editbtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[4];
					// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
					var formData = {
						'title' : $('#edit-title-area').val(),
						'text'  : $('#edit-text-area').val()
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

				$('#deletebtn').on('click', function(e){
					e.preventDefault();

					var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[4];
					
					$.ajax({
						type     : 'DELETE',
						url      : blogentry,
						crossDomain : true,
						dataType : 'json',
						contentType: 'application/json',
						success  : function(){
							location.reload();
						}
					});

				});

			function doutputPageContent() {
				$('#single-blog-detail').html(douthtml);
				$('#buttons-blog-detail').html(bouthtml);
			}
			

		});

		// $('#singleblog1').on('click', function(e){

		// 		$('#all-blog-titles').hide();
		// 		var douthtml = '<h2>' + 'text' + '</h2>';
		// 		// var douthtml = '<h2>'+ 'Title: ' + title[0] + '</h2>';
		// 		// douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[0]+'</div>';
		// 		// douthtml = douthtml + '<p>'+ 'Body : ' + text[0] + '</p>';
		// 		// douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
		// 		// douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
		// 		// douthtml = douthtml + '<a href = "#" id = "deletebtn" class="btn btn-primary" role="button">Delete This Entry</a>';
		// 		doutputPageContent();

		// 		$('#editbtn').on('click', function(e){
		// 			e.preventDefault();

		// 			var blogentry = 'http://127.0.0.1:5000/api/blog/'+ bid[0];
		// 			// var blogentry = 'http://www.Zenonquest.pythonanywhere.com/api/blog/' + bid;
		// 			var formData = {
		// 				'title' : $('#edit-title-box').val(),
		// 				'text'  : $('#edit-text-box').val()
		// 			};
					
		// 			$.ajax({
		// 				type        : 'POST',
		// 				url         : blogentry,
		// 				data        : formData,
		// 				headers     : {}
		// 				crossDomain : true,
		// 				dataType    : 'json',
		// 				success     : function(){
		// 					location.reload();
		// 				}
		// 			});

		// 		});

		// 	function doutputPageContent() {
		// 		$('#single-blog-detail').html(douthtml);
		// 	}
			

		// });

		// $('#singleblog2').on('click', function(e){

		// 		$('#all-blog-titles').hide();
		// 		var douthtml = '<h2>' + 'text' + '</h2>';
		// 		var douthtml = '<h2>'+ 'Title: ' + title[1] + '</h2>';
		// 		douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[1]+'</div>';
		// 		douthtml = douthtml + '<p>'+ 'Body : ' + text[1] + '</p>';
		// 		douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
		// 		douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
		// 		doutputPageContent();

		// 		function doutputPageContent() {
		// 			$('#single-blog-detail').html(douthtml);
		// 		}
			

		// });

		// $('#singleblog3').on('click', function(e){

		// 		$('#all-blog-titles').hide();
		// 		var douthtml = '<h2>' + 'text' + '</h2>';
		// 		var douthtml = '<h2>'+ 'Title: ' + title[2] + '</h2>';
		// 		douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[2]+'</div>';
		// 		douthtml = douthtml + '<p>'+ 'Body : ' + text[2] + '</p>';
		// 		douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
		// 		douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
		// 		doutputPageContent();

		// 		function doutputPageContent() {
		// 			$('#single-blog-detail').html(douthtml);
		// 		}
			

		// });

		// $('#singleblog4').on('click', function(e){

		// 		$('#all-blog-titles').hide();
		// 		var douthtml = '<h2>' + 'text' + '</h2>';
		// 		var douthtml = '<h2>'+ 'Title: ' + title[3] + '</h2>';
		// 		douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[3]+'</div>';
		// 		douthtml = douthtml + '<p>'+ 'Body : ' + text[3] + '</p>';
		// 		douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
		// 		douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
		// 		doutputPageContent();

		// 		function doutputPageContent() {
		// 			$('#single-blog-detail').html(douthtml);
		// 		}
			

		// });

		// $('#singleblog5').on('click', function(e){

		// 		$('#all-blog-titles').hide();
		// 		var douthtml = '<h2>' + 'text' + '</h2>';
		// 		var douthtml = '<h2>'+ 'Title: ' + title[4] + '</h2>';
		// 		douthtml = douthtml + '<div class="bcontent">' + 'Time: ' + time[4]+'</div>';
		// 		douthtml = douthtml + '<p>'+ 'Body : ' + text[4] + '</p>';
		// 		douthtml = douthtml + '<div class="container" id=editbox><form><div class="form-group"><textarea class="form-control status-box" id="edit-box" rows="2" placeholder="Edit Blog Text?"></textarea></div></form></div>';
		// 		douthtml = douthtml + '<a href = "#" id = "editbtn" class="btn btn-primary" role="button">Edit This Entry</a><p class="counter">140</p>';
		// 		doutputPageContent();

		// 		function doutputPageContent() {
		// 			$('#single-blog-detail').html(douthtml);
		// 		}
			

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
