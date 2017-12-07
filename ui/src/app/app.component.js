import templateUrl from './app.component.html'
import '../../static/styles.css'
/* @ngInject */
class AppController {
  constructor($log, $state, flightService, $rootScope) {
    $log.debug('AppController is a go.')
    this.$rootScope = $rootScope
  }
}

export default {
  templateUrl,
  controller: AppController,
  controllerAs: '$appCtrl'
}
