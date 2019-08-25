import React, { Component } from "react";
import { compose, withProps } from "recompose";
import DirectionRenderComponent from "./DirectionRenderComponent";
import { G_API_URL } from "../../utility/constants";
import DummyLocations from "../../utility/dummyLocations";
import axios from "axios"

const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");

class Directions extends Component {
  createLatLngObject = latLng => {
    const latLngArray = latLng.split(",");
    return {
      lat: latLngArray[0],
      lng: latLngArray[1]
    };
  };


  state = {
    defaultZoom: 3,
    map: null,
    center: {
      lat: 23.217724,
      lng: 72.667216
    },
    top: []
  };

  start = () => {
    console.log(DummyLocations);

    let lcation = []

    this.props.data.map(m => {
      let a = {}

      a = m.geometry.location
      // a = m.geometry.location.lat + "," + m.geometry.location.lng +"," + m.name

      console.log(a);

      lcation.push(a)

    })

    let dire = []
    let b = {}

    for (let index = 0; index < lcation.length - 2; index++) {
      b.from = lcation[index]

      b.to = lcation[index + 1]
      dire.push(b)
    }
    console.log(dire);
    this.setState({ top: dire }, function () { })
  }

  save = async () => {
    const userName = localStorage.getItem("user")

    let data = await axios.get(`http://localhost:8080/user/${userName}`)
    let user = data.data
    let trip = { direction: this.props.data, center: this.props.center }
     user.Trips.push(trip)
    console.log(userName);
    let a = await axios.put(`http://localhost:8080/addTrip/${userName}`, user)
  }


  startTrip = async () => {
    const userName = localStorage.getItem("user")

    let data = await axios.get(`http://localhost:8080/user/${userName}`)
    const user =   JSON.parse(data.data)
    const trip = { direction: this.props.data, center: this.props.center }
     //user.Trip = trip
    console.log(userName);
    let a = await axios.put(`http://localhost:8080/addTrip/${userName}`, user)
   
  }
  stopTrip = async () => {
    const userName = localStorage.getItem("user")

    let data = await axios.get(`http://localhost:8080/user/${userName}`)
    let user = data.data
    let trip = {}
     //user.Trip = trip
    console.log(userName);
    let a = await axios.put(`http://localhost:8080/addTrip/${userName}`, user)

  }
  //.mep( m => m )
  componentDidMountF() { this.start() }
  render() {


    return (
      <div>
        <button onClick={this.save}>save trip</button>
        <button onClick={this.startTrip}>START!!!!</button>
        <button onClick={this.startTrip}>STOOP!!!!</button>
        <GoogleMap
          defaultZoom={this.state.defaultZoom}
          center={this.props.center}
          defaultCenter={new window.google.maps.LatLng(23.21632, 72.641219)}
        >
          {this.state.top.map((elem, index = 0) => {
            return (

              <DirectionRenderComponent
                key={index}
                index={index + 1}
                //strokeColor={elem.strokeColor}
                from={elem.from}
                to={elem.to}
              />


            );
          })}

        </GoogleMap>

      </div>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `70%` }} />,
    containerElement: <div style={{ height: `50vh` }} />,
    mapElement: <div style={{ height: `70%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions);


// 0:
// geometry:
// location: {lat: -14.2474423, lng: -170.5645676}
// viewport: {northeast: {…}, southwest: {…}}
// __proto__: Object
// name: "NOAA American Samoa Observatory"
// value: 5



// https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=3&size=600x300&maptype=roadmap
// &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
// &markers=color:red%7Clabel:C%7C40.718217,-73.998284
// &key=AIzaSyCHJL5eNLo3w6kFDG6WWRPZqMCQzEzQDmE