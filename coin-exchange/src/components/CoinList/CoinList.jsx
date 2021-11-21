import React from 'react'
import Coin from '../Coin/Coin';

export default function CoinList(props){
  

      return (
        <div>
          <table>
              <thead> 
                <tr>
                  <th>Name</th>
                  <th>Ticker</th>
                  <th>Price</th>
                  {props.showBalance ? <th>Balance</th> : null}
                  <th>Update</th>
                </tr>
              </thead>
            <tbody >
                { 
                props.coinData.map(({key, name, ticker, price, balance}) => <Coin key = {ticker} 
                handleRefresh = {props.handleRefresh}
                handleTransaction = {props.handleTransaction}
                name = {name} 
                ticker = {ticker} 
                price = {price} 
                balance = {balance}
                showBalance = {props.showBalance}
                tickerId = {key}
                />) 
                }
            </tbody>  
          </table> 
        </div>
        )
    }
