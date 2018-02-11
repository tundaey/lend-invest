import React from 'react';
import {Badge} from 'react-bootstrap'

const SingleLoan = (props) => (
    <tr className={props.loan.invested? 'invested-row ': ''}
        onClick={(event)=> props.onClick(event, props.loan)}>
        <td>{props.loan.id}</td>
        <td>{props.loan.title}</td>
        <td>{props.loan.tranche}</td>
        <td>{props.loan.available}</td>
        <td>{props.loan.annualised_return}</td>
        <td>{props.loan.term_remaining}</td>
        <td>{props.loan.ltv}</td>
        <td>{props.loan.amount}</td>
        <td><Badge bsClass={props.loan.invested? 'invested-badge': 'badge'}>{props.loan.invested? 'Invested': 'Eligible'}</Badge></td>
    </tr>
)

export default SingleLoan