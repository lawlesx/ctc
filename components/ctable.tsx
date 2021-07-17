import { useState } from 'react';
import styles from '../styles/ctable.module.css';
import { AnimatePresence, motion } from 'framer-motion';

export interface CtableProps {
  data: any;
  coin: string;
}

const topVariants = {
  hidden : {
    scale: 0,
    opacity: 0
  },
  visible : {
    scale: 1,
    opacity: 1,
    transition : {
      delay: 1.5,
      type : 'spring',
      duration: 3
    }
  }
}

const itemVariants = {
  hover: {
    scale: 1.1
  }
}

const errorVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  },
  exit : {
    opacity: 0,
    scale: 2
  }
}
 
const Ctable: React.FC<CtableProps> = ({data , coin}) => {

  const [clipboard, setClipboard] = useState('');

  return ( 
    data!=undefined ?
    <motion.div className={styles.container}>
      <motion.div variants={topVariants} initial='hidden' animate='visible' className={styles.top}>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>Holders</h3>
          <p>{(data.market_data.market_cap[coin]/data.market_data.current_price[coin]).toFixed(0)}</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>Market Cap</h3>
          <p>{data.market_data.market_cap[coin]}</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>24H Volume</h3>
          <p>{(data.market_data.market_cap_change_24h_in_currency[coin]).toFixed(5)}</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>All-time-High</h3>
          <p>{data.market_data.ath[coin]}</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>All-time-Low</h3>
          <p>{data.market_data.atl[coin]}</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item} onClick={() => navigator.clipboard.writeText(clipboard)}>
          <h3>Contract Address</h3>
          <p className={styles.contract_address} onClick={() => {
              setClipboard(data.contract_address)
              alert('Copied to Clipboard')
            }
            }>
            {data.contract_address}
          </p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>Full Diluted MC</h3>
          <p>{data.market_data.fully_diluted_valuation[coin]}</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>Current Supply</h3>
          <p>{data.market_data.circulating_supply}</p>
        </motion.div>
        <motion.div variants={itemVariants} whileHover='hover' className={styles.item}>
          <h3>Total Supply</h3>
          <p>{data.market_data.total_supply}</p>
        </motion.div>
      </motion.div>
      <motion.div variants={topVariants} initial='hidden' animate='visible' className={styles.bot}>
        <h3>Weekly Increase/Decrease</h3>
        <p>{data.market_data.price_change_percentage_7d_in_currency[coin]}</p>
      </motion.div>
    </motion.div>
    :
    <AnimatePresence>
      <motion.div variants={errorVariants} initial='hidden' animate='visible' exit='exit' className={styles.error}>
        <h1>Loading...</h1>
      </motion.div>
    </AnimatePresence>
  );

}
 
export default Ctable;