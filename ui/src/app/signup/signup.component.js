import templateUrl from './signup.component.html'

/* @ngInject */
class signup {
  constructor($log, $state, flightService) {
    $log.debug('Signup is a go.')
    this.signUpForApp = () => {
      console.log("inside sign up function")
      flightService.newUser(this.email, this.password, this.firstName, this.lastName)
        .then((response) => {
          console.log(response)
          if (response.data == true) {
            //TODO Save login state later!
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
