import templateUrl from './login.component.html'

/* @ngInject */
class login {
  constructor($state, flightService, $scope) {
    if (flightService.loggedIn)
      $state.go('flightIndex')
    this.$scope = $scope
    this.flightService = flightService
    this.loginToApp = () => {
      flightService.logIntoUser(this.email, this.password).then((result) => {
        if (result.data == true) {
          this.flightService.loggedIn = true;
          this.flightService.loggedIn = true;
          $state.go("flightIndex");
        } else {
          this.flightService.newMessage("Incorrect Login Information", "A user exists, however the password is incorrect!")
        }
      }).catch(() => {
        this.flightService.newMessage("404", "The user does not exist! Create an account!")
      })

    }
  }
}

export default {
  templateUrl,
  controller: login,
  controllerAs: 'loginPage'
}
