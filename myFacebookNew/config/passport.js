var mqClient = require('../rpc/client');
var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../model/user');
var bcrypt   = require('bcrypt');

module.exports = function(passport) {

   passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

   passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
   
   passport.use('local-driver-login', new LocalStrategy({
       usernameField : 'email',
       passwordField : 'password',
       passReqToCallback : true 
   },
   function(req, email, password, done) { 
	   console.log("inside passport login");
	   
	    var username = req.param("email");
		var password = req.param("password");
		var reqType = "driverLogin";
		var msg_payload = { "username": username, "password": password, "reqType": reqType };
			
		console.log("In POST Request = UserName:"+ username+" "+password);
		mqClient.makeRequest('driver',msg_payload, function(err,results){
			if(err){
				console.log(err);
				return done(err);
			}
			else 
			{
				if(results.code == 200){
					console.log("valid Loginnnnnnn");
					var userDetails = results.result[0];
				    if (password != userDetails.password){
						console.log('not a valid pwd');
						return done(null, false, req.flash('loginMessage', 'Failure login'));
					}else{
						console.log('is a valid pwd');
					req.session.userid = userDetails.userid;
					req.session.firstname = userDetails.firstname;
					req.session.fullname = userDetails.fullname;
					req.session.save();
					return done(null, results);
					}
				}
				else {    
					
					console.log("Invalid Login");
					if (!err) {
				    return done(null, false, req.flash('loginMessage', 'No user found.')); 
				//	res.render("login",{errormessage : 'Sorry, the email or password does not match our records !!', message : ''});
					}else {
						return done(err);
			            console.log(err);
			        }
				}
			}  
		});
		
    }));
  

   passport.use('local-driver-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
         
        process.nextTick(function() {
        var email = req.param("email");
    	var password = req.param("password");
    	var newUser = new User();
        var reqType = "driverLogin";
		var msg_payload = { "username": email, "password": password, "reqType": reqType };
		console.log("In POST Request = UserName:"+ email+" "+password);
    	mqClient.makeRequest('driver',msg_payload, function(err,results){
        if(err){
        	console.log(err);
			return done(err);
    	}else{
    		console.log('results.length: '+results.result.length);
    		if(results.result != undefined && results.result.length > 0){
    			    return done(null, false);
    	    }else{
    	            var firstname = req.param("firstname");
    	            var lastname = req.param("lastname");
    	            var fullname = firstname+" "+lastname;
    	            var address = req.param("address");
    	            var city = req.param("city");
    	            var state = req.param("state");
    	            var zipCode = req.param("zipCode");
    	            var mobileNumber = req.param("mobileNumber");
    	            var carType = req.param("carType");
    	            reqType = "driverSignUp";
    	            msg_payload = { "email": email, "password": password, "firstname":firstname, "lastname":lastname, "address":address, "city":city,"state":state,"zipCode": zipCode,
    			    "mobileNumber":mobileNumber,"carType":carType, "reqType": reqType};
    	            mqClient.makeRequest('driver',msg_payload, function(err,results){
    	        	console.log(results.code);
    		        console.log(results);
    		        if(err){
    			        console.log(err);
    			        return done(err);
    		        }
    		        else 
    		        {
    			        if(results.code == 200){
    				    console.log("valid signup");
    				    var userDetails = results.result[0];
    				    req.session.userid = userDetails.userid;
    					req.session.firstname = userDetails.firstname;
    					req.session.fullname = userDetails.fullname;
    					req.session.save();
    				    return done(null, newUser);
    		         }
    			     else {    
    				    console.log("Invalid signup");
    				    return done(null, false);
    			     }
    		    }  
    	      });
            }
    	  }
      });
     });
    }));
   
   passport.use('local-rider-login', new LocalStrategy({
       usernameField : 'email',
       passwordField : 'password',
       passReqToCallback : true 
   },
   function(req, email, password, done) { 
	   console.log("inside passport login");
	   
	    var username = req.param("email");
		var password = req.param("password");
		var reqType = "riderLogin";
		var msg_payload = { "username": username, "password": password, "reqType": reqType };
			
		console.log("In POST Request = UserName:"+ username+" "+password);
		mqClient.makeRequest('rider',msg_payload, function(err,results){
			if(err){
				console.log(err);
				return done(err);
			}
			else 
			{
				if(results.code == 200){
					console.log("valid Loginnnnnnn");
					var userDetails = results.result[0];
				    if (password != userDetails.password){
						console.log('not a valid pwd');
						return done(null, false, req.flash('loginMessage', 'Failure login'));
					}else{
					console.log('is a valid pwd');
					req.session.userid = userDetails.userid;
					req.session.firstname = userDetails.firstname;
					req.session.fullname = userDetails.fullname;
					req.session.save();
					return done(null, results);
					}
				}
				else {    
					
					console.log("Invalid Login");
					if (!err) {
				    return done(null, false, req.flash('loginMessage', 'No user found.')); 
				//	res.render("login",{errormessage : 'Sorry, the email or password does not match our records !!', message : ''});
					}else {
						return done(err);
			            console.log(err);
			        }
				}
			}  
		});
		
    }));
  

   passport.use('local-rider-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
         
        process.nextTick(function() {
        console.log(req.body);
        var email = req.param("email");
    	var password = req.param("password");
    	var newUser = new User();
    	var reqType = "riderLogin";
		var msg_payload = { "username": email, "password": password, "reqType": reqType };
		console.log("In POST Request = UserName:"+ email+" "+password);
    	mqClient.makeRequest('driver',msg_payload, function(err,results){
        if(err){
        	console.log(err);
			return done(err);
    	}else{
    		console.log('results.length: '+results.result.length);
    		if(results.result != undefined && results.result.length > 0){
    			    return done(null, false);
    	    }else{
                    var firstname = req.param("firstname");
    	            var lastname = req.param("lastname");
    	            var fullname = firstname+" "+lastname;
    	            var address = req.param("address");
    	            var city = req.param("city");
    	            var state = req.param("state");
    	            var zipCode = req.param("zipCode");
    	            var mobileNumber = req.param("mobileNumber");
    	            var creditcardNumber = req.param("creditcardNumber");
    	            var reqType = "riderSignUp";
    	            var msg_payload = { "email": email, "password": password, "firstname":firstname, "lastname":lastname, "address":address, "city":city,"state":state,"zipCode": zipCode,
    			    "mobileNumber":mobileNumber,"creditcardNumber":creditcardNumber, "reqType": reqType};
    	            mqClient.makeRequest('driver',msg_payload, function(err,results){
    		             console.log(results);
    		             if(err){
    			            console.log(err);
    			            return done(err);
    		             }
    		             else 
    		             {
    			            if(results.code == 200){
    				            console.log("valid signup");
    				            return done(null, newUser);
    		              }
    			          else {    
    				           console.log("Invalid signup");
    				           return done(null, false);
    			          }
    		    		    }  
    		    	    });
    		          }
    		    	}
    		      });
    		  });
        }));
   
   
   passport.use('local-admin-login', new LocalStrategy({
       usernameField : 'email',
       passwordField : 'password',
       passReqToCallback : true 
   },
   function(req, email, password, done) { 
	   console.log("inside passport login");
	   
	    var username = req.param("email");
		var password = req.param("password");
		var reqType = "adminLogin";
		var msg_payload = { "username": username, "password": password, "reqType": reqType };
			
		console.log("In POST Request = UserName:"+ username+" "+password);
		mqClient.makeRequest('admin',msg_payload, function(err,results){
			if(err){
				console.log(err);
				return done(err);
			}
			else 
			{
				if(results.code == 200){
					console.log("valid Loginnnnnnn");
					console.log('inside passprt'+results.result[0]);
					var userDetails = results.result[0];
					if (password != userDetails.Password){
						console.log('not a valid pwd');
						return done(null, false, req.flash('loginMessage', 'Failure login'));
					}else{
					console.log('is a valid pwd');
					req.session.userid = userDetails.userid;
					req.session.firstname = userDetails.firstname;
					req.session.fullname = userDetails.fullname;
					req.session.save();
					return done(null, results);
					}
				}
				else {    
					
					console.log("Invalid Login");
					if (!err) {
				    return done(null, false, req.flash('loginMessage', 'No user found.')); 
				//	res.render("login",{errormessage : 'Sorry, the email or password does not match our records !!', message : ''});
					}else {
						return done(err);
			            console.log(err);
			        }
				}
			}  
		});
		
    }));
  

   passport.use('local-admin-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
         
        process.nextTick(function() {
        console.log(req.body);
        var email = req.param("email");
    	var password = req.param("password");
    	var newUser = new User();
    	var reqType = "adminLogin";
		var msg_payload = { "username": email, "password": password, "reqType": reqType };
		console.log("In POST Request = UserName:"+ email+" "+password);
		console.log('before login');
    	mqClient.makeRequest('admin',msg_payload, function(err,results){
    		console.log(results);
    		console.log(results.result);
        if(err){
        	console.log(err);
			return done(err);
    	}else{
    		if(results.result != undefined && results.result.length > 0){
    			    return done(null, false);
    	    }else{
                    var firstname = req.param("firstname");
    	            var lastname = req.param("lastname");
    	            var fullname = firstname+" "+lastname;
    	            var address = req.param("address");
    	            var city = req.param("city");
    	            var state = req.param("state");
    	            var zipCode = req.param("zipCode");
    	            var mobileNumber = req.param("mobileNumber");
    	            var reqType = "adminSignup";
    	            var msg_payload = { "email": email, "password": password, "firstname":firstname, "lastname":lastname, "address":address, "city":city,"state":state,"zipCode": zipCode,
    			    "mobileNumber":mobileNumber,"reqType": reqType};
    	            mqClient.makeRequest('driver',msg_payload, function(err,results){
    		             console.log(results);
    		             if(err){
    			            console.log(err);
    			            return done(err);
    		             }
    		             else 
    		             {
    			            if(results.code == 200){
    				            console.log("valid signup");
    				            req.session.userid = userDetails.userid;
    							req.session.firstname = userDetails.firstname;
    							req.session.fullname = userDetails.fullname;
    							req.session.save();
    				            return done(null, newUser);
    		              }
    			          else {    
    				           console.log("Invalid signup");
    				           return done(null, false);
    			          }
    		    		    }  
    		    	    });
    		          }
    		    	}
    		      });
    		  });
        }));


};
