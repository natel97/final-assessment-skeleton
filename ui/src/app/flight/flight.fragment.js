import templateUrl from './flight.fragment.html'

/* @ngInject */
class flightFragment {
  constructor($log, $state) {



  }
}

export default {
  templateUrl,
  controller: flightFragment,
  controllerAs: 'flightFragment',
  bindings: {
    flight: "="
  }
}
