import templateUrl from './myFlights.html'

/* @ngInject */
class myFlights {
  constructor($log, $state, flightService, $scope) {


    flightService.getMyFlights().then((result) => {
      $scope.flights = result
    })



  }
}

export default {
  templateUrl,
  controller: myFlights,
  controllerAs: 'myFlights'
}
