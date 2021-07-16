import useSWR from 'swr';
import styles from '../styles/ctable.module.css';


export interface CtableProps {
  
}

const fetcher = async(path : string) => {
  const res = await fetch(path);
  
  return res.json();
}

 
const Ctable: React.FC<CtableProps> = () => {
  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/global-coin-research', fetcher);
  if (data!=undefined)
  {
    console.log(data.id);
    console.log(data.contract_address);
    console.log(data.market_data.current_price); //Need to be divided by Market Cap to get Holders
    console.log(data.market_data.ath);
    console.log(data.market_data.atl);
    console.log(data.market_data.market_cap);
    console.log(data.market_data.fully_diluted_valuation);
    console.log(data.market_data.price_change_percentage_7d_in_currency);
    console.log(data.market_data.market_cap_change_24h_in_currency);
    console.log(data.market_data.total_supply);
    console.log(data.market_data.circulating_supply);
  }
  
  if(data!=undefined)
    return ( 
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.item}>
            <h3>Holders</h3>
            <p>{(data.market_data.market_cap.usd/data.market_data.current_price.usd).toFixed(0)}</p>
          </div>
          <div className={styles.item}>
            <h3>Market Cap</h3>
            <p>{data.market_data.market_cap.usd}</p>
          </div>
          <div className={styles.item}>
            <h3>24H Volume</h3>
            <p>{(data.market_data.market_cap_change_24h_in_currency.usd).toFixed(5)}</p>
          </div>
          <div className={styles.item}>
            <h3>All-time-High</h3>
            <p>{data.market_data.ath.usd}</p>
          </div>
          <div className={styles.item}>
            <h3>All-time-Low</h3>
            <p>{data.market_data.atl.usd}</p>
          </div>
          <div className={styles.item}>
            <h3>Contract Address</h3>
            <p className={styles.contract_address}>{data.contract_address}</p>
          </div>
          <div className={styles.item}>
            <h3>Full Diluted MC</h3>
            <p>{data.market_data.fully_diluted_valuation.usd}</p>
          </div>
          <div className={styles.item}>
            <h3>Current Supply</h3>
            <p>{data.market_data.circulating_supply}</p>
          </div><div className={styles.item}>
            <h3>Total Supply</h3>
            <p>{data.market_data.total_supply}</p>
          </div>
        </div>
        <div className={styles.bot}>
          <h3>Weekly Increase/Decrease</h3>
          <p>{data.market_data.price_change_percentage_7d_in_currency.usd}</p>
        </div>
      </div>
    );
  else {
    return (
      <div className={styles.container}>
        ,<h1>Loading</h1>
      </div>
    )
  }
}
 
export default Ctable;