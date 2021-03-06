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
        <div className="display-3">Mittari työnohjaustarpeen arvioimiseen</div>
        <hr className="my-2" />
        <p className="jumbotron-paragraph">Tervetuloa täyttämään työnohjauskyselyä, jolla voit selvittää <a href='http://tunnemielesi.fi/1_2_ty-nohjaus-ja-konsultointi.html'>työnohjauksen</a> tarvetta omassa työssäsi. Työnohjauskyselyä voi käyttää myös työnohjauksen tavoitekeskustelussa työnohjaajan kanssa sekä sen avulla voit myös seurata työnohjausprosessin vaikuttavuutta.</p> 
        <p className="jumbotron-paragraph">Kyselyssä on viisi osiota, joissa kysytään asioita, joihin työnohjauksella voidaan vaikuttaa. </p> 
        <p className="jumbotron-paragraph">Tehtävänäsi on vastata kysymyksiin asteikolla 1-5, joissa asteikko: 1 = eri mieltä… 5 = samaa mieltä.  </p>
        <p className="jumbotron-paragraph">Tämän lisäksi sinun täytyy jokaisesta osiosta valita 3 itsellesi tärkeintä kysymystä.  </p>
        <p className="jumbotron-paragraph">Kysely ei tallenna tietojasi mihinkään, mutta saat tallennettua lopuksi vastauksesi pdf-muodossa omaan käyttöösi.  </p>
        <p className="lead">
        <button onClick={this.props.onButtonClick} className="questionnaireButton">Aloita Kysely</button>
        </p>
      </Jumbotron>
        </div>
      );
    }
  }