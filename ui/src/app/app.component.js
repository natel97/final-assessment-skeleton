import templateUrl from './app.component.html'

/* @ngInject */
class AppController {
  constructor($log, $state) {
    $log.debug('AppController is a go.')
    console.log($state.get())
    $state.go("login")
  }
}

export default {
  templateUrl,
  controller: AppController,
  controllerAs: '$appCtrl'
}
