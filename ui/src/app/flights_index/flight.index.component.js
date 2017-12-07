import templateUrl from './flight.index.component.html'
import flightService from '../flight.service'

/* @ngInject */
class flightIndex {
  constructor($log, $state, flightService, $scope, $interval) {
    this.$interval = $interval
    if (!flightService.loggedIn)
      $state.go('home')
    $scope.filterFlights = () => {
      $scope.flights = $scope.allFlights.filter(x => {
        if ($scope.from != undefined)
          if (!x.flights[0].origin.toLowerCase().startsWith($scope.from.toLowerCase()))
            return false;
        if ($scope.to != undefined)
          if (!x.flights[x.flights.length - 1].destination.toLowerCase().startsWith($scope.to.toLowerCase()))
            return false
        return true;
      })
    }


    $scope.checkForAll = this.$interval(function() {
      if ($scope.filterFlights === undefined)
        $state.go('flights')
      if (flightService.nextRefreshTime < Date.now())
        flightService.getAllFlights().then((result) => {
          console.log("Data refreshed!" + " Next refresh scheduled by server at " + new Date(flightService.nextRefreshTime) + ":: Milliseconds => " + new Date(flightService.nextRefreshTime).getMilliseconds())
          $scope.allFlights = result;
          $scope.filterFlights()
        })
    }, 300);


    $scope.$on("$destroy", function() {
      $interval.cancel($scope.checkForAll);
      flightService.nextRefreshTime = 0;
    });
  }
}
export default {
  templateUrl,
  controller: flightIndex,
  controllerAs: 'flightIndex'
}
