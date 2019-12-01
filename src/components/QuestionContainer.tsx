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
          <h2>{this.props.heading}</h2>
      <p>sivu {this.props.page}/5</p>
    <p>{this.props.role}</p>
            <Table className="table">
                <tbody className="tableHeading">
                <tr key="0">
                    <th key="1"></th>
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
            {this.props.questions.filter(question => question.isImportant).length === 3 ? <Button onClick={this.props.onButtonClick}>Seuraava sivu</Button> : 
            <p className="threeNotSelectedAlert">Sinulla on väärä määrä tärkeitä kysymyksiä valittuna</p>}
            </div>
      );
    }


  }