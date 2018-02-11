import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loans from './components/Loans'
import {loans} from './current-loans.json'
import NavBar from './components/Navbar'
import InvestForm from './components/InvestForm'

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
        <NavBar title={this.state.title}/>
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

              {this.state.isModalOpen 
                ? <InvestForm 
                closeModal={this.closeModal}
                processInvestment={this.processInvestment}
                selectedLoan={this.state.selectedLoan} 
                show={this.state.isModalOpen}/>
              : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  closeModal = (event)=>{
    event.preventDefault()
    this.setState({isModalOpen: false, selectedLoan: {}})
  }

  openModal = (event, loan)=>{
    event.preventDefault()
    this.setState({isModalOpen: true, selectedLoan: loan})
  }

  processInvestment = (loan, investment)=>{
    const available = parseFloat(loan.available.replace(/,/g, ''));
    const newAvailableAmount  = available - investment
    loan['available']= newAvailableAmount.toLocaleString('en')
    const newLoans = this.state.loans.map((l)=> {
      if(l.id === loan.id){
        loan['invested'] = true
        return loan
      }
      return l
    })
    
    this.setState({isModalOpen: false, loans: newLoans})
  }


}

export default App;
