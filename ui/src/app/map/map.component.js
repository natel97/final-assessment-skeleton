import templateUrl from './map.component.html'

/* @ngInject */
class MapController {
  zoom = 7
  center = [35.5175, -86.5804]
  markers = []
  paths = []

  constructor($map, locations, flightService, $scope, $state) {
    this.$map = $map
    var setData = (arr) => {
      arr.forEach(x => this.addPath)


    }
    // add markers from an angular constant
    const {
      memphis,
      nashville,
      knoxville,
      chattanooga
    } = locations
    // const markers = [memphis, nashville, knoxville, chattanooga]
    //
    // markers.forEach(marker => this.addMarker(marker))
    flightService.getAFlight($state.params.id).then((response) => {
      console.log(response)
      // add paths manually
      const colors = ['#00FFFF', '#FF0099', '#FD1C03', '#E6FB04']
      let temppaths = []

      let getConst = (word) => {
        switch (word) {
          case 'KNOXVILLE':
            console.log("got knoxville")
            return knoxville;
          case 'MEMPHIS':
            console.log("got memphis")
            return memphis;
          case "NASHVILLE":
            return nashville;
          case "CHATTANOOGA":
            return chattanooga;
          default:
            return null

        }
      }

      let marks = [];

      response.flights.forEach((x) => {
        this.addPath(getConst(x.origin), getConst(x.destination), colors[Math.floor(Math.random() * 4)])
      })
      this.addMarker(getConst(response.flights[0].origin))
      this.addMarker(getConst(response.flights[response.flights.length - 1].destination))
    })

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
