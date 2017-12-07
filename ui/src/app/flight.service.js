class FlightService {
  constructor($http, apiUrl, $interval, $rootScope) {
    this.$http = $http
    this.$scope = $rootScope;
    this.apiUrl = apiUrl
    this.currentSession = JSON.parse(window.localStorage.getItem('login'))
    this.loggedIn = (this.currentSession != undefined);
    this.nextRefreshTime = 0;
    this.$interval = $interval
    this.$scope.messageVisible = false;
    this.messageVisible = false;
    this.message = "Test"
    this.contents = "This is a test"

    this.getAllFlights = () => {
      this.getNextRefresh().then(x => this.nextRefreshTime = x)
      return this.$http
        .get(`${this.apiUrl}/flights`)
        .then(result => result.data)
    }
  }

  newMessage(message, contents, callback) {
    this.message = message
    this.contents = contents
    this.$scope.messageVisible = true;
    this.messageVisible = true;
  }

  hideBox() {
    this.messageVisible = false;
    this.$scope.messageVisible = false;
  }

  getUserDetails() {
    return this.$http
      .post(`${this.apiUrl}/user/user`, {
        emailAddress: this.currentSession.emailAddress,
        password: this.currentSession.password
      })
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

  setUser(email, password) {
    this.currentSession = {
      emailAddress: email,
      password: password
    }
  }

  logIntoUser(email, password) {
    this.setUser(email, password)
    return this.$http
      .post(`${this.apiUrl}/user/validate`, {
        emailAddress: email,
        password: password
      }).then((result) => {
        if (result) {
          window.localStorage.setItem('login', JSON.stringify({
            emailAddress: email,
            password
          }))
          this.loggedIn = true;
        }
        return result
      })
  }



  newUser(email, password, firstName, lastName) {
    return this.$http
      .post(`${this.apiUrl}/user`, {
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }).then((result) => {
        if (result) {
          window.localStorage.setItem('login', JSON.stringify({
            emailAddress: email,
            password
          }))
          this.loggedIn = true;
        }
        return result
      })
  }

  getAFlight(id) {
    return this.$http
      .get(`${this.apiUrl}/flights/${id}`)
      .then((result) => {
        result.data.flights.map(x => {
          x.departureTime = x.offset % 24 == 0 ? "Midnight! (woah, scary!)" : x.offset % 12 == 0 ? "12 Noon" : x.offset > 24 ? x.offset - 24 + " AM (Next day)" : window.Math.floor(x.offset / 12) == 0 ?
            (x.offset) + " AM" : (x.offset - 12) + " PM"
          return x;
        })
        let num = result.data.flights[result.data.flights.length - 1].offset + result.data.flights[result.data.flights.length - 1].flightTime

        result.data.totalTime = num % 24 == 0 ? "Midnight! (woah, scary!)" : num % 12 == 0 ? "12 Noon" : num > 24 ? num - 24 + " AM (Next day)" : window.Math.floor(num / 12) == 0 ? (num) + " AM" : (num - 12) + " PM"
        return result.data;
      })
  }

  bookFlight(id) {
    return this.$http
      .post(`${this.apiUrl}/user/addFlight/${id}`, this.getUser())
  }

  getUser() {
    return this.currentSession;
  }

  logOut() {
    window.localStorage.clear('login')
    this.loggedIn = false;
  }
  getMyFlights() {
    return this.$http
      .post(`${this.apiUrl}/user/flights`, this.getUser())
      .then(result => result.data)
  }

  getNextRefresh() {
    return this.$http
      .get(`${this.apiUrl}/flights/refresh`)
      .then((result) => {
        return result.data
      })
  }
}


export default FlightService
