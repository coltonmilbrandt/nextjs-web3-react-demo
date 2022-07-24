import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useWeb3React } from "@web3-react/core"
import { InjectedConnector } from "@web3-react/injected-connector"
import { abi } from "../constants/abi"
import { ethers } from 'ethers'

const injected = new InjectedConnector()

export default function Home() {
  // has a field library renamed to provider
  // checks to see if we are actively connected or not
  // it's a hook across all of our pages
  const { activate, active, library: provider} = useWeb3React()

  async function connect() {
    try {
      // activate is a web3React function automatically
      // there's a lot of connectors build it, matic, trezor, metamask etc.
      await activate(injected)
    } catch(e){
      console.error(e)
    }
  }

  async function execute() {
    if(active) { 
      console.log("Running execute...")
      const signer = provider.getSigner()
      const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        contract.store(42)
      } catch(error) {
        console.error(error)
      }
    }
  }

  async function retrieve() {
    if(active) { 
      console.log("Running execute...")
      const signer = provider.getSigner()
      const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const result = await contract.retrieve()
        console.log(result.toString())
      } catch(error) {
        console.error(error)
      }
    }
  }

  return (
    <div className={styles.container}>
      Hello there, friend!
      {/* Active comes from useWeb3Connect */}
      {active ? (
        <>
        "Connected!" <button onClick={() => execute()}>Execute</button>
        "Connected!" <button onClick={() => retrieve()}>Retrieve</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect</button>
      )}
    </div>
  )
}
