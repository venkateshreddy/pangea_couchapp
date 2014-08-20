function(doc) {
	 function getTodayDateString(){
	        date_temp = new Date();
	        return date_temp.getFullYear()+""+roundMonth(date_temp.getMonth()+1)+""+date_temp.getDate()+"000000";
	        function roundMonth(month){
	                return (month < 10 ? '0' : '') + month
	        }
	 }
	 function getTimeInFormat(timestr){
	 	//alert(timestr);
	 	return timestr.substring(0,4)+"-"+timestr.substring(4,6)+"-"+timestr.substring(6,8)+" "+timestr.substring(8,10)+":"+timestr.substring(10,12)+":"+timestr.substring(12,14);
	 }
	 var ct = doc.created_time;
	 if(typeof ct === 'undefined')
	 	return;
	 if(parseInt(ct) >= parseInt(getTodayDateString())){
		 ct = getTimeInFormat(ct);
		 emit(doc._id, {
		      _id : doc._id,
		      time : ct,
		      url : doc.url,
		      type : doc.request_type,
		      method : doc.method_name,
		      access_token : doc.access_token,
		      data : decodeURIComponent(doc.data),
		      response : doc.response
		});
	}

};