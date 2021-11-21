import React, { Component } from 'react';
import './Coin.css';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Td=styled.td`
        border: 1px solid white;
        width: 16vh;
        background: mediumseagreen;
        border-left: 10px solid red;
        `;

const TdControls = styled(Td)`
  width: 36vw;
`;        
const Button = styled.button`
        font-size: 11px;
        width: 64px;
        margin: 3px 5px 0;
    `;//styled buttons

    
    export default class Coin extends Component {
        constructor(props) {
          super(props);
          this.handleClick = this.handleClick.bind(this);
        }
    
        handleClick(event) {
          event.preventDefault();
          this.props.handleRefresh(this.props.tickerId);
        }

    
        render() {
            const coinBalance = this.props.showBalance ?
                                <Td>{this.props.balance}</Td> : null;
                                //conditional display of the coin balance
    
            return (
                <tr>
                  <Td>{this.props.name}</Td>
                  <Td>{this.props.ticker}</Td>
                  <Td>${this.props.price}</Td>
                  {coinBalance}
                  <TdControls>
                    <form action='#' method='POST'>
                      <Button className='btn btn-info' onClick={this.handleClick}>Refresh
                      </Button>
                    </form>
                  </TdControls>
                </tr>
            );//replace elements with conditional objects
          }
    }
Coin.propTypes={
    name: PropTypes.string.isRequired,
    ticker: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired

}
