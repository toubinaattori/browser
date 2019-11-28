import React from 'react';
import {  Question, QuestionClass } from "../domain";
import '../App.css';


export interface IProps{
    question: Question[];
    headline: QuestionClass;
}

export default class QuestionList extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            backgroundColor: "gainsboro"

        }
        this.getClassName = this.getClassName.bind(this);
        this.setClassNames = this.setClassNames.bind(this);
    }

    getClassName(q: QuestionClass){
        switch(q) {
          case QuestionClass.wellness:
            return "Työhyvinvointi";
          case QuestionClass.jobtasks:
            return "Työtehtävät";
          case QuestionClass.leadership:
            return "Johtajuus";
          case QuestionClass.community:
            return "Työyhteisö";
          case QuestionClass.development:
            return "Työssä Kehittyminen";
          default:
            return "Undefined";
        }
      }

      setClassNames(questions: Question[]){
          let i = 0;
            for(i;i < questions.length; i++){
                if(i%2 === 0){
                    questions[i].resultClass = "evenResultTableElement";
                }
                else{
                    questions[i].resultClass = "oddResultTableElement";
                }
            }
      }
    

    render() {
        this.setClassNames(this.props.question);
      return (
          <>
            <h3 className="finalResultHeading">{this.getClassName(this.props.headline)}</h3>
            <table className="finalResultsTable">
                {this.props.question.map(q => {
                    return (
                        <tr className={q.resultClass}>
                        <td className="finalResultsTableQuestion">{q.question}</td>
                        <td className="finalResultsTableAnswer">{q.answer}</td>
                        </tr>
                    );
                })
                }
            </table>
            </>);
    }


  }