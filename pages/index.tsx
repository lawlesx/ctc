import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'
import Ctable from '../components/ctable'

export default function Home() {
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
        <h1>Coinvise Techincal Challenge</h1>
        <div className="drop-down">
          <h1>USD</h1>
          <div className="tri-container">
            <div className="tri"></div>
          </div>
        </div>
      </div>
      <Ctable />
    </div>
  )
}
