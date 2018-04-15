
$('.day').click(function(){
		console.log("day clicked");
		 $(this).toggleClass('dayselected')
	})	
	
	

	$('.addActivity').click(function()
	{
		var icon = $('input[name="icon"]:checked').val();
		var schedule = $('input[name="schedule"]:checked').val();
		console.log(schedule);
		var activity = $('#activity').val();
		console.log(activity);
		var username = $('.user').attr('id');
		var data = {}
		var days =[]
		var weeklyFrequency = $('.weeklyFrequency').val();
		var monthlyFrequency = $('.monthlyFrequency').val();

		$('.day').each(function(index,value)
		{
			if($(this).hasClass('dayselected'))
			{
				var day = $(this).attr('id')
				days.push(day);
			}
			
		})
		var times = []
		$('input[name="time"]').each(function(index,value)
		{
			if($(this).is(':checked'))
		{
			console.log($(this).val());
			times.push($(this).val());
		}

		})
		
		data.name=activity;
		data.icon = icon;
		data.schedule = schedule;
		data.dayTime = times;
		data.username=username;
		data.dayTime = times;
		if(data.schedule === "Daily")
		{
			data.days = days;
		}
		if(data.schedule === "Weekly")
		{
			data.weeklyFrequency =weeklyFrequency;
		}
		if(data.schedule === "Monthly")
		{
			data.monthlyFrequency = monthlyFrequency;
		}
		

		console.log(data)
		$.ajax({
			type:"POST",
			url:"/newActivity",
			contentType:"application/json",
			data:JSON.stringify(data),
			success:function(result)
			{
				console.log(result);
				$('.ActivityList').append('<div><h2>'+result.name+'</h2><em>'+result.updatedAt+'</em><button class="delete" id='+result._id+'>Delete</button></div>') },
				 error:function()
			{
				console.log("error");
			}

		})
    window.location.href = "/"
    
	})

	$('input[name="schedule"]').change(function(){

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
