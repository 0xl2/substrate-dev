import React, { Component } from "react";
import logo from "./logo.svg";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Abi, ContractPromise } from "@polkadot/api-contract";
import keyring from "@polkadot/ui-keyring";
import "./App.css";
import abiJson from "./metadata.json";

const wsProvider = new WsProvider("wss://18.116.242.92:443");
// const address = '5F8o8SVidb24C2bNU9ZiJAJEyyf4pemesq1q2z9KzUpgmkVj';
const address = "5GFv16iwLFXqbmPhRoTWCTWZrczRFcz9UFgpsNDcufXGcmkF";

keyring.loadAll({ ss58Format: 42, type: "sr25519" });

class App extends Component {
  constructor(props) {
    super(props);

    this.contract = null;
  }

  componentDidMount() {
    this.initInstance();
  }

  initInstance = async () => {
    const api = await ApiPromise.create({ provider: wsProvider });
    const abi = new Abi(abiJson, api.registry.getChainProperties());

    const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";

    const ALICEPAIR = keyring.getPair(ALICE);

    this.contract = new ContractPromise(api, abi, address);

    if (this.contract) {
      const assetID = 2000;

      // this.contract.query.mint(ALICE, {value: 0, gasLimit: 200000000000}, assetID)
      // .then(result => {

      // api.tx.contracts
      // .call(address, 0, 200000000000, this.contract.abi.messages[8].toU8a([assetID]))
      // .signAndSend(ALICEPAIR, result => {

      this.contract.tx
        .mint({ value: 0, gasLimit: 200000000000 }, assetID)
        .signAndSend(ALICEPAIR, (result) => {
          console.log(result);

          this.contract.query
            .ownerOf(
              "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
              { value: 0, gasLimit: 200000000000 },
              assetID
            )
            .then((result1) => {
              console.log(result1);
              const { value } = result1.output;
              if (value) {
                console.log(JSON.stringify(value), value);
              }
            });
        });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
