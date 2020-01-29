import React from 'react';
  import {  Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RoleEnum, PageEnum } from '../domain';

  export interface IProps{
    onButtonClick: (role: RoleEnum) => void;
    onButton: (page: PageEnum) => void; 
}

export default class BasicInfo extends React.Component<IProps> {

    constructor (props: IProps){
        super(props);
        this.changeRole = this.changeRole.bind(this);
      
      }

    render() {
      return (
        <div className="BasicInfo">
          <Form>
        <FormGroup>
            <Label for="role">Rooli</Label>
            <Input type="select" name ="role" id="role" onChange={this.changeRole}>
                <option value="manager">Esimies</option>
                <option value="employer">Työntekijä</option>
          </Input>
        </FormGroup>
      </Form>
          <Button onClick={() =>this.props.onButton(PageEnum.jobtasks)} color="link">Seuraava sivu</Button>
        </div>
      );
    }


    changeRole(event: React.ChangeEvent<HTMLInputElement>){
        if(event.target.value === "manager"){
            this.props.onButtonClick(RoleEnum.manager);
        }
        else{
            this.props.onButtonClick(RoleEnum.employer);
        }
    }

  }