console.log('app.js is connected')

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

  AlbumsIndexController.$inject = ['$http'];
  function AlbumsIndexController ( $http ) {
    var vm = this;
    vm.newAlbum = {};

    vm.newAlbum = {
      name: 'License to Ill',
      artistName: 'Beastie Boys'
    };

    vm.albums = [];

    $http ({
      method: 'GET',
      url: '/api/albums'
    }).then(function albumGetSuccess (res) {
      vm.albums = res.data;
    }, function (err) {
      console.log('error getting albums', err)
    });

    vm.createAlbum = function () {
      $http({
        method: 'POST',
        url: '/api/albums',
        data: vm.newAlbum,
      }).then( function createSuccess (res) {
        vm.albums.push(res.data);
      }, function createError (err) {
        console.log('error creating', err);
      });
    }

    vm.deleteAlbum = function (album) {
      $http({
        method: "DELETE",
        url: '/api/albums/' + album._id,
      }).then(function deleteSuccess (deletedAlbum) {
        var index = vm.albums.indexOf(album);
        vm.albums.splice(index, 1);
      }, function deleteError (err) {
        console.log('error deleting album', err);
      });
    }

  } // END OF CONTROLLER
