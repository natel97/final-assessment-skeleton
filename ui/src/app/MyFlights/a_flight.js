import templateUrl from './a_flight.html'

/* @ngInject */
class aFlight {
  constructor($state, flightService) {



  }
}

export default {
  templateUrl,
  controller: aFlight,
  controllerAs: 'aFlight',
  bindings: {
    flight: "="
  }
}
