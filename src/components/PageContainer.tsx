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
    role: string;
}

export default class PageContainer extends React.Component<IProps,IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: PageEnum.homepage,
            rightQuestions: props.questions.manager,
            role: "Esimies"
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

    jobtasks = (): void => {
      this.setState({visible: PageEnum.jobtasks});
  }

    community = (): void => {
        this.setState({visible: PageEnum.community});
    }

    results = (): void => {
        this.setState({visible: PageEnum.results});
    }

    basicinfo = (): void => {
      this.setState({visible: PageEnum.basicInfo});
  }

    selectRole = (role: RoleEnum): void =>{
        if(role === RoleEnum.manager){
            this.setState({rightQuestions: this.props.questions.manager, role: "Esimies"});
        }
        else{
            this.setState({rightQuestions: this.props.questions.employer, role: "Työntekijä"});
        }
    }


    render() {
      return (
        <div className="quesetionnaireApp">
          {this.state.visible === PageEnum.homepage ? <HomePage onButtonClick = {this.basicInfo}/> : null}
          {this.state.visible === PageEnum.basicInfo ? <BasicInfo onButton = {this.onClick} onButtonClick = {this.selectRole}/> : null}
          {this.state.visible === PageEnum.jobtasks ? <QuestionContainer page="1" previous={this.basicInfo} role={this.state.role} heading="Työtehtävät" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.jobtasks)} onButtonClick = {this.wellness}/> : null}
          {this.state.visible === PageEnum.wellness ? <QuestionContainer page="2" previous={this.jobtasks} role={this.state.role} heading="Työyvinvointi" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.wellness)} onButtonClick = {this.development}/> : null}
          {this.state.visible === PageEnum.development ? <QuestionContainer page="3" previous={this.wellness} role={this.state.role} heading="Työssä Kehittyminen" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.development)} onButtonClick = {this.community}/> : null}
          {this.state.visible === PageEnum.community ? <QuestionContainer page="4" previous={this.development} role={this.state.role} heading="Työyhteisö" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.community)} onButtonClick = {this.leadership}/> : null}
          {this.state.visible === PageEnum.leadership ? <QuestionContainer page="5" previous={this.community} role={this.state.role} heading="Johtajuus" questions = {this.state.rightQuestions.filter(question => question.class === QuestionClass.leadership)} onButtonClick = {this.results}/> : null}
          {this.state.visible === PageEnum.results ? <Results questions = {this.state.rightQuestions}/> : null}
        </div>
      );
    }
  }