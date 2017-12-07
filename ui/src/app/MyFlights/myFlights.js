import templateUrl from './myFlights.html'

/* @ngInject */
class myFlights {
  constructor($log, $state, flightService, $scope) {

    if (!flightService.loggedIn)
      $state.go('home')

    flightService.getMyFlights().then((result) => {
      $scope.flights = result.reverse()
    })



  }
}

export default {
  templateUrl,
  controller: myFlights,
  controllerAs: 'myFlights'
}
