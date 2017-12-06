import templateUrl from './app.component.html'
import '../../static/styles.css'
/* @ngInject */
class AppController {
  constructor($log, $state) {
    $log.debug('AppController is a go.')
  }
}

export default {
  templateUrl,
  controller: AppController,
  controllerAs: '$appCtrl'
}
