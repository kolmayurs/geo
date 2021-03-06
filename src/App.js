import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      address: []
    }
      this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount(){
  }
  getLocation(){
    const jsonURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+this.props.coords.latitude+'&lon='+this.props.coords.longitude+'&appid=8124a644a4fab4b5c77b5fc1ae5ba6c5'
    const jsonURL1 ='https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.props.coords.latitude+','+this.props.coords.longitude+'&key=AIzaSyB7ALnbbmp3KQ_wFGnR5DqNvYPjmvZhlTY'
     if(this.props.coords.latitude && this.props.coords.longitude){
    fetch(jsonURL)
    .then(res => res.json())
    .then(result => {
      this.setState({data: [result]})
    })
    fetch(jsonURL1)
    .then(res => res.json())
    .then(data => {
      this.setState({address: data.results})
    })
    console.log(this.state.address);
    }
    else{
      alert('no latitude & longitude');
    }
  }

  render() {
    const adressData= this.state.address.map((items,i)=> {
      if(i===1){
            return(<tr key={'address_' +i}>
              <td colSpan="2">
              Address: {items.formatted_address} <br /><br />
              </td>
              </tr>)}
    })
    const weatherData= this.state.data.map((items,i)=> {
      return(<tr key={'temp_' +i}>
        <td colSpan="2">
        &nbsp;<br /><br />
        Location: {items.name} <br /><br />
        Weather: {items.weather[i].main} <br /><br />
        Temp: {items.main.temp - 273.15} <br /><br />
        MaxTemp: {items.main.temp_max - 273.15} <br /><br />
        MinTemp: {items.main.temp_min - 273.15} <br /><br />
        humidity: {items.main.humidity} 
        </td>
        </tr>)
    })
    return (!this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <table>
            <tbody>
              <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
              <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
                <tr><td colSpan="2"><button onClick={this.getLocation.bind(this)}>Get Weather Information</button></td></tr>
                {adressData}
                {weatherData}
            </tbody>
          </table>
          : <div>Getting the location data&hellip; </div>)
  }
}


export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(App);

              /*<tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
              <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
              <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>*/