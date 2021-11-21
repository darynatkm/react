import React from 'react'
import './AccountBalance.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Section=styled.section`
        border: 1px solid red;
        font-size: 2rem;
        text-align: left;
        margin: 0 auto 2rem auto;
        display: inline-block;
        `;

const Button = styled.button`
    margin: 0.8px;

`;

var formatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

const Balance = styled.div`
    min-width: 250px;
    margin: 0.5rem 0 0 2.5rem;
    font-size: 1.5em;
    vertical-align: middle;
    text-align: left;


`;
const BalanceToggleButton = styled(Button)`
    width: 150px;
    

`;


export default function AccountBalance(props) {

        const buttonText=props.showBalance ? 'Hide Balance' : 'Show Balance';

        let content='\u00A0';
        if(props.showBalance){
            content = <>{formatter.format(props.amount)}</>
        }
        
        const buttonClass='btn '+(props.showBalance ? 'btn-warning' : 'btn-info')
        if(props.showBalance){
            content=<>Balance: ${props.amount}</>
        }
        return (
            <>
            <Balance>
               {content}
            </Balance>
            <Section className='section'>

               <BalanceToggleButton
               className={buttonClass} 
               onClick={props.handleBalanceVisibilityChange}>{buttonText}
               </BalanceToggleButton>
               <Button className="btn btn-success"
                        onClick={props.handleBrrrr}>
                   <i className="fas fa-helicopter"></i>
               </Button>
            </Section>
            </>
        )
    }



AccountBalance.propTypes={
    amount: PropTypes.number.isRequired

}