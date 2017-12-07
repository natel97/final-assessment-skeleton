import templateUrl from './signup.component.html'

/* @ngInject */
class signup {
  constructor($log, $state, flightService, $scope) {

    flightService.newMessage("Hello", "World")
    if (flightService.loggedIn)
      $state.go('flightIndex')
    this.$scope = $scope
    this.flightService = flightService
    this.signUpForApp = () => {
      flightService.newUser(this.email, this.password, this.firstName, this.lastName)
        .then((response) => {
          if (response.data == true) {
            this.flightService.newMessage("Welcome", "Welcome to our flights!", () => {
              $state.go("flightIndex")
            })
            this.flightService.loggedIn = true;
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
