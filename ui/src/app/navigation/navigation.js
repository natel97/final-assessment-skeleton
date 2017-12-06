import templateUrl from './navigation.html'

/* @ngInject */
class navigation {
  constructor($log, $state, flightService) {
    this.flightService = flightService
  }
}

export default {
  templateUrl,
  controller: navigation,
  controllerAs: 'navigation'
}
