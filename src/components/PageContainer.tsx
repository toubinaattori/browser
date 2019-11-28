import React from 'react';
import { Questions, PageEnum, Question, RoleEnum, QuestionClass } from "../domain";
import HomePage from './HomePage';
import BasicInfo from './BasicInfo';
import QuestionContainer from './QuestionContainer';
import Results from './Results';




export interface IProps{
    questions: Questions;
}

export interface IState{
    visible: PageEnum;
    rightQuestions: Question[];
}

export default class PageContainer extends React.Component<IProps,IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: PageEnum.homepage,
            rightQuestions: props.questions.manager
        };
    }

    onClick = (page: PageEnum): void => {
        this.setState({visible: page});
    }

    basicInfo = (): void => {
        this.setState({visible: PageEnum.basicInfo});
    }

    wellness = (): void => {
        this.setState({visible: PageEnum.wellness});
    }

    leadership = (): void => {
        this.setState({visible: PageEnum.leadership});
    }

    development = (): void => {
        this.setState({visible: PageEnum.development});
    }

    community = (): void => {
        this.setState({visible: PageEnum.community});
    }

    results = (): void => {
        this.setState({visible: PageEnum.results});
    }

    selectRole = (role: RoleEnum): void =>{
        if(role === RoleEnum.manager){
            this.setState({rightQuestions: this.props.questions.manager});
        }
        else{
            this.setState({rightQuestions: this.props.questions.employer});
        }
    }


    render() {
      return (
        <div className="quesetionnaireApp">
          {this.state.visible === PageEnum.homepage ? <HomePage onButtonClick = {this.basicInfo}/> : null}
          {this.state.visible === PageEnum.basicInfo ? <BasicInfo onButton = {this.onClick} onButtonClick = {this.selectRole}/> : null}
          {this.state.visible === PageEnum.jobtasks ? <QuestionContainer heading="Työtehtävät" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.jobtasks)} onButtonClick = {this.wellness}/> : null}
          {this.state.visible === PageEnum.wellness ? <QuestionContainer heading="Hyvinvointi" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.wellness)} onButtonClick = {this.development}/> : null}
          {this.state.visible === PageEnum.development ? <QuestionContainer heading="Kehitys" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.development)} onButtonClick = {this.community}/> : null}
          {this.state.visible === PageEnum.community ? <QuestionContainer heading="Yhteisö" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.community)} onButtonClick = {this.leadership}/> : null}
          {this.state.visible === PageEnum.leadership ? <QuestionContainer heading="Johtajuus" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.leadership)} onButtonClick = {this.results}/> : null}
          {this.state.visible === PageEnum.results ? <Results questions = {this.state.rightQuestions}/> : null}
        </div>
      );
    }
  }