import templateUrl from './signup.component.html'

/* @ngInject */
class signup {
  constructor($log, $state) {
    $log.debug('Signup is a go.')
    this.signUpForApp = () => {
      $state.go("flightIndex")
    }
  }
}

export default {
  templateUrl,
  controller: signup,
  controllerAs: 'signupPage'
}
