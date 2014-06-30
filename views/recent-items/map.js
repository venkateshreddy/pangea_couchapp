function(doc) {
  emit(doc._id, {
      _id : doc._id,
      url : doc.url,
      type : doc.request_type,
      method : doc.method_name,
      access_token : doc.access_token,
      data : decodeURIComponent(doc.data)
});
 
};
