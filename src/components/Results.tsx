import React from "react";
import { Question, QuestionClass } from "../domain";
import RadarChart from "../lib";
import ColorBox from "./ColorBox";
import QuestionList from "./QuestionList";
import { Button, Tooltip, Jumbotron } from "reactstrap";
const jsPDF = require("jspdf");
require("jspdf-autotable");
import LogoImg from "../static/logo2017.png";

export interface IProps {
  questions: Question[];
}

export interface IState {
  wellness: number;
  jobtasks: number;
  community: number;
  leaderhip: number;
  development: number;
  tooltipOpen: boolean;
}

export default class Results extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.calculateSD = this.calculateSD.bind(this);
    this.calculateAverage = this.calculateAverage.bind(this);
    this.orderQuestions = this.orderQuestions.bind(this);
    this.pdf = this.pdf.bind(this);
    this.state = {
      wellness: 0,
      jobtasks: 0,
      community: 0,
      leaderhip: 0,
      development: 0,
      tooltipOpen: false
    };
  }

  calculateSD(questions: Question[]): number {
    const results: number[] = questions.flatMap(q => q.answer);
    const average = results.reduce((a, b) => a + b) / questions.length;
    let sd = 0;
    let q = 0;
    for (q; q < questions.length; q++) {
      sd = sd + Math.abs(questions[q].answer - average);
    }
    sd = sd / q;
    const maxAv =
      ((questions.length / 2) * 5 + (questions.length - questions.length / 2)) /
      questions.length;
    const maxSd =
      ((questions.length / 2) * (5 - maxAv) +
        (maxAv - 1) * (questions.length - questions.length / 2)) /
      questions.length;
    return sd / maxSd;
  }

  calculateAverage(questions: Question[]): number {
    const results: number[] = questions.flatMap(q => q.answer);
    const average = results.reduce((a, b) => a + b) / questions.length;
    return average / 5;
  }

  orderQuestions(
    q1: Question[],
    q2: Question[],
    q3: Question[],
    q4: Question[],
    q5: Question[]
  ): Array<Question[]> {
    let array: Array<Question[]> = [];
    array.push(q1);
    array.push(q2);
    array.push(q3);
    array.push(q4);
    array.push(q5);
    array.sort((a, b) => this.calculateAverage(b) - this.calculateAverage(a));
    return array;
  }

  pdf(): any {
    var doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(15, 20, "Mittari työnohjaustarpeen arvioimiseen");
    doc.addImage(LogoImg, "PNG", 155, 12, 50, 12);
    doc.setFontSize(14);
    let columns = [
      { title: "Työhyvinvointi", dataKey: "q" },
      { title: "", dataKey: "answer" }
    ];
    var rowswell: any = [];
    this.props.questions
      .filter(q => q.class === QuestionClass.wellness)
      .forEach(q => {
        rowswell.push({ q: q.question, answer: q.answer });
      });
    doc.autoTable(columns, rowswell, {
      styles: { fillColor: [178, 178, 178] },
      columnStyles: {
        id: { fillColor: 255 }
      },
      margin: { top: 30 }
    });
    let columns1 = [
      { title: "Työssä Kehittyminen", dataKey: "q" },
      { title: "", dataKey: "answer" }
    ];
    var rowsdev: any = [];
    this.props.questions
      .filter(q => q.class === QuestionClass.development)
      .forEach(q => {
        rowsdev.push({ q: q.question, answer: q.answer });
      });
    doc.autoTable(columns1, rowsdev, {
      styles: { fillColor: [178, 178, 178] },
      columnStyles: {
        id: { fillColor: 255 }
      },
      margin: { top: 60 }
    });
    var rowsdlead: any = [];
    let columns2 = [
      { title: "Johtajuus", dataKey: "q" },
      { title: "", dataKey: "answer" }
    ];
    this.props.questions
      .filter(q => q.class === QuestionClass.leadership)
      .forEach(q => {
        rowsdlead.push({ q: q.question, answer: q.answer });
      });
    doc.autoTable(columns2, rowsdlead, {
      styles: { fillColor: [178, 178, 178] },
      columnStyles: {
        id: { fillColor: 255 }
      },
      margin: { top: 10 }
    });
    let columns3 = [
      { title: "Työtehtävät", dataKey: "q" },
      { title: "", dataKey: "answer" }
    ];
    var rowsjob: any = [];
    this.props.questions
      .filter(q => q.class === QuestionClass.jobtasks)
      .forEach(q => {
        rowsjob.push({ q: q.question, answer: q.answer });
      });
    doc.autoTable(columns3, rowsjob, {
      styles: { fillColor: [178, 178, 178] },
      columnStyles: {
        id: { fillColor: 255 }
      },
      margin: { top: 10 }
    });
    var rowsdcom: any = [];
    let columns4 = [
      { title: "Työyhteisö", dataKey: "q" },
      { title: "", dataKey: "answer" }
    ];
    this.props.questions
      .filter(q => q.class === QuestionClass.community)
      .forEach(q => {
        rowsdcom.push({ q: q.question, answer: q.answer });
      });
    doc.autoTable(columns4, rowsdcom, {
      styles: { fillColor: [178, 178, 178] },
      columnStyles: {
        id: { fillColor: 255 }
      },
      margin: { top: 10 }
    });
    const wellness = this.props.questions.filter(
      q => q.class === QuestionClass.wellness
    );
    const community = this.props.questions.filter(
      q => q.class === QuestionClass.community
    );
    const jobtasks = this.props.questions.filter(
      q => q.class === QuestionClass.jobtasks
    );
    const leadership = this.props.questions.filter(
      q => q.class === QuestionClass.leadership
    );
    const development = this.props.questions.filter(
      q => q.class === QuestionClass.development
    );
    var rowsdfin: any = [];
    let columns5 = [
      { title: "osio", dataKey: "r" },
      { title: "keskiarvo", dataKey: "av" },
      { title: "muutos", dataKey: "ch" },
      { title: "tärkeiden keskiarvo", dataKey: "iav" },
      { title: "hajonta", dataKey: "sd" }
    ];
    rowsdfin.push({
      r: "Työhyvinvointi",
      av: this.calculateAverage(wellness),
      ch: this.calculateAverage(wellness.filter(w => w.isChange)),
      iav: this.calculateAverage(wellness.filter(w => w.isImportant)),
      sd: this.calculateSD(wellness)
    });
    rowsdfin.push({
      r: "Työtehtävät",
      av: this.calculateAverage(jobtasks),
      ch: this.calculateAverage(jobtasks.filter(w => w.isChange)),
      iav: this.calculateAverage(jobtasks.filter(w => w.isImportant)),
      sd: this.calculateSD(jobtasks)
    });
    rowsdfin.push({
      r: "Johtajuus",
      av: this.calculateAverage(leadership),
      ch: this.calculateAverage(leadership.filter(w => w.isChange)),
      iav: this.calculateAverage(leadership.filter(w => w.isImportant)),
      sd: this.calculateSD(leadership)
    });
    rowsdfin.push({
      r: "Työssä kehittyminen",
      av: this.calculateAverage(development),
      ch: this.calculateAverage(development.filter(w => w.isChange)),
      iav: this.calculateAverage(development.filter(w => w.isImportant)),
      sd: this.calculateSD(development)
    });
    rowsdfin.push({
      r: "Työyhteisö",
      av: this.calculateAverage(community),
      ch: this.calculateAverage(community.filter(w => w.isChange)),
      iav: this.calculateAverage(community.filter(w => w.isImportant)),
      sd: this.calculateSD(community)
    });
    doc.autoTable(columns5, rowsdfin, {
      styles: { fillColor: [178, 178, 178] },
      columnStyles: {
        id: { fillColor: 255 }
      },
      margin: { top: 10 }
    });
    doc.save("tulokset.pdf");
  }

  render() {
    const wellness = this.props.questions.filter(
      q => q.class === QuestionClass.wellness
    );
    const community = this.props.questions.filter(
      q => q.class === QuestionClass.community
    );
    const jobtasks = this.props.questions.filter(
      q => q.class === QuestionClass.jobtasks
    );
    const leadership = this.props.questions.filter(
      q => q.class === QuestionClass.leadership
    );
    const development = this.props.questions.filter(
      q => q.class === QuestionClass.development
    );
    const questionList: Array<Question[]> = this.orderQuestions(
      wellness,
      community,
      jobtasks,
      leadership,
      development
    );
    return (
      <div>
        <h2 className="questionnaire-page-heading">Tulokset</h2>
        <RadarChart
          captions={{
            // columns
            important: "Tärkeiden kysymysten keskiarvo",
            hajonta: "Hajonta",
            keskiarvo: "Keskiarvo",
            change: "Muutos"
          }}
          id="resultsRadarChart"
          data={[
            {
              data: {
                keskiarvo: this.calculateAverage(questionList[0]),
                important: this.calculateAverage(
                  questionList[0].filter(w => w.isImportant)
                ),
                change: this.calculateAverage(
                  questionList[0].filter(w => w.isChange)
                ),
                hajonta: this.calculateSD(questionList[0])
              },
              meta: { color: "#58FCEC" }
            },
            {
              data: {
                keskiarvo: this.calculateAverage(questionList[1]),
                important: this.calculateAverage(
                  questionList[1].filter(w => w.isImportant)
                ),
                change: this.calculateAverage(
                  questionList[1].filter(w => w.isChange)
                ),
                hajonta: this.calculateSD(questionList[1])
              },
              meta: { color: "#f54542" }
            },
            {
              data: {
                keskiarvo: this.calculateAverage(questionList[2]),
                important: this.calculateAverage(
                  questionList[2].filter(w => w.isImportant)
                ),
                change: this.calculateAverage(
                  questionList[2].filter(w => w.isChange)
                ),
                hajonta: this.calculateSD(questionList[2])
              },
              meta: { color: "#f5e907" }
            },
            {
              data: {
                keskiarvo: this.calculateAverage(questionList[3]),
                important: this.calculateAverage(
                  questionList[3].filter(w => w.isImportant)
                ),
                change: this.calculateAverage(
                  questionList[3].filter(w => w.isChange)
                ),
                hajonta: this.calculateSD(questionList[3])
              },
              meta: { color: "#bb07f2" }
            },
            {
              data: {
                keskiarvo: this.calculateAverage(questionList[4]),
                important: this.calculateAverage(
                  questionList[4].filter(w => w.isImportant)
                ),
                change: this.calculateAverage(
                  questionList[4].filter(w => w.isChange)
                ),
                hajonta: this.calculateSD(questionList[4])
              },
              meta: { color: "#3ffc05" }
            }
          ]}
          size={500}
        />
        <div id="resultPdf">
          <div className="colorBoxContainer">
            <div className="colorBoxHeader">
              Värien selitykset ja keskiarvot
            </div>
            <ColorBox
              name={questionList[0][0].className}
              color="#58FCEC"
              average={
                Math.round(this.calculateAverage(questionList[0]) * 5 * 100) /
                100
              }
            />
            <ColorBox
              name={questionList[1][0].className}
              color="#f54542"
              average={
                Math.round(this.calculateAverage(questionList[1]) * 5 * 100) /
                100
              }
            />
            <ColorBox
              name={questionList[2][0].className}
              color="#f5e907"
              average={
                Math.round(this.calculateAverage(questionList[2]) * 5 * 100) /
                100
              }
            />
            <ColorBox
              name={questionList[3][0].className}
              color="#bb07f2"
              average={
                Math.round(this.calculateAverage(questionList[3]) * 5 * 100) /
                100
              }
            />
            <ColorBox
              name={questionList[4][0].className}
              color="#3ffc05"
              average={
                Math.round(this.calculateAverage(questionList[4]) * 5 * 100) /
                100
              }
            />
          </div>
          <Jumbotron className="resultExplanations">
            Kaaviossa on yhteenveto vastauksistasi. Jokaista kyselyn osa-aluetta
            kuvastaa yksi värikoodattu alue. Mitä pienempi kyseisen alueen
            pinta-ala on, sitä enemmän voisit hyötyä työnohjauksesta. Jokaisesta
            osa-alueesta on laskettu neljä arvoa: kaikkien vastaustesi
            keskiarvo, tärkeiden kysymystesi keskiarvo, muutoskysymyksen arvo,
            sekä vastaustesi hajonta. Kannattaa kiinnittää myös huomiota
            hajonta-osioon. Mikäli keskiarvosi on kolmen tai kahden tienoilla,
            mutta hajontasi on korkea, tarkoittaa se sitä, että olit usein
            täysin eri mieltä ja usein täysin samaa mieltä. Myös tällöin voisit
            hyötyä työnohjauksesta.
          </Jumbotron>
          <div>
            <Button
              onClick={this.pdf}
              color="link"
              className="questionnaireButton"
            >
              Lataa PDF
            </Button>
          </div>
          <div
            className="finalResultAnswers"
            style={{ display: "inline-grid" }}
          >
            <QuestionList
              headline={questionList[0][0].class}
              question={questionList[0]}
            />
            <QuestionList
              headline={questionList[1][0].class}
              question={questionList[1]}
            />
            <QuestionList
              headline={questionList[2][0].class}
              question={questionList[2]}
            />
            <QuestionList
              headline={questionList[3][0].class}
              question={questionList[3]}
            />
            <QuestionList
              headline={questionList[4][0].class}
              question={questionList[4]}
            />
          </div>
        </div>
      </div>
    );
  }
}
