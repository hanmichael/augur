import React, { Component } from 'react'

export default class Metamask extends Component {
  componentWillMount(){
    window.addEventListener('load', () => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        console.log('metamask present')
        // window.web3 = new Web3(web3.currentProvider);
      } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      }
    })
  }

  render() {
    return (
      <span>testin</span>
    )
  }
}
