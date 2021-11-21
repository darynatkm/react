
import './App.css';
import React from 'react'
import Coin from './components/Coin/Coin';
import AccountBalance from './components/AccountBalance/AccountBalance';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import axios from 'axios';
//import '/bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/flatly/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all'



const formatPrice = price => parseFloat(Number(price).toFixed(2));
const COIN_COUNT = 10;
function App(props){


  const [balance, setBalance] = React.useState(1000);
  const [showBalance, setShowBalance] = React.useState(true);
  const [coinData, setCoinData] = React.useState([]);
    // constructor(props){
    //   super(props);

    //   // this.handleRefresh=this.handleRefresh.bind(this);
    //   // this.handleBalanceVisibilityChange=this.handleBalanceVisibilityChange.bind(this);
    // }
    const handleRefresh = async (valueChangeId)=>{
      const tickerURL = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
      const response = await axios.get(tickerURL);
      const newPrice = formatPrice(response.data.quotes.USD.price);
      const newCoinData=coinData.map((values)=>{
        let newValues=values;
        if(valueChangeId==newValues.tickerId){
        newValues.price=newPrice;
        }
        return newValues
      });

      setCoinData(coinData);
    }

    const handleTransaction = (isBuy, valueChangeId) => {
      var balanceChange = isBuy ? 1 : -1;
      const newCoinData = coinData.map(function(values){
        let newValues = {...values};
        if(valueChangeId == values.key){
          newValues.balance += balanceChange;
          setBalance(oldBalance => oldBalance - balanceChange * newValues.price);
        }
        return newValues;
      });
      setCoinData(newCoinData);

    }

    React.useEffect(async () => {
      if(coinData.length === 0){
        componentDidMount();
      } 
      
    });
    const componentDidMount= async()=>{

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

      setCoinData(coinPriceData);
    };

  const handleBalanceVisibilityChange=()=>{

      setShowBalance(oldValue => !oldValue)

    }
    const handleBrrrr = () =>{
      setBalance(oldBalance => oldBalance + 1200);
    }
    return (
      <div className="App">
          <Header amount={balance}></Header>        
          <AccountBalance amount={balance} showBalance={showBalance} handleBalanceVisibilityChange={handleBalanceVisibilityChange}></AccountBalance>
          <CoinList coinData={coinData} handleRefresh={handleRefresh} handleTransaction={handleTransaction} showBalance={showBalance}/>
      </div>
    );

  }

  


export default App;
