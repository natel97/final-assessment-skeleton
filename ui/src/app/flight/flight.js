import templateUrl from './flight.html'

/* @ngInject */
class flight {
  constructor($log, $state, flightService, $scope) {


    this.bookFlight = (id) => {
      flightService.bookFlight(id)
    }
    this.id = $state.params.id;
    flightService.getAFlight(this.id)
      .then((result) => {
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
