import React from "react";
import AddProductForm from "../components/AddProductForm";
import Navbar from "../components/Navbar";
import { ManufacturedByManufacturer } from "./ManufacturedByManufacturer";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { ShipProductByManufacturer } from "./ShipProductByManufacturer";

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

export default function ManufacturerScreen(props) {
  const classes = useStyles();
  var [state, setCurState] = React.useState(0);
  var [count, setCount] = React.useState(0);
  var [allTableData, setAllTableData] = React.useState([]);
  var [shipTableData, setShipTableData] = React.useState([]);
  var [buyTableData, setBuyTableData] = React.useState([]);
  const accounts = props.accounts;
  const supplyChainContract = props.supplyChainContract;
  React.useEffect(() => {
    (async () => {
      const cnt = await supplyChainContract.methods
        .fetchProductCount()
        .call({ from: accounts[0], gas: 100000 });
      setCount(cnt);
    })();

    (async () => {
      const allArr = [];
      const shipArr = [];
      const buyArr = [];

      for (var i = 1; i < count; i++) {
        const prodState = await supplyChainContract.methods
          .fetchProductState(i)
          .call({ from: accounts[0], gas: 100000 });
        // console.log(prodState);

        if (prodState == "0") {
          const a = await supplyChainContract.methods
            .fetchProduct(i)
            .call({ from: accounts[0], gas: 100000 });
          allArr.push(a);
        } else if (prodState == "1") {
          const a = await supplyChainContract.methods
            .fetchProduct(i)
            .call({ from: accounts[0], gas: 100000 });
          shipArr.push(a);
        }
      }

      setAllTableData(allArr);
      setShipTableData(shipArr);
    })();
  }, [count]);

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Manufacturer
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCurState(0);
              }}
            >
              Add Product
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCurState(1);
              }}
            >
              Ship Product
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCurState(2);
              }}
            >
              All Product
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/home"
            >
              Home
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="form-container">
        {/* <Button variant="contained" color="primary" onClick={() => { setProductForm(true) }}>
            Add Product
        </Button> */}
        <Grid container spacing={2}>
          {state == 0 ? (
            <Grid item xs={12}>
              <AddProductForm
                accounts={accounts}
                supplyChainContract={supplyChainContract}
              />
            </Grid>
          ) : null}
          {state == 1 ? (
            <Grid item xs={12}>
              {/* <ShipProduct data={shipTableData} /> */}
              <ShipProductByManufacturer
                data={shipTableData}
                accounts={accounts}
                supplyChainContract={supplyChainContract}
              />
            </Grid>
          ) : null}
          {state == 2 ? (
            <Grid item xs={12}>
              <ManufacturedByManufacturer data={allTableData} />
            </Grid>
          ) : null}
        </Grid>
      </div>
    </div>
  );
}
