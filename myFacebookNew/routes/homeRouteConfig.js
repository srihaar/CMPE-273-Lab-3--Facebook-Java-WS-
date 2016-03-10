var soap = require('soap');
var baseURL = "http://localhost:8080/MyFacebookNewServer/services";
var profile={};

function homeRouteConfig(app,passport){
	
	this.app=app;
	this.passprt=passport;
	this.routeTable= [];
	this.init();
}

homeRouteConfig.prototype.init = function(){
	
	var self = this;
	this.addRoutes();
	this.processRoutes();
}


homeRouteConfig.prototype.processRoutes = function(){
	
	var self = this;
	self.routeTable.forEach(function(route){
		
		if(route.requestType == 'get'){
			self.app.get(route.requestUrl,route.callbackFunction);
		}
		else if(route.requestType == 'post'){
			self.app.post(route.requestUrl,route.callbackFunction);
		}
		
	});
}

homeRouteConfig.prototype.addRoutes = function(){
	
	var self =  this;
	
    
    



self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/',
    callbackFunction : function (req,res){
    	
    	res.render('login',{ title: 'Facebook' });
    	}
    
});

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/gettingstarted',
    callbackFunction : function (req,res){
    	
    	res.render('gettingstarted',{ title: 'Facebook' });
    	}
    
});

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getFeed',
    callbackFunction : function (req,res){
    	
    	res.render('newFeed');
    	}
    
});

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/profile',
    callbackFunction : function (req,res){
    	
    	res.render('profile');
    	}
    
});


self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/pending',
    callbackFunction : function (req,res){
    	
    	res.render('pendingRequests');
    	}
    
});

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/profileView',
    callbackFunction : function (req,res){
    	
    	res.render('profile');
    	}
    
});

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getMyProfile',
    callbackFunction : function (req,res){
    	
    	res.send({'profile':req.session.userProfile,"friends":req.session.friends,"status":"25"});
    	}
    
});

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getProfileDetails',
    callbackFunction : function (req,res){
    	console.log("in session"+req.session.searchProfile);
    	res.send({"profile":req.session.searchProfile,"friends":req.session.friends,"status":req.session.status});
    	}
    
});
    
self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/home',
    callbackFunction : function (req,res){
    	console.log("fofr home render"+req.session.username);
    	if(req.session.username){
    	    console.log("rendering home");
    		res.render('homepage',{"username":req.session.username});
    	}
    	else{
    		res.render('login');
    	}
    	}
    
}); 

self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getNewsFeed',
    callbackFunction : function (req,res){
    	var email = req.session.username;
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/NewsFeed?wsdl";
   	  var args = {email: req.session.username};
   	  soap.createClient(url,option, function(err, client) {
   		  console.log("sri 2");
   	      client.getNewsFeed(args, function(err, result) {
   	    	  console.log(result);
   	    	  var data = JSON.parse(result.getNewsFeedReturn);
   	    	  console.log(data);
   	    	  console.log(data.statusCode);
   	    	 
   	    	  res.send(data);
   	      });
   	  });
    	
    	}
    
}); 


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/postFeed/:desc',
    callbackFunction : function (req,res){
    	var email = req.session.username;
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/NewsFeed?wsdl";
   	  var args = {"email": req.session.username,"desc":req.params.desc,"firstname":req.session.userProfile[0].firstname};
   	  soap.createClient(url,option, function(err, client) {
   		  console.log("sri 2");
   	      client.postFeed(args, function(err, result) {
   	    	  console.log(result);
   	    	  var data = JSON.parse(result.postFeedReturn);
   	    	  console.log(data);
   	    	  console.log(data.statusCode);
   	    	 
   	    	  res.send({"firstname":req.session.userProfile[0].firstname});
   	      });
   	  });
    	
    	}
    
}); 



self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/getPendingRequests',
    callbackFunction : function (req,res){
    	var email = req.session.username;
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/Friends?wsdl";
   	  var args = {email: req.session.username};
   	  soap.createClient(url,option, function(err, client) {
   		  console.log("sri 2");
   	      client.getPendingRequests(args, function(err, result) {
   	    	  console.log(result);
   	    	  var data = JSON.parse(result.getPendingRequestsReturn);
   	    	  console.log(data);
   	    	  console.log(data.statusCode);
   	    	 
   	    	  res.send(data);
   	      });
   	  });
    	
    	}
    
}); 


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/acceptRequest/:email',
    callbackFunction : function (req,res){
    	
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/Friends?wsdl";
   	  var args = {userEmail: req.session.username,fEmail:req.params.email};
   	  soap.createClient(url,option, function(err, client) {
   		  console.log("sri 2");
   	      client.acceptRequest(args, function(err, result) {
   	    	  console.log(result);
   	    	  var data = JSON.parse(result.acceptRequestReturn);
   	    	  console.log(data);
   	    	  console.log(data.statusCode);
   	    	 
   	    	  res.send(data);
   	      });
   	  });
    	
    	}
    
}); 


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/addFriend/:email',
    callbackFunction : function (req,res){
    	
    	var option = {ignoredNamespaces : true};
   	 var url = baseURL+"/Friends?wsdl";
   	  var args = {userEmail: req.session.username,fEmail:req.params.email};
   	  soap.createClient(url,option, function(err, client) {
   		  console.log("sri 2");
   	      client.addFriend(args, function(err, result) {
   	    	  console.log(result);
   	    	  var data = JSON.parse(result.addFriendReturn);
   	    	  console.log(data);
   	    	  console.log(data.statusCode);
   	    	 
   	    	  res.send(data);
   	      });
   	  });
    	
    	}
    
}); 


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/checkLogin/:email/:password',
    callbackFunction : function (req,res){
    	
    	console.log("am here");
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Login?wsdl";
    	  var args = {username: req.param('email'),password: req.param('password')};
    	  soap.createClient(url,option, function(err, client) {
    		  console.log("sri 2");
    	      client.loginCheck(args, function(err, result) {
    	    	  console.log(result);
    	    	  var data = JSON.parse(result.loginCheckReturn);
    	    	  console.log(data);
    	    	  console.log(data.statusCode);
    	    	  req.session.userProfile=data.userProfile;
    	    	  req.session.username=data.email;
    	    	  res.send(data);
    	      });
    	  });
    	
    }
});


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/signup/:email/:firstname/:lastname/:password/:gender/:dob',
    callbackFunction : function (req,res){
    	
    	console.log("am here");
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Login?wsdl";
    	  var args = {email: req.param('email'),firstname:req.param('firstname'),lastname:req.param('lastname'),password: req.param('password'),gender:req.param('gender'),dob:req.param('dob')};
    	  soap.createClient(url,option, function(err, client) {
    		  console.log("sri 2");
    	      client.signup(args, function(err, result) {
    	    	  console.log(result);
    	    	  var data = JSON.parse(result.signupReturn);
    	    	  
    	    	  console.log(data);
    	    	  console.log(data.statusCode);
    	    	 
    	    	  res.send(data);
    	      });
    	  });
    	
    }
});




self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/searchResults/:searchTerm',
    callbackFunction : function (req,res){
    	
    	console.log("am here");
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Search?wsdl";
    	  var args = {"searchTerm":req.params.searchTerm};
    	  soap.createClient(url,option, function(err, client) {
    		  console.log("sri 2");
    	      client.getSearchResults(args, function(err, result) {
    	    	  console.log(result);
    	    	  var data = JSON.parse(result.getSearchResultsReturn);
    	    	  console.log(data);
    	    	  console.log(data.statusCode);
    	    	  
    	    	  res.send(data);
    	      });
    	  });
    	
    }
});


self.routeTable.push({
	
	requestType : 'post',
    requestUrl  : '/getProfile/:email',
    callbackFunction : function (req,res){
    	
    	console.log("am here");
    	var option = {ignoredNamespaces : true};
    	 var url = baseURL+"/Profile?wsdl";
    	  var args = {"uEmail":req.session.username,"fEmail":req.params.email};
    	  var args1={"email":req.params.email};
    	  console.log(args.fEmail);
    	  console.log(args.uEmail);
    	  soap.createClient(url,option, function(err, client) {
    		  console.log("sri 2");
    	      client.getProfile(args, function(err, result) {
    	    	  console.log(result);
    	    	  var data = JSON.parse(result.getProfileReturn);
    	    	  
    	    	  
    	    	  
    	    	  req.session.searchProfile=data.profile;
    	    	  req.session.status = data.status;
    	    	  
    	      });
    	      client.getFriends(args1,function(err,result){
	    		  
    	    	  console.log("am in fr");
    	    		  console.log(result);
        	    	  var friends = JSON.parse(result.getFriendsReturn);
        	    	  

          	    	req.session.friends=friends;
          	    	res.send({statusCode:200});
    	    	  });
    	  });
    	
    }
});


self.routeTable.push({
	
	requestType : 'get',
    requestUrl  : '/adminLogOut',
    callbackFunction : function (req,res){
    	console.log("logout is here");
    	req.session.destroy();
    	res.send({title:""});
    	}
    
}); 




 
    

	
	
	
   
    
   
    
}



module.exports = homeRouteConfig;