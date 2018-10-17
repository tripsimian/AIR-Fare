import React, { Component } from "react";
import logo from "./logo.png";
import logo2 from "./bmc-2.png"
import "./App.css";
import SearchBar from "../src/components/SearchBar/SearchBar.js";
import Flights from "../src/components/flights/Flights.js";
import { Amadeus } from "./utils/Amadeus.js";
import Navigation from "./components/Nav/Navigation.js"
import Main from "./components/Nav/Main"
//import {NavRender} from "./components/Nav/Navigation.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      loading: false,
      autocomplete: [],
      currency1:"",
    };
    this.searchAmadeus = this.searchAmadeus.bind(this);
  }
  searchAmadeus(origin, destination, date, returnOrOneWay, returnDate,currency,directFlight,adults,childs,infants) {
    this.setState({ loading: true });
    Amadeus.search(origin, destination, date, returnOrOneWay, returnDate,currency,directFlight,adults,childs,infants).then(
      flights => {
        //const res = []
        //flight.forEach(item => item.forEach(item1 => item1.forEach(item2 => res.push(item2))))
        //  console.log(res)

        this.setState({
          flights,
          loading: false,
          currency1:currency
        });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <header>
          {this.state.loading ? (
            <div className="bg-light borderradius"><div  className="d-flex justify-content-around" >
              <div className="p-2 bd-highlight">
                <img src={logo2}  alt="logo"  className="App-logo2" />
                </div>
                <div className="p-2 bd-highlight text-align navback rounded ">
                <Navigation  />
                </div>
                </div>
            <div className="loading">
              <img src={logo} className="App-logo" alt="logo" />
              <br />
              Loading
            </div></div>
          ) : (<div className="bg-light borderradius"><div  className="d-flex justify-content-around" >
            <div className="p-2 bd-highlight">
              <img src={logo2}  alt="logo"  className="App-logo2" />
              </div>
              <div className="p-2 bd-highlight text-align navback rounded ">
              <Navigation  />
              </div>
              </div></div>
            )}
          </header>
                    <div className="App-center">
                    <SearchBar searchAmadeus={this.searchAmadeus} />
        </div>
        <Flights currency1={this.state.currency1} flights={this.state.flights}/>
        <Main />
      </div>
    );
  }
}
export default App;
