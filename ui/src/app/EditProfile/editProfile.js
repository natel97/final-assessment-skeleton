import templateUrl from './editProfile.html'

/* @ngInject */
class editProfile {
  constructor($log, $state, flightService, $scope) {
    this.$scope = $scope
    flightService.getUserDetails().then((result) => {
      this.$scope.name = result.firstName + " " + result.lastName;
      this.$scope.email = result.emailAddress
    })
  }
}

export default {
  templateUrl,
  controller: editProfile,
  controllerAs: 'editProfile'
}
