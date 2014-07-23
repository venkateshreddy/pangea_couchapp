function(doc) {
	 function getTodayDateString(){
	        date_temp = new Date();
	        return date_temp.getFullYear()+""+roundMonth(date_temp.getMonth()+1)+""+date_temp.getDate()+"000000";
	        function roundMonth(month){
	                return (month < 10 ? '0' : '') + month
	        }
	 }
	 var ct = doc.created_time;
	 if(typeof ct === 'undefined')
	 	return;
	 if(parseInt(ct)>parseInt(getTodayDateString())){
		 emit(doc._id, {
		      _id : doc._id,
		      url : doc.url,
		      type : doc.request_type,
		      method : doc.method_name,
		      access_token : doc.access_token,
		      data : decodeURIComponent(doc.data),
		      response : doc.response
		});
	}

};