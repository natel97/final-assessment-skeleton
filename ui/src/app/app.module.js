import flightMap from './map/map.module'
import flightIndex from './flights_index/flight.index.component.js'
import flightFragment from './flights_index/flight.fragment.js'
import homePage from './home/home.component'
import apiUrl from './api.url'
import appComponent from './app.component.js'
import loginPage from './login/login.component'
import signupPage from './signup/signup.component'
import flightService from './flight.service'
import uiRouter from 'angular-ui-router'
import routing from './app.routes'
export default
angular
  .module('flight', [
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ui.router',
    flightMap
  ])
  .constant('apiUrl', apiUrl)
  .service('flightService', flightService)
  .component('flightApp', appComponent)
  .component('homePage', homePage)
  .component('loginPage', loginPage)
  .component('signupPage', signupPage)
  .component('flightIndex', flightIndex)
  .component('flightFragment', flightFragment)
  .config(routing)
  .name
