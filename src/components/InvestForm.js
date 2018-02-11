import React, {Component} from 'react';
import {Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class InvestForm extends Component {
    constructor(){
        super()
        this.state = {
            investment: 0,
            loan: {}
        }
    }

    render(){
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Invest</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <FormGroup controlId="formBasicText">
                        <ControlLabel>Enter Desired Investment(£)</ControlLabel>
                        <FormControl
                            type="number"
                            value={this.state.investment}
                            placeholder="0"
                            onChange={this.updateForm}
                        />
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button id="cancelButton" onClick={(event)=> this.props.closeModal(event)}>Cancel</Button>
                    <Button id="investButton" onClick={(event)=> this.updateLoan(event)}  bsStyle="primary">Invest</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default InvestForm