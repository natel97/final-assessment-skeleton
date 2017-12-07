import templateUrl from './app.component.html'
import '../../static/styles.css'
/* @ngInject */
class AppController {
  constructor($state, flightService, $rootScope) {
    this.$rootScope = $rootScope
  }
}

export default {
  templateUrl,
  controller: AppController,
  controllerAs: '$appCtrl'
}
