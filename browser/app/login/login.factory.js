app.factory('LoginFactory',function($http){
	var credential = null;
	return {
		login: function(login){
			return $http.post('/login',login)
					.then(function(res){
						console.log('should be user id', res.data);
						credential = res.data;
						return res;
					}).catch(function(err){
						return err;
					});
		},
		getCredential: function(){
			return credential;
		},
		signUp: function(user){
			return $http.post('/api/users',user)
				.then(function(res){
					return res;
				}).catch(function(err){
					console.log(err);
				})
		}
	}
})