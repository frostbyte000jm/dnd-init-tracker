import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import {initialState} from './constants';

//Global Variables
var indexNum = 5;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      //indexNum: 5,
      initiativeStartValue: 0,
      hitPointStartValue: 0,
      elements: initialState,
    };
    this.updateName = this.updateName.bind(this); //bind is a way to make something avail outside the function
    this.updateInitiative = this.updateInitiative.bind(this);
    this.updateHitPoints = this.updateHitPoints.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  IncrementIndex = () =>{
    console.log("IncrementIndex() Start",indexNum)
    indexNum = (indexNum + 1);
    //this.setState({indexNum2});
    console.log("IncrementIndex() End",indexNum)
  }
  
  updateName(id, e) {
    const {value} = e.target;
    const elements = this.state.elements;
    const index = elements.findIndex(el => el.id === id);
    elements[index].name = value;
    this.setState({elements}); //This is how we make a change to the array
  }

  updateInitiative(id, e) {
    clearTimeout(this.timeout_);//Figure out how to change after leave input.
    const {value} = e.target;
    const elements = this.state.elements;
    const index = elements.findIndex(el => el.id === id);
    elements[index].initiative = Number(value);
    this.setState({elements}); //This is how we make a change to the array
    this.timeout_ = setTimeout (() => this.sortElements(), 500);
  }

  updateHitPoints(id, e) {
    const {value} = e.target;
    const elements = this.state.elements;
    const index = elements.findIndex(el => el.id === id);
    elements[index].hitPoints = Number(value);
    this.setState({elements}); //This is how we make a change to the array    
  }

  updateInitiStartValue(e) {
    const {value} = e.target;
    const initiativeStartValue = Number(value);
    this.setState({initiativeStartValue});
  }

  updateHitPointStartValue(e) {
    const {value} = e.target;
    const hitPointStartValue = Number(value);
    this.setState({hitPointStartValue});
  }

  resetCharacterInputs(){
    const initiativeStartValue = 0;
    this.setState({initiativeStartValue});
    const hitPointStartValue = 0;
    this.setState({hitPointStartValue});
  }

  sortElements(){
    const { elements } = this.state;
    this.setState({
      elements: elements.sort((a,b) => b.initiative - a.initiative)
    });    
  }

  removeElement(id){//Left off here.
    const { elements } = this.state;

    this.setState({
      elements: elements.sort((a,b) => b.initiative - a.initiative)
    }); 
  }

  addCard(){
    console.log("addCard() Start",indexNum)
    this.IncrementIndex(); //??why does this not happen before the rest of the code. I would expect player 5 to be 6 right now??
    console.log("addCard() after IncrementIndex()",indexNum)
    const { elements } = this.state;
    elements[elements.length] = {
      id: indexNum,
      name: 'Player '+ (elements.length+1),
      initiative: this.state.initiativeStartValue, //Figure out how to give a value and it will roll a d20 then sort.
      hitPoints: this.state.hitPointStartValue,
    };
    this.sortElements();
    this.resetCharacterInputs();
    console.log("addCard() End",indexNum)
  }

  render() {
    const {elements}=this.state;
    return ( //Create card and display.
      <div> 
        <label>  Initiative Value:</label>
        <input type="number" value={this.state.initiativeStartValue} onChange ={e => this.updateInitiStartValue(e)} /><br/>
        <label>  Hit Points:</label>
        <input type="number" value={this.state.hitPointStartValue} onChange ={e => this.updateHitPointStartValue(e)} /><br/>
        <button onClick={this.addCard}> Add </button>
        {elements.map(element =>
          <Card
            key={element.id}
            name={element.name}
            initiative={element.initiative}
            hitPoints={element.hitPoints}
            id={element.id}
            onNameChange={this.updateName}
            onInitiativeChange={this.updateInitiative}
            onHitPointsChange={this.updateHitPoints}
          />
        )}
      </div>
    );
  }
}

export default App;
