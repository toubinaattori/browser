import React from 'react';
import {  Question } from "../domain";
import {  Input } from 'reactstrap';


export interface IProps{
    question: Question;
    importantQuestionFunc(): void;
    keyValue: number;
}

export default class SingleQuestion extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.onButtonChange = this.onButtonChange.bind(this);
        this.onImportantChange = this.onImportantChange.bind(this);
    }
    

    render() {
      return (
        <tr key={this.props.keyValue} className="tableElement">
            <th scope={this.props.question.question} className="questionText">{this.props.question.question}</th>
            <td className="radioButton"><Input type="radio" name={this.props.question.question} value={1} onChange={this.onButtonChange} checked={this.props.question.answer === 1}/></td>
            <td className="radioButton"><Input type="radio" name={this.props.question.question} value={2} onChange={this.onButtonChange} checked={this.props.question.answer === 2}/></td>
            <td className="radioButton"><Input type="radio" name={this.props.question.question} value={3} onChange={this.onButtonChange} checked={this.props.question.answer === 3}/></td>
            <td className="radioButton"><Input type="radio" name={this.props.question.question} value={4} onChange={this.onButtonChange} checked={this.props.question.answer === 4}/></td>
            <td className="radioButton"><Input type="radio" name={this.props.question.question} value={5} onChange={this.onButtonChange} checked={this.props.question.answer === 5}/></td>
            {!this.props.question.isChange ? <td className="radioButton"><Input type="checkbox" onChange={this.onImportantChange}/></td> : <td className="radioButton"><Input type="checkbox" className="checkBoxZero" onChange={this.onImportantChange}/></td>}
        </tr>);
    }

    onButtonChange(event: React.ChangeEvent<HTMLInputElement>){
        this.props.question.answer = parseInt(event.target.value);
        this.props.importantQuestionFunc();
    }

    onImportantChange(event: React.ChangeEvent<HTMLInputElement>){
        this.props.question.isImportant = !this.props.question.isImportant;
        this.props.importantQuestionFunc();
    }


  }