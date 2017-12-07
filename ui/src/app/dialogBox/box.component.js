import templateUrl from './box.html'

/* @ngInject */
class box {
  constructor($scope, flightService) {
    this.flightService = flightService
  }

}



export default {
  templateUrl,
  controller: box,
  controllerAs: 'dialogBox'
}
