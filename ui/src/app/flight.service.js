class FlightService {
  constructor($http, apiUrl, $interval) {
    this.$http = $http
    this.apiUrl = apiUrl
    this.currentSession = JSON.parse(window.localStorage.getItem('login'))
    this.loggedIn = (this.currentSession != undefined);
    this.nextRefreshTime = 0;
    this.$interval = $interval
    this.getAllFlights = () => {
      this.getNextRefresh().then(x => this.nextRefreshTime = x)
      return this.$http
        .get(`${this.apiUrl}/flights`)
        .then(result => result.data)
    }
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
      .then(result => result.data)
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
