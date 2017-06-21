angular.module('stacks', [])
.controller('StacksController', ['$q', '$scope', '$stateParams', '$state', 'Service', 'ServiceHelper', 'Container', 'Notifications', 'Pagination', 'Task', 'Node', 'Authentication', 'UserService', 'ModalService', 'ResourceControlService', 'StackService',
function ($q, $scope, $stateParams, $state, Service, ServiceHelper, Container, Notifications, Pagination, Task, Node, Authentication, UserService, ModalService, ResourceControlService, StackService) {
  $scope.state = {};
  $scope.state.selectedItemCount = 0;
  $scope.state.pagination_count = Pagination.getPaginationCount('stacks');
  $scope.sortType = 'Name';
  $scope.sortReverse = false;

  $scope.changePaginationCount = function() {
    Pagination.setPaginationCount('stacks', $scope.state.pagination_count);
  };

  $scope.order = function (sortType) {
    $scope.sortReverse = ($scope.sortType === sortType) ? !$scope.sortReverse : false;
    $scope.sortType = sortType;
  };

  $scope.selectItem = function (item) {
    if (item.Checked) {
      $scope.state.selectedItemCount++;
    } else {
      $scope.state.selectedItemCount--;
    }
  };

  function initView() {
    $('#loadingViewSpinner').show();

    var includeServices = $scope.applicationState.endpoint.mode.provider === 'DOCKER_SWARM_MODE';

    StackService.stacks(includeServices)
    .then(function success(data) {
      $scope.stacks = data;
    })
    .catch(function error(err) {
      $scope.stacks = [];
      Notifications.error('Failure', err, 'Unable to retrieve stacks');
    })
    .finally(function final() {
      $('#loadingViewSpinner').hide();
    });
  }

  initView();
}]);