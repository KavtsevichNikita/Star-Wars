import React, { Component } from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet : {},
        loading : true,
        error: false
    }

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
      this.setState({
        planet,
        loading: false,
        error: false
      });
    }

    onError = (err) => {
      this.setState({
        error: true,
        loading : false
      })
    };

    updatePlanet() {
        const id = Math.floor(Math.random()*10) + 2;
          this.swapiService.getPlanet(id)
          .then(this.onPlanetLoaded)
          .catch(this.onError);
    }

  render() {


    const {planet : {id,name, population, rotationPeriod, diameter}, loading, error} = this.state; 

    if(loading) {
      return <Spinner/>
    }

    
    return (
      <div className="random-planet jumbotron rounded">
        <img className="planet-image" alt='planetImage'
            src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}