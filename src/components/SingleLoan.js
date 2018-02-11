import React from 'react';

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
    </tr>
)

export default SingleLoan