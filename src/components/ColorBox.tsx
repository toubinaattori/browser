import React from 'react';


export interface IProps{
    color: string;
    name: string;
    average: number;
}



export default class ColorBox extends React.Component<IProps> {



    render() {
      return (<div className="colorBox">
            <span className="colorBoxColor" style={{backgroundColor: this.props.color}}></span>
            <span className="colorBoxName">{this.props.name}</span>
            <span>{this.props.average}</span>
            </div>
      );
    }


  }