import React from 'react';
import './App.css';
import { Question, QuestionClass, Questions } from './domain';
import question from './static/questions.json';
import importantQuestions from './static/important.json';
import PageContainer from './components/PageContainer';

export interface IProps{}

export default class App extends React.Component<IProps> {



  getQuestions(): Questions {
      const manager = question.manager;
      let managerQuestionList: Array<Question> = [];
      const employer = question.epmloyer;
      let employerQuestionList: Array<Question> = [];
      managerQuestionList = managerQuestionList.concat(this.getQuestionList(manager.community,QuestionClass.community));
      managerQuestionList = managerQuestionList.concat(this.getQuestionList(manager.development,QuestionClass.development));
      managerQuestionList = managerQuestionList.concat(this.getQuestionList(manager.jobtasks,QuestionClass.jobtasks));
      managerQuestionList = managerQuestionList.concat(this.getQuestionList(manager.leadership,QuestionClass.leadership));
      managerQuestionList = managerQuestionList.concat(this.getQuestionList(manager.wellness,QuestionClass.wellness));
      employerQuestionList = employerQuestionList.concat(this.getQuestionList(employer.community,QuestionClass.community));
      employerQuestionList = employerQuestionList.concat(this.getQuestionList(employer.development,QuestionClass.development));
      employerQuestionList = employerQuestionList.concat(this.getQuestionList(employer.jobtasks,QuestionClass.jobtasks));
      employerQuestionList = employerQuestionList.concat(this.getQuestionList(employer.leadership,QuestionClass.leadership));
      employerQuestionList = employerQuestionList.concat(this.getQuestionList(employer.wellness,QuestionClass.wellness));
      return {
        manager: managerQuestionList,
        employer: employerQuestionList
      };

  }

  getClassName(q: QuestionClass){
    switch(q) {
      case QuestionClass.wellness:
        return "hyvinvointi";
      case QuestionClass.jobtasks:
        return "työtehtävät";
      case QuestionClass.leadership:
        return "johtajuus";
      case QuestionClass.community:
        return "yhteisö";
      case QuestionClass.development:
        return "kehitys";
      default:
        return "undefined";
    }
  }

  getQuestionList(list: string[],q: QuestionClass): Array<Question> {
    let questionList: Array<Question> = [];
    list.forEach(element => {
      const isChangeQ = importantQuestions.questions.findIndex(el => el === element) >=0;
      questionList.push({
          question: element,
          answer: 0,
          isImportant: false,
          class: q,
          isChange: isChangeQ,
          className: this.getClassName(q)
      });
    });
    return questionList;
  }

  render() {
    return (
      <PageContainer questions={this.getQuestions()}/>
  );
  }
}