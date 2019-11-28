import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

export interface IProps{
    onButtonClick(): void; 
}

export default class HomePage extends React.Component<IProps> {

    render() {
      return (
        <div className="App">
          <Jumbotron>
        <h1 className="display-3">Työnohjaustesti</h1>
        <hr className="my-2" />
        <p>Tervetuloa täyttämään työnohjauskysely. Kyselyssä on viisi osiota, 
        joissa kussakin on kysymyksiä. Tehtävänäsi on vastata kysymyksiin asteikolla 1-5, jossa 1
        tarkoittaa, että olet eri mieltä ja 5 samaa mieltä. Tämän lisäksi sinun täytyy jokaisesta osiosta
        valita 3 itsellesi tärkeintä kysymystä. Kysely ei tallenna tietojasi minnekään, vaan saat kyselyn yhteenvedon omalle näytöllesi.
        Sitä voi käyttää hyväkseen, kun otat yhteyttä työnohjaajaan ja keskustelette työnohjauksen tavoitteista.</p>
        <p className="lead">
        <Button onClick={this.props.onButtonClick} >Aloita Kysely</Button>
        </p>
      </Jumbotron>
        </div>
      );
    }
  }