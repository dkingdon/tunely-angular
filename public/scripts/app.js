/* CLIENT-SIDE JS
 *
 * This is your main angular file. Edit as you see fit.
 *
 */

angular
  .module('tunely', [])
  .controller('AlbumsIndexController', AlbumsIndexController);
  // ^ the first argument is a string naming the controller,
  // the second argument is a function that defines the capacities
  // of the controller.

AlbumsIndexController.$inject = ['$http'];
function AlbumsIndexController ( $http ) {
  var vm = this;
  vm.newAlbum = {};

  vm.newAlbum = {
      name: 'Viva Hate',
      artistName: 'Morrissey'
  };

  vm.albums = [];

  // Shows album data from db on page
  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(function albumGetSuccess (res) {
    vm.albums = res.data
  }, function (err) {
    console.log('GET failed', err);
  })

  // Adds new albums via form on page
  vm.createAlbum = function () {
    $http({
      method: 'POST',
      url: '/api/albums',
      data: vm.newAlbum,
    }).then(function newAlbumCreateSuccess(res){
      vm.albums.push(res.data);
    }, function newAlbumErro(err) {
      console.log('error posting', err);
    });
  }

} //END OF CONTROLLER
