
import './App.css';
import React, { Component } from 'react'
import Coin from './components/Coin/Coin';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import axios from 'axios';


const formatPrice = price => parseFloat(Number(price).toFixed(2));
const COIN_COUNT = 10;
class App extends React.Component{
  state={
    balance: 10000,
    showBalance: true,
    coinData: [
      // {
      //   name: 'Bitcoin',
      //   ticker: 'BTC',
      //   price: 9999.9,
      //   balance: 0.5
        
      // },
      // {
      //   name: 'Ethereum',
      //   ticker: 'ETH',
      //   price: 4000,
      //   balance: 0.3
        
      // },
      // {
      //   name: 'Shiva',
      //   ticker: 'SHV',
      //   price: 600,
      //   balance: 0.6
        
      // }                    

      // <Coin name='Bitcoin' ticker='BTC' price={10000} />
      // <Coin name='Ethereum' ticker='ETH' price={4000} />
      // <Coin name='Shiva' ticker='SHV' price={600} />
    ]
  }
    // constructor(props){
    //   super(props);

    //   // this.handleRefresh=this.handleRefresh.bind(this);
    //   // this.handleBalanceVisibilityChange=this.handleBalanceVisibilityChange.bind(this);
    // }
    f = async (ValueChangeId)=>{
      const tickerURL = `https://api.coinpaprika.com/v1/tickers/${ValueChangeId}`;
      const response = await axios.get(tickerURL);
      const newPrice = formatPrice(response.data.quotes.USD.price);
      const newCoinData=this.state.coinData.map((values)=>{
        let newValues=values;
        if(ValueChangeId==newValues.tickerId){
        newValues.price=newPrice;
        }
        return newValues
      });

      this.setState({coinData: newCoinData})
    }
    componentDidMount= async()=>{

      const response = await axios.get('https://api.coinpaprika.com/v1/coins')

      const coinIds=response.data.slice(0, COIN_COUNT).map(coin => coin.id);
      const tickerURL = 'https://api.coinpaprika.com/v1/tickers/';
      const promises = coinIds.map(key=> axios.get(tickerURL+key));
      const coinData = await Promise.all(promises);
      const coinPriceData = coinData.map(function(response){
        const coin = response.data;
            return {
              key: coin.id,
              name: coin.name,
              ticker: coin.symbol,
              balance: 0,
              price: formatPrice(coin.quotes['USD'].price)
            }
      })

      this.setState({coinData: coinPriceData});
    };

    handleBalanceVisibilityChange=()=>{
      this.setState(oldState=>({
        ...oldState, 
        showBalance: !oldState.showBalance
      }))

    }
  render(){
    return (
      <div className="App">
          <Header amount={this.state.balance}></Header>        
          <AccountBalance amount={this.state.balance} showBalance={this.state.showBalance} handleBalanceVisibilityChange={this.handleBalanceVisibilityChange}></AccountBalance>
          <CoinList coinData={this.state.coinData} handleRefresh={this.handleRefresh} showBalance={this.state.showBalance}/>
      </div>
    );
  }

  
}

export default App;
