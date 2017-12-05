class FlightService {
  constructor($http, apiUrl) {
    this.$http = $http
    this.apiUrl = apiUrl
  }

  getAllFlights() {
    return this.$http
      .get(`${this.apiUrl}/location`)
      .then(result => result.data)
  }

  getMarkerByCityName(name) {
    return this.$http
      .get(`${this.apiUrl}/location/name`, {
        params: {
          name
        }
      })
      .then(result => result.data)
  }

  getAllRealFlights() {
    return this.$http
      .get(`${this.apiUrl}/flights`)
      .then(result => result.data)
  }

  logIntoUser(email, password) {
    return this.$http
      .post(`${this.apiUrl}/user/validate`, {
        emailAddress: email,
        password: password
      })
  }

}


export default FlightService