angular.module('starter.services', [])

.service('Profile', function() {
  var user = {}

  var setUser = function(name, email, token, gender, photoURL, userId, profileLink) {
    user.name = name,
    user.email = email,
    user.token = token,
    user.gender = gender,
    user.photo = photoURL,
    user.id = userId,
    user.facebook_profile = profileLink
  }

  var getUser = function() {
    return user;
  }

  return {
    setUser: setUser,
    getUser: getUser
  }
})

.factory('UserAPI', function($resource) {
  return $resource("http://localhost:3000/api/users/:ID", null, {
    update: {
      method: 'PUT'
    }
  });
})

.factory('UserResource', function(UserAPI, $q){

  var service = {};

  service.register = function(ride) {
    return $q(function(success, error){
      if(ride.id) {
        UserAPI.update({id: ride.id}, ride, function(){
          success({
            message: "Carona " + ride.title + " foi atualizada com sucesso!",
            create: false
          });
        }, function(erro){
          // console.log(erro);
          error({
            message: "Não foi possivel editar a carona " + ride.title
          });
        });
      } else {
        UserAPI.save(ride, function() {
            success({
              message: "Carona " + ride.title + " incluída com sucesso!",
              create: true
            });
        }, function(erro) {
            // console.log(erro);
            error({
              message: "Não foi possível criar a carona " + ride.title
            });
        });
      }
    });
  };
  return service;
});
