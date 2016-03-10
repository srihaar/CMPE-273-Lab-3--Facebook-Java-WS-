var fbModule = angular.module("fbModule", ['ui.router']);

fbModule.controller("fbController", function($http, $scope, $rootScope, $state){
	var $rootScope = [];
	
	console.log("am in home controller");
	$state.go("feed");
	$scope.logout=function(){
		console.log("am in logout");
		$http.get("/adminLogOut").
		  then(function(response) {
				  window.location.assign("/");
			  }, function(response) {
				  console.log(response);
			  });
		
		
	};
	$scope.search=function(){
		console.log("am in logout");
		var searchTerm = $scope.searchTerm;
		console.log(searchTerm);
		$http.post('/searchResults/'+searchTerm).
		  then(function(response) {
				  $scope.userResults = response.data.userResults;
				  $state.go("feed");
			  }, function(response) {
				  console.log(response);
			  });
		
		
	};
	
	$scope.viewProfile=function(email){
		
		$http.post('/getProfile/'+email).
		  then(function(response) {
				  console.log("am in view profile");
				  
				  $state.go("profile",{},{reload:true});
			  }, function(response) {
				  console.log(response);
			  });
		
	}
	
	$scope.getPendingRequests=function(){
		 $http.get("/getPendingRequests").
		  then(function(response) {
				  $scope.pendingRequests= response.data.pendingRequests;	
				  $scope.notifications = response.data.notifications;
				  
			  }, function(response) {
				  console.log(response);
			  });
		
		
	}
	
	 $scope.acceptRequest = function(email,index) {
         
         
           $http.post('/acceptRequest/'+email)
             .then(function(response){
        	   console.log("in response");
        	  $scope.pendingRequests[index].approve=true;
        	  
        	  $scope.pendingRequests[index].hideReject=true;
        	  
        	 
     //       window.location.assign("/profile");
           
            },function(error){
                  alert(error);
        });             
     }  
  
	
});

fbModule.config(function($stateProvider, $urlRouterProvider) {


	  $stateProvider
	    .state("feed", {
	    	views: {
	    		"newsFeed" : {
	    			  url         : "/getFeed",
	    			  templateUrl : "/getFeed",
	    			  controller  : function($scope , $http, $state,$rootScope ){
	    				    console.log("am in news feed controller");
	    				  $http.get("/getNewsFeed").
	    				  then(function(response) {
	    						  $scope.newsfeed1= response.data.newsfeed1;	
	    						  $scope.newsfeed2 = response.data.newsfeed2;
	      						  $scope.newsfeed3 = response.data.newsfeed3;
	    						  
	    					  }, function(response) {
	    						  console.log(response);
	    					  });
		    				  
		    				  
	                  $scope.submit=function(){
	                	  var desc=$scope.feed;
	                	  console.log(desc);
	                	  $http.post('/postFeed/'+desc).
	    				  
	                	  then(function(response) {
	    						  $scope.post= true;
	    						  $scope.firstname=response.data.firstname;
	    						  
	    					  }, function(response) {
	    						  console.log(response);
	    					  });
	                  }
	   
	    
	    
	    
	    
	   
	    
	    			  }
	    
	    	}}
	      
	    }).state("profile", {
	    	views: {
	    		"profileView" : {
	    			  url         : "/profile",
	    			  templateUrl : "/profile",
	    			  controller  : function($scope , $http, $state,$rootScope ){
	    				  
	    					  
	    					
	    				  console.log("am in profile state controller");
	    				  $http.get('/getProfileDetails').
	    				  then(function(response) {
	    						  console.log('am in get profile details');
	    						  
	    						  $scope.profile=response.data.profile;
	    						  $scope.friends1=response.data.friends.friends1;
	    						  console.log(response.data.friends.friends1);
	    						  $scope.friends2=response.data.friends.friends2;
	    						  if(response.data.status=="25"){
		    						  $scope.status5=true;
		    						  }
	    						  if(response.data.status=="nothing"){
		    						  $scope.status1=true;
		    						  }
	    						  
	    						  if(response.data.status=="friends"){
	    						  $scope.status4=true;
	    						  }
	    					
	    						  if(response.data.status=="waiting2"){
	    							  $scope.status3=true;
	    						  }
	    						  
	    						  if(response.data.status=="waiting1"){
	    							  $scope.status2=true;
	    						  }
	    						  
	    					  }, function(response) {
	    						  console.log(response);
	    					  });
	    				  $scope.btxt="Accept Request";
	    				  $scope.addtxt="Add Friend"
	    				  $scope.addFriend=function(email){
	    					  $http.post('/addFriend/'+email)
	    			             .then(function(response){
	    			        	   console.log("in response");
	    			        	   
	    			        	   $scope.add=true;
	    			        	  $scope.addtxt="Friend Request Sent";
	    			        	  
	    			        	  
	    			        	 
	    			     //       window.location.assign("/profile");
	    			           
	    			            },function(error){
	    			                  alert(error);
	    			        });           
                             
	    				  
	    				  }
                        
	    				  $scope.acceptRequest = function(email) {
	    				         
	    				         
	    			           $http.post('/acceptRequest/'+email)
	    			             .then(function(response){
	    			        	   console.log("in response");
	    			        	   $scope.hideReject=true;
	    			        	   $scope.approve=true;
	    			        	  $scope.btxt="Friends";
	    			        	  
	    			        	  
	    			        	 
	    			     //       window.location.assign("/profile");
	    			           
	    			            },function(error){
	    			                  alert(error);
	    			        });             
	    			     }  
	    			
		    				  
	    
	   
	    
	    
	    
	    
	   
	    
	    			  }
	    
	    	}}
	      
	    }).state("myProfile", {
	    	views: {
	    		"myProfileView" : {
	    			  url         : "/profileView",
	    			  templateUrl : "/profileView",
	    			  controller  : function($scope , $http, $state,$rootScope ){
	    	
	    				  $http.get('/getMyProfile').
	    				  then(function(response) {
	    						  
	    						  
	    						  $scope.profile=response.data.profile;
	    						$scope.status5=true;
	    					  }, function(response) {
	    						  console.log(response);
	    					  });
	    				 
	    			
	        				  	  }

	    	}}
	      

	    });
	  
	    
})












