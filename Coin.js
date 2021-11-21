class Coin{
    constructor(name, ticker){
        this.name=name;
        this.ticker=ticker;
    }
    toString(){
        return `${this.name} (${this.ticker})`;
    }
}

class ProofOfWorkCoin extends Coin{
    constructor(name, ticker, amount, reward){
        super(name, ticker);
        this.amount=amount;
        this.reward=reward;
    }
    mine(){
        this.amount+=this.reward;
    }
}

const btc=new ProofOfWorkCoin('Bitcoin', 'BTC', 18000000, 6.25

)
`$(btc) $(btc.amount)`;
btc.mine();
`$(btc) $(btc.amount)`;