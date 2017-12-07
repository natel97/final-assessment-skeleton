import templateUrl from './signup.component.html'

/* @ngInject */
class signup {
  constructor($state, flightService, $scope) {

    this.email = ""
    this.password = ""
    this.firstName = ""
    this.lastName = ""
    if (flightService.loggedIn)
      $state.go('flightIndex')
    this.$scope = $scope
    this.flightService = flightService
    this.signUpForApp = () => {
      if (this.email.length < 7 || !this.email.includes('@') || this.password.length < 7 || this.firstName.length < 2 || this.lastName.length < 2) {
        flightService.newMessage("Come on!", "You've gotta try harder than that! \nMin Requirements are:\nEmail: Length: 7, contains '@'\nPassword: length: 8\nFirstname: length: 3\nLastName: length: 3")
        return
      }
      flightService.newUser(this.email, this.password, this.firstName, this.lastName)
        .then((response) => {
          if (response.data == true) {
            this.flightService.newMessage("Welcome", "Welcome to our flights!")
            $state.go("flightIndex")
            this.flightService.setUser(this.email, this.password)
            this.flightService.loggedIn = true;
          } else {

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
