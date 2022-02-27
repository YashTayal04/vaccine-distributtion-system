import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import SupplyChainContract from "./contracts/SupplyChain.json";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import AdminPanelScreen from "./screens/AdminPanelScreen";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ManufacturerScreen from "./screens/ManufacturerScreen";
import DistributorScreen from "./screens/DistributorScreen";
import DeliveryScreen from "./screens/DeliveryScreen";
import VaccinationCenterScreen from "./screens/VaccinationCenterScreen";

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const networkId = "5777"; // await web3.eth.net.getId();

      const deployedNetwork = SupplyChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState({
        web3,
        accounts,
        contract: instance,
      });
    } catch (error) {
      alert(`Error!!! Failed to load web3, accounts, or contract.`);
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading...</div>;
    }
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/home">
              <HomeScreen
                accounts={this.state.accounts}
                supplyChainContract={this.state.contract}
              />
            </Route>
            <Route exact path="/admin">
              <AdminPanelScreen
                accounts={this.state.accounts}
                supplyChainContract={this.state.contract}
              />
            </Route>
            <Route exact path="/manufacturer">
              <ManufacturerScreen
                accounts={this.state.accounts}
                supplyChainContract={this.state.contract}
              />
            </Route>
            <Route exact path="/distributor">
              <DistributorScreen
                accounts={this.state.accounts}
                supplyChainContract={this.state.contract}
              />
            </Route>
            <Route exact path="/delivery">
              <DeliveryScreen
                accounts={this.state.accounts}
                supplyChainContract={this.state.contract}
              />
            </Route>
            <Route exact path="/vaccinationCenter">
              <VaccinationCenterScreen
                accounts={this.state.accounts}
                supplyChainContract={this.state.contract}
              />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
