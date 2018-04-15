var username = $('.user').attr('id');
$.getJSON("/myActivities/"+username , function(data)
	{
		console.log(data);
		$.each(data , function(key , val){
			
		if($.inArray("Morning" , val.dayTime)!==-1)
		{
			
			$('.morningAct').append('<div class="'+val.schedule+'" id="'+val._id+'"><span class="actName"> '+val.name+'</span><div class="btn"><button class="update ">Update</button> <button class="delete">Delete</button></div></div>');
		}
		if($.inArray("Afternoon" , val.dayTime)!==-1)
		{
			
			$('.afternoonAct').append('<div class="'+val.schedule+'" id="'+val._id+'"><span class="actName"> '+val.name+'</span><div class="btn"><button class="update ">Update</button> <button class="delete">Delete</button></div></div>');
		}
		if($.inArray("Evening" , val.dayTime)!==-1)
		{
			
			$('.eveningAct').append('<div class="'+val.schedule+'" id="'+val._id+'"><span class="actName"> '+val.name+'</span><div class="btn"><button class="update ">Update</button> <button class="delete">Delete</button></div></div>');
		}
		
		})
		$('.activityList div').mouseover(function(){

			$(this).children('.btn').css('display' , 'inline-block');
		})
		.mouseout(function()
		{
			$(this).children('.btn').hide();
		})
		$('span.actName').click(function()
		{
			$(this).toggleClass("strikethrough");
		})
			
	})

// Update button to update selected activity

$('body').on("click" , ".update" ,function(){
			var mongoid = $(this).parent('.btn').parent('div').attr("id");
			console.log(mongoid);
			$.getJSON("/activity/"+mongoid , function(data)
			{
			

				$('body').append(`
					<div class= "${data._id}" id ="update"><h2 class="page-header">Update Activity</h2>
					
					<label for="updateName">Name: </label><br>
					<input type= "text" id="updateName" value="${data.name}"><br><br>
					
					<label for="updateIcon">Icon: </label><br>
					<input type="radio" name="updateIcon" value="icon1" ${(data.icon=="icon1") ? "checked" : ""}> <img src="../images/icon1.png" alt ="icon1"><br>
  					<input type="radio" name="updateIcon" value="icon2" ${(data.icon=="icon2") ? "checked" : ""}> <img src="../images/Book.jpg" alt ="icon2" ><br>
  					<input type="radio" name="updateIcon" value="icon3" ${(data.icon=="icon3") ? "checked" : ""} > <img src="../images/Water.jpg" alt ="icon3"><br>
 		    		<input type="radio" name="updateIcon" value="icon4" ${(data.icon=="icon4") ? "checked" : ""}> <img src="../images/other.jpg" alt ="icon4"><br><br>

 		    		<label for="schedule">I want to repeat this activity  </label><br>

						 		 <input type="radio" name="updateSchedule" value="Daily" ${(data.schedule=="Daily") ? "checked" : ""}> Daily<br>
						  		  <input type="radio" name="updateSchedule" value="Weekly" ${(data.schedule=="Weekly") ? "checked" : ""} > Weekly<br>
						  		 <input type="radio" name="updateSchedule" value="Monthly" ${(data.schedule=="Monthly") ? "checked" : ""}> Monthly<br>

								<div class="dayWrapper" ${(data.schedule=="Daily") ? "" : "style = 'display:none'"}>						 		
						 		<label for="schedule">These Days  </label><br>
						 		<div class="updateDay ${(($.inArray("monday",data.days)!==-1)) ? "dayselected" : ""}" id="monday" >Mon</div>
						 		<div class="updateDay ${(($.inArray("tuesday",data.days)!==-1)) ? "dayselected" : ""}" id="tuesday">Tue</div>
						 		<div class="updateDay ${(($.inArray("wednesday",data.days)!==-1)) ? "dayselected" : ""}" id="wednesday">Wed</div>
						 		<div class="updateDay ${(($.inArray("thursday",data.days)!==-1)) ? "dayselected" : ""}" id="thursday">Thu</div>
						 		<div class="updateDay ${(($.inArray("friday",data.days)!==-1)) ? "dayselected" : ""}" id="friday">Fri</div>
						 		<div class="updateDay ${(($.inArray("saturday",data.days)!==-1)) ? "dayselected" : ""}" id="saturday">Sat</div>
						 		<div class="updateDay ${(($.inArray("sunday",data.days)!==-1)) ? "dayselected" : ""}" id="sunday">Sun</div><br>
						 		</div><br><br><br>

						 		<div class="weekWrapper" ${(data.schedule=="Weekly") ? "" : "style ='' display:none'"}>
						 		<label for="schedule">These many days in a week  </label><br>
						 		<select class="weeklyFrequency">
						 		<option value="1">1</option>
						 		<option value="2">2</option>
						 		<option value="3">3</option>
						 		<option value="4">4</option>
						 		<option value="5">5</option>
						 		<option value="6">6</option>
						 		</select>
						 		</div><br>

						 		<div class="monthWrapper" ${(data.schedule=="Monthly") ? "" : "style ='display:none'"}>
						 		<label for="schedule">This time of the month  </label><br>
						 		<select class="monthlyFrequency">
						 		<option value="start">start</option>
						 		<option value="middle">middle</option>
						 		<option value="end">end</option>
						 		</select>
						 		</div>
						  		 
						  		 <label for="time">In the </label><br>
						 		 <input type="checkbox" name="updateTime" value="Morning" ${(($.inArray("Morning",data.dayTime)!==-1)) ? "checked" : ""}> Morning<br>
						  		 <input type="checkbox" name="updateTime" value="Afternoon" ${(($.inArray("Afternoon",data.dayTime)!==-1)) ? "checked" : ""}> Afternoon<br>
						  		 <input type="checkbox" name="updateTime" value="Evening" ${(($.inArray("Evening",data.dayTime)!==-1)) ? "checked" : ""} > Evening<br>

						  		 <button class="updateActivity bttn">Update</button>

					</div>
					`)
				$('input[name="updateSchedule"]').change(function(){

					if(this.value==="Daily"){
						$('.dayWrapper').show();
						$('.weekWrapper').hide();
						$('.monthWrapper').hide();

					}
					else if(this.value==="Weekly"){

						$('.dayWrapper').hide();
						$('.weekWrapper').show();
						$('.monthWrapper').hide();
					}
					else {

						$('.dayWrapper').hide();
						$('.weekWrapper').hide();
						$('.monthWrapper').show();
					}

				})

				$('.updateDay').click(function(){
					
					 $(this).toggleClass('dayselected')
				})	

				$('.updateActivity').click(function()
			{
				var mongoid = $(this).parent("div").attr("class");
				console.log(mongoid);
				var icon = $('input[name="updateIcon"]:checked').val();
				var schedule = $('input[name="updateSchedule"]:checked').val();
				console.log(schedule);
				var activity = $('#updateName').val();
				var weeklyFrequency = $('.weeklyFrequency').val();
				var monthlyFrequency = $('.monthlyFrequency').val();

				console.log(activity);

				var data = {}
				var days =[]
				$('.updateDay').each(function(index,value)
				{
					if($(this).hasClass('dayselected'))
					{
						var day = $(this).attr('id')
						days.push(day);
					}
					
				})
				var times = []
				$('input[name="updateTime"]').each(function(index,value)
				{
					if($(this).is(':checked'))
				{
					console.log($(this).val());
					times.push($(this).val());
				}

				})
				
				data.name=activity;
				data.days = days;
				data.icon = icon;
				data.schedule = schedule;
				data.dayTime = times;
				data.weeklyFrequency=weeklyFrequency;
				data.monthlyFrequency = monthlyFrequency;

				console.log(data)

				$.ajax({
					type:"PUT",
					url:"/activity/"+mongoid,
					contentType:"application/json",
					data:JSON.stringify(data),
					success:function(result)
					{
						console.log(result);

						
					}, error:function()
					{
						console.log("error");
					}

		         })
				location.reload();
				
			})
			})


		})

// delete button functionality 

$('body').on("click" , ".delete" ,function(){
			var mongoid = $(this).parent('.btn').parent('div').attr("id");

			$.ajax({
				type:"DELETE",
				url:"/activity/"+mongoid ,
				success:function(result)
				{
					console.log(result);
					
				}

			})
			// $(this).parent("div").remove();
			$(this).parent('.btn').parent('div').remove();
		})
		
		$('.displayActivity').change(function()
		{
			var selected = "."+$(this).val();
			console.log(selected);

			$('.activityList').children("div").children("div").show()
			$('.activityList').children("div").children("div").not(selected).hide()
		})






		