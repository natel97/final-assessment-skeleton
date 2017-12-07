import templateUrl from './flight.html'

/* @ngInject */
class flight {
  constructor($log, $state, flightService, $scope) {

    if (!flightService.loggedIn)
      $state.go('home')
    this.$state = $state
    this.bookFlight = (id) => {
      flightService.bookFlight(id).then((result) => {
        flightService.newMessage("Time to fly!", result.data ? "Successfully booked flight!" : "You have already booked this flight!", () => this.$state.go('flights'))
      })
    }
    this.id = $state.params.id;
    flightService.getAFlight(this.id)
      .then((result) => {
        console.log(result)
        $scope.result = result
        flightService.currentFlight = result
      })

  }

}

export default {
  templateUrl,
  controller: flight,
  controllerAs: 'flight'
}
