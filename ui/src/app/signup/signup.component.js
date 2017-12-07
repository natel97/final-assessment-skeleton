import templateUrl from './signup.component.html'

/* @ngInject */
class signup {
  constructor($log, $state, flightService, $scope) {

    if (flightService.loggedIn)
      $state.go('flightIndex')
    this.$scope = $scope
    this.flightService = flightService
    this.signUpForApp = () => {
      flightService.newUser(this.email, this.password, this.firstName, this.lastName)
        .then((response) => {
          if (response.data == true) {
            this.flightService.loggedIn = true;
            $state.go("flightIndex")
          }
        })
    }
  }
}

export default {
  templateUrl,
  controller: signup,
  controllerAs: 'signupPage'
}
