import templateUrl from './map.component.html'

/* @ngInject */
class MapController {
  zoom = 7
  center = [35.5175, -86.5804]
  markers = []
  paths = []

  constructor($map, locations, flightService, $scope) {
    this.$map = $map
    this.flight = $scope.flight
    console.log(this)
    // add markers from an angular constant
    const {
      memphis,
      nashville,
      knoxville
    } = locations
    const markers = [memphis, nashville, knoxville]

    markers.forEach(marker => this.addMarker(marker))

    // add paths manually
    const colors = ['#00FFFF', '#FF0099', '#FD1C03', '#E6FB04']
    let paths = []

    let getConst = (word) => {
      switch (word) {
        case 'KNOXVILLE':
          return knoxville;
        case 'MEMPHIS':
          return memphis;
        case "NASHVILLE":
          return nashville;
        case "CHATTANOOGA":
          return chattanooga;
        default:
          return null

      }
    }

    this.flight.flights.forEach((x) => {
      paths.push[getConst(x.origin), getConst(x.d), colors[Math.floor(Math.random() * 4)]]
    })
    // const paths = [
    //   [knoxville, nashville, '#CC0099'],
    //   [nashville, knoxville, '#AA1100']
    // ]

    paths.forEach(args => this.addPath(...args))

    // add path from webservice
    // $map.getMarkerByCityName('Chattanooga')
    //   .then(chattanooga => {
    //     this.addPath(knoxville, chattanooga, '#FF3388')
    //   })
  }

  addMarker({
    latitude,
    longitude
  }) {
    this.markers.push({
      position: `[${latitude}, ${longitude}]`
    })
  }

  addPath(a, b, color) {
    this.paths.push({
      path: `[[${a.latitude}, ${a.longitude}], [${b.latitude}, ${b.longitude}]]`,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 3,
      geodesic: true
    })
  }

}

export default {
  templateUrl,
  controller: MapController,
  controllerAs: '$mapCtrl'
}
