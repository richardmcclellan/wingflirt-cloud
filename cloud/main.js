
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});



Parse.Cloud.afterSave("Message", function(request) {
  query = new Parse.Query("Post");
  query.get(request.object.get("post").id, {
    success: function(post) {
    	Parse.Push.send({
	  		channels: [ "new_messages" ],
	  		data: {
	     		alert: "Quit Your Jibba Jabba"
	  		});
  		};
  	}, 
  	error: function(err) { 
		console.log(err);
	}
  });
});