import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loans from './components/Loans'
import {loans} from './current-loans.json'

class App extends Component {
  constructor(){
    super()

    this.state = {
      title: 'LendInvest',
      isModalOpen: false,
      loans: [],
      selectedLoan: {},
      possibleInvestments: []
    }
  }

  componentDidMount(){
    this.setState({loans: loans, possibleInvestments: loans})
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <br/>
              <div className="col-md-6"><h1>All Current Loans</h1></div>
              <div className="col-md-6 Investments-title"><h3>Possible Investments: {this.state.possibleInvestments.length}</h3></div>
            </div>
            <div className="col-md-11">
              <Loans 
                openModal={this.openModal}
                isModalOpen={this.state.isModalOpen} 
                closeModal={this.closeModal} 
                loans={this.state.loans}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
