
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.afterSave("Message", function(request) 
{
  query = new Parse.Query("Message");
  query.get(request.object.id, 
  {
    success: function(object) 
    {
    	console.log(request);
    	push_query = new Parse.Query("Installation");
    	push_query = push_query.containsAll("channels", ["new_messages"]);
		  installation = request.object.get("installation");
    	push_query = push_query.notEqualTo("objectId", request.object.get("installation")["id"]);
    	Parse.Push.send(
    	{
	  		// channels: [ "new_messages" ],
	  		where: push_query,
	  		data: {
	     		alert: request.object.get("text")
	  		}
  		},
  		{ 
  			success: function() 
  			{
  			},
  			error: function(error)
  			{
  				console.log(err);
  			}
  		});
  	},
  	error: function(object, error) 
  	{
		console.log(err);
	}
  });
});

Parse.Cloud.define("messages", function(request, response) {
  query = new Parse.Query("Message");
  query.find({
    success: function(results) {
      messages = results;
    },

    error: function(error) {
      console.log(error);
    }
  });
  query = new Parse.Query("Comment");
  query.find({
    success: function(results) {
      comments = results;
    },
    error: function(error) {
      console.log(error);
    }
  });
  response.success(messages);
});