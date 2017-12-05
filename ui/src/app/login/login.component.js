import templateUrl from './login.component.html'

/* @ngInject */
class login {
  constructor($log, $state, flightService) {

    this.loginToApp = () => {
      flightService.logIntoUser(this.email, this.password).then((result) => {
        if (result.data == true)
          $state.go("flightIndex");
        else {
          alert("Incorrect Login Information")
        }
      }).catch(() => {
        alert("The user does not exist! Create an account!")
      })

    }
  }
}

export default {
  templateUrl,
  controller: login,
  controllerAs: 'loginPage'
}
