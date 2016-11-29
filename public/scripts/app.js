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

  // Get Data
  $http({
    method: 'GET',
    url: '/api/albums'
  }).then(function albumGetSuccess (res) {
    vm.albums = res.data
  }, function (err) {
    console.log('GET failed', err);
  })

} //END OF CONTROLLER
