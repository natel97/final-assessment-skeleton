import templateUrl from './flight.index.component.html'
import flightService from '../flight.service'

/* @ngInject */
class flightIndex {
  constructor($log, $state, flightService, $scope) {
    flightService.getAllRealFlights().then((result) => {
      $scope.flights = result
    })
    this.filterFlights = () => {

      $log.debug($scope.to + "   " + $scope.from)
      flightService.getAllRealFlights().then((result) => {
        $scope.flights = result.filter(x => {
          if ($scope.from != undefined)
            if (!x.origin.toLowerCase().startsWith($scope.from.toLowerCase()))
              return false;
          if ($scope.to != undefined)
            if (!x.destination.toLowerCase().startsWith($scope.to.toLowerCase()))
              return false
          return true;
        })
      })
    }
  }
}
export default {
  templateUrl,
  controller: flightIndex,
  controllerAs: 'flightIndex'
}
