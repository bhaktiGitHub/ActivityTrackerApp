$.getJSON("/myActivities" , function(data)
	{
		console.log(data);
	
$('.selectSched').change(function()
{
	$('.activityListBySched').empty();
	//var schedule = $('.selectSched:selected').val();
	var schedule = this.value;
	$.each(data , function(key , val){
		console.log(schedule);
		console.log(val.schedule);
	if(schedule === val.schedule)
			{
				console.log("matched");
				$('.activityListBySched').append('<div class="'+val._id+'"><span class="actName"> '+val.name+'</span><span class="actName"> '+val.days+'</span><div class="btn"><button class="update">Update</button> <button class="delete">Delete</button></div></div>');
			}
})//end each

})//end change
})//end getJSON
