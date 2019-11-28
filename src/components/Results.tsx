import React from 'react';
import {  Question, QuestionClass } from "../domain";
import RadarChart from '../lib';
import ColorBox from './ColorBox';
import QuestionList from './QuestionList';


export interface IProps{
    questions: Question[];
}

export interface IState{
    wellness: number;
    jobtasks: number;
    community: number;
    leaderhip: number;
    development: number;
}


export default class Results extends React.Component<IProps,IState> {

    constructor(props: IProps) {
        super(props);
        this.calculateSD = this.calculateSD.bind(this);
        this.calculateAverage = this.calculateAverage.bind(this);
        this.orderQuestions = this.orderQuestions.bind(this);

        this.state = {
            wellness: 0,
            jobtasks: 0,
            community: 0,
            leaderhip: 0,
            development: 0

        }
    }


    calculateSD(questions: Question[]): number{
        const results: number[] = questions.flatMap(q => q.answer);
        const  average = results.reduce((a,b)=>a+b)/questions.length
        const sd = results.reduce((a,b)=>a+(b-average))/questions.length
        return sd/2.5;
    }

    calculateAverage(questions: Question[]): number{
        const results: number[] = questions.flatMap(q => q.answer);
        const average = results.reduce((a,b)=>a+b)/questions.length;
        return average/5;
    }

    orderQuestions(q1: Question[],q2: Question[],q3: Question[],q4: Question[],q5: Question[]): Array<Question[]>{
        let array: Array<Question[]> = [];
        array.push(q1);
        array.push(q2);
        array.push(q3);
        array.push(q4);
        array.push(q5);
        array.sort((a,b)=>this.calculateAverage(b)-this.calculateAverage(a));
        return array;
    }


    

    render() {
          const wellness = this.props.questions.filter(q => q.class === QuestionClass.wellness);
          const community = this.props.questions.filter(q => q.class === QuestionClass.community);
          const jobtasks = this.props.questions.filter(q => q.class === QuestionClass.jobtasks);
          const leadership = this.props.questions.filter(q => q.class === QuestionClass.leadership);
          const development = this.props.questions.filter(q => q.class === QuestionClass.development);
          const questionList: Array<Question[]> = this.orderQuestions(wellness,community,jobtasks,leadership,development);
      return (<div>
          <h3>Tulokset</h3>
          <RadarChart
            captions={{
              // columns
              important: 'Tärkeiden kysymysten keskiarvo',
              keskiarvo: 'Keskiarvo',
              hajonta: 'yhteneväisyys',
              change: 'Muutos'
            }}
            data={[
            {
                data: {
                    keskiarvo: this.calculateAverage(questionList[0]),
                    important: this.calculateAverage(questionList[0].filter(w => w.isImportant)),
                    change: this.calculateAverage(questionList[0].filter(w => w.isChange)),
                    hajonta: this.calculateSD(questionList[0]),
                },
                meta: { color: '#58FCEC' }
              },
              {
                data: {
                    keskiarvo: this.calculateAverage(questionList[1]),
                    important: this.calculateAverage(questionList[1].filter(w => w.isImportant)),
                    change: this.calculateAverage(questionList[1].filter(w => w.isChange)),
                    hajonta: this.calculateSD(questionList[1]),
                },
                meta: { color: '#f54542' }
              },
              {
                data: {
                    keskiarvo: this.calculateAverage(questionList[2]),
                    important: this.calculateAverage(questionList[2].filter(w => w.isImportant)),
                    change: this.calculateAverage(questionList[2].filter(w => w.isChange)),
                    hajonta: this.calculateSD(questionList[2]),
                },
                meta: { color: '#f5e907' }
              },
              {
                data: {
                    keskiarvo: this.calculateAverage(questionList[3]),
                    important: this.calculateAverage(questionList[3].filter(w => w.isImportant)),
                    change: this.calculateAverage(questionList[3].filter(w => w.isChange)),
                    hajonta: this.calculateSD(questionList[3]),
                },
                meta: { color: '#bb07f2' }
              },
              {
                data: {
                    keskiarvo: this.calculateAverage(questionList[4]),
                    important: this.calculateAverage(questionList[4].filter(w => w.isImportant)),
                    change: this.calculateAverage(questionList[4].filter(w => w.isChange)),
                    hajonta: this.calculateSD(questionList[4]),
                },
                meta: { color: '#3ffc05' }
              }
            ]}
            size={500}
          />
          <h4>Värien selitykset ja keskiarvot</h4>
          <div className="colorBoxContainer">
          <ColorBox name={questionList[0][0].className} color="#58FCEC" average={Math.round(this.calculateAverage(questionList[0])*5* 100) /100}/>
          <ColorBox name={questionList[1][0].className} color="#f54542" average={Math.round(this.calculateAverage(questionList[1])*5* 100) /100}/>
          <ColorBox name={questionList[2][0].className} color="#f5e907" average={Math.round(this.calculateAverage(questionList[2])*5* 100) /100}/>
          <ColorBox name={questionList[3][0].className} color="#bb07f2" average={Math.round(this.calculateAverage(questionList[3])*5* 100) /100}/>
          <ColorBox name={questionList[4][0].className} color="#3ffc05" average={Math.round(this.calculateAverage(questionList[4])*5* 100) /100}/>
          </div>
          <div className="finalResultAnswers" style={{display: "inline-grid"}}>
            <QuestionList headline={questionList[0][0].class} question = {questionList[0]}/>
            <QuestionList headline={questionList[1][0].class} question = {questionList[1]}/>
            <QuestionList headline={questionList[2][0].class} question = {questionList[2]}/>
            <QuestionList headline={questionList[3][0].class} question = {questionList[3]}/>
            <QuestionList headline={questionList[4][0].class} question = {questionList[4]}/>
          </div>
            </div>
      );
    }


  }