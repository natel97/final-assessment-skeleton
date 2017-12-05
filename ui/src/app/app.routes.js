export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject'

  $urlRouterProvider.otherwise('/home')

  const home = {
    name: 'home',
    url: '/home',
    component: 'homePage'
  }

  const login = {
    name: 'login',
    url: '/login',
    component: 'loginPage'
  }

  const signup = {
    name: 'signup',
    url: '/signup',
    component: 'signupPage'
  }

  const flightIndex = {
    name: 'flightIndex',
    url: '/flights',
    component: 'flightIndex'
  }

  const flight = {
    name: 'flight',
    url: '/flight/{id}',
    component: 'flight'
  }

  $locationProvider.html5Mode(true)

  $stateProvider.state(home)
  $stateProvider.state(login)
  $stateProvider.state(signup)
  $stateProvider.state(flight)
  $stateProvider.state(flightIndex)


}
