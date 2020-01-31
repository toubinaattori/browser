import React from 'react';
import {  Question } from "../domain";
import SingleQuestion from './SingelQuestion';
import { Table, Alert, Button } from 'reactstrap';


export interface IProps{
    questions: Question[];
    onButtonClick(): void; 
    heading: string;
    page: string;
    role: string;
    previous(): void;
}

export interface IState{
    importants: boolean;
}


export default class QuestionContainer extends React.Component<IProps,IState> {

    constructor(props: IProps) {
        super(props);
        this.importantChanged = this.importantChanged.bind(this);
    }

    importantChanged(): void {
        this.forceUpdate();
    }
    

    render() {
        let key = 8;
      return (<div>
          <h2 className="questionnaire-page-heading">{this.props.heading}</h2>
      <p className="jumbotron-paragraph">sivu {this.props.page}/5</p>
    <p className="jumbotron-paragraph">{this.props.role}</p>
            <Table className="table">
                <Button onClick={this.props.previous} color="link" className="previousButton" style={{fontSize: 20}}>edellinen</Button>
                <tbody className="tableHeading">
                <tr key="0">
                    <th key="1"> 1 = eri mieltä    5 =  samaa mieltä</th>
                    <th key="2">1</th>
                    <th key="3">2</th>
                    <th key="4">3</th>
                    <th key="5">4</th>
                    <th key="6">5</th>
                    <th key="7">3 tärkeää</th>
                </tr>{this.props.questions.map(element => {
                    key = key +1;
                    return(<SingleQuestion keyValue={key} question={element} importantQuestionFunc = {this.importantChanged}/>)})}
                </tbody>
            </Table>
            {(this.props.questions.filter(question => question.isImportant).length === 3 && this.props.questions.findIndex(e => e.answer === 0)) ? <Button onClick={this.props.onButtonClick} color="link" style={{fontSize: 20}}>Seuraava sivu</Button> : 
            <p className="threeNotSelectedAlert">Et ole vastannut vielä kaikkiin kysymyksiin tai sinulla on väärä määrä tärkeitä kysymyksiä valittuna</p>}
            </div>
      );
    }


  }