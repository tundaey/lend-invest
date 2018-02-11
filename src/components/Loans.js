import React from 'react';
import { Table} from 'react-bootstrap'
import SingleLoan from './SingleLoan'

const Loans = (props)=> (
    <div>
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Tranche</th>
                    <th>Available</th>
                    <th>Annualised Return</th>
                    <th>Term remaining</th>
                    <th>Ltv</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {props.loans.map((loan)=> <SingleLoan onClick={props.openModal} key={loan.id} loan={loan}/>)}
            </tbody>
        </Table>
    </div>
)

export default Loans