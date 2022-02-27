import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../css/Distributorscreen.css";

import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

const date = new Date();
const d = date.getFullYear();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: "left",
    flexGrow: 1,
  },
}));

export function BuyProductByVaccinationCenter(props) {
  // console.log(props.data[0]);

  // var [tableData, setTableData] = React.useState([]);
  const accounts = props.accounts;
  const supplyChainContract = props.supplyChainContract;

  const handleBuyButton = async (id) => {
    await supplyChainContract.methods
      .purchaseByVaccinationCenter(id)
      .send({ from: accounts[0], gas: 10000000 });

    // setCount(0);
  };

  return (
    <div className="Distributor">
      <table>
        <tr>
          <th>Product ID </th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Product Category </th>
          <th>Owner</th>
          <th>State</th>
          <th>Buy</th>
        </tr>
        {/* adding data using loop */}
        {props.data.map((s) => {
          return (
            <tr>
              <td>{s[1]}</td>
              <td>{s[2]}</td>
              <td>{s[3]}</td>
              <td>{s[4]}</td>
              <td>{s[0]}</td>
              <td>{s[5]}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleBuyButton(s[1])}
                >
                  Buy
                </Button>
                {/* <Buy onClick={() => handleBuyButton(s[0])} /> */}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
