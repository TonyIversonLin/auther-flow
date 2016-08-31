'use strict'

app.controller('SignUpController',function($state,$scope,LoginFactory){
	console.log("here")
	$scope.signup = {};
	$scope.err = false;
	$scope.signUp = function(){
			console.log('about to sign up');
			LoginFactory.signUp($scope.signup)
			.then(function(res){
				console.log(res);
				if(res.status === 201){
				console.log('sign up successfully')
				$scope.credential = LoginFactory.getCredential();
				$state.go('stories');
				}else{
					$scope.err = true;
				}
			})
	};

})