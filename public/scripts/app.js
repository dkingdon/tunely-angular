/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);

AlbumsIndexController.$inject = ['$http'];

function AlbumsIndexController ($http) {
  var vm = this;
  vm.newAlbum = {};
  vm.newAlbum = {
    name: 'Viva Hate',
    artistName: 'Morrissey'
  };

  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(function successCallback(response) {
    vm.albums = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  vm.createAlbum = function () {
    $http({
      method: 'POST',
      url: '/api/albums',
      data: vm.newAlbum,
    }).then(function successCallback(response) {
      vm.albums.push(response.data);
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }

  vm.deleteAlbum = function (album) {
    $http({
      method: 'DELETE',
      url: '/api/albums/' + album._id,
    }).then( function deleteSuccess (deletedAlbum) {
      var index = vm.albums.indexOf(album); // need to specify 'album' to get it to delete the correct one on the fe.
      vm.albums.splice(index, 1);
      console.log('deleting', deletedAlbum);
    }, function deleteError (err) {
      console.log('error deleting album', err)
    });
  }

  vm.editAlbum = function (album) {
    $http({
      method: 'PUT',
      url: '/api/albums/' + album._id,
      data: album,
    }).then(function undateSuccess(json){
    }, function editError(err) {
      console.log('error updateing album', err);
    });
  }

  // vm.editAlbum = function (album) {
  //   $http({
  //     method: 'PUT',
  //     url: '/api/albums/' + album._id,
  //     data: {
  //       name: album.name,
  //       artistName: album.artistName,
  //       releaseDate: album.releaseDate
  //     }
  //   }).then(function undateSuccess(updatedAlbumInfo){
  //     var index = vm.albums.indexOf(updatedAlbumInfo);
  //     vm.albums.splice(index, 1, updatedAlbumInfo);
  //   }, function editError(err) {
  //     console.log('error updateing album', err);
  //   });
  // }

} //End of controller
