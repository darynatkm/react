import React from 'react';
import './Coin.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td=styled.td`
        border: 1px solid white;
        width: 25vh;
        background: mediumseagreen;
        border-left: 10px solid red;
        `;

const Button = styled.button`
        font-size: 1.0rem;
        margin: 0.5rem 0 0.5rem 0;
    `;//styled buttons
    
export default function Coin(props){
        // constructor(props) {
        //   super(props);
        //   this.handleClick = this.handleClick.bind(this);
        // }
    
        const handleClick = (event) =>{
            event.preventDefault();
            props.handleRefresh(props.tickerId);            
        }

        const handleBuy= (event) =>{
          event.preventDefault();
          props.handleTransaction(true, props.tickerId);
        }
        const handleSell= (event) =>{
          event.preventDefault();
          props.handleTransaction(false, props.tickerId);
        }      
    

            const coinBalance = props.showBalance ?
                                <Td>{props.balance}</Td> : null;
                                //conditional display of the coin balance
    
            return (
                <tr>
                  <Td>{props.name}</Td>
                  <Td>{props.ticker}</Td>
                  <Td>${props.price}</Td>
                  {coinBalance}
                  <Td>
                    <form action='#' method='POST'>
                    <Button className='btn btn-info' onClick={handleClick}>Refresh
                      </Button>
                      <Button className='btn btn-success' onClick={handleBuy}>Buy
                      </Button>
                      <Button className='btn btn-danger' onClick={handleSell}>Sell
                      </Button>
                    </form>
                  </Td>
                </tr>
            );//replace elements with conditional objects
          }
    
Coin.propTypes={
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired

}
