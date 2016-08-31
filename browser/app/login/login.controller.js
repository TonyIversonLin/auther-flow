'use strict'

app.controller('LoginController',function($state,$scope,LoginFactory){
	console.log("here")
	$scope.login = {};
	$scope.err = false;
	$scope.submitLogin = function(){
			LoginFactory.login($scope.login)
			.then(function(res){
				console.log(res.status);
				if(res.status === 200){
				console.log('login successfully')
				$scope.credential = LoginFactory.getCredential();
				$state.go('stories');
				}else{
					$scope.err = true;
				}
			})
	};

})