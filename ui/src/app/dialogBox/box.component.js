import templateUrl from './box.html'

/* @ngInject */
class box {
  constructor($scope, $log, flightService) {
    this.flightService = flightService
    this.$log = $log

  }

}



export default {
  templateUrl,
  controller: box,
  controllerAs: 'dialogBox'
}
