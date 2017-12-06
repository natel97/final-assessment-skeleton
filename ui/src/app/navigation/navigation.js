import templateUrl from './navigation.html'

/* @ngInject */
class navigation {
  constructor($log, $state, flightService, $scope) {
    this.flightService = flightService
    this.$scope = $scope
    this.$state = $state
  }

  button1() {
    this.$state.go(this.flightService.loggedIn ? "flightIndex" : "home")
  }

  button2() {
    this.$state.go(this.flightService.loggedIn ? "editProfile" : "signup")
  }

  button3() {
    if (this.flightService.loggedIn) {
      this.flightService.logOut()
      this.flightService.loggedIn = false;
      this.$state.go("home")
    } else {
      this.$state.go("login")
    }
  }
}

export default {
  templateUrl,
  controller: navigation,
  controllerAs: 'navigation'
}
