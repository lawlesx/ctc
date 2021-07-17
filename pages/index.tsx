import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import Ctable from '../components/ctable'
import Modal from '../components/modal'
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion'

const fetcher = async(path : string) => {
  const res = await fetch(path);
  
  return res.json();
}

const coinviseVariant = {
  hidden : {
    opacity : 0,
    y: -100
  },
  visible : {
    opacity: 1,
    y: 0,
    transition :{
      type: 'spring',
      duration: 1
    }
  }
}

const buttonVariant = {
  hidden: {
    opacity : 0,
    x: 200
  },
  visible: {
    opacity: 1,
    x:0,
    transition : {
      delay: 0.8,
      type: 'spring',
      duration: 1
    }
  },
  hover: {
    scale: 1.1
  },
  tap: {
    scale: 0.9
  }
}


export default function Home() {

  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState("usd");
  const { data, error } = useSWR('https://api.coingecko.com/api/v3/coins/global-coin-research', fetcher);


  return (
    <div className={styles.container}>
      <Head>
        <title>CTC</title>
        <meta name="description" content="Coinvise Technical Challenge" />
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      </Head>
      <div className="header">
        <motion.h1 variants={coinviseVariant} initial='hidden' animate='visible'>Coinvise Techincal Challenge</motion.h1>
        <motion.div variants={buttonVariant} initial='hidden' animate='visible' whileHover='hover' whileTap='tap' className="drop-down" onClick={()=> setModal(true)}>
          <h1>{coin}</h1>
          <div className="tri-container">
            <div className="tri"></div>
          </div>
        </motion.div>
      </div>
      <Ctable data={data} coin={coin}/>
      <AnimatePresence>
      {
        modal && <Modal setModal={setModal} data={data.market_data.ath} setCoin={setCoin}/>
      }
      </AnimatePresence>
    </div>
  )
}
