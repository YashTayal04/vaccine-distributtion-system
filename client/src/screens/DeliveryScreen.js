import React from "react";
import AddProductForm from "../components/AddProductForm";
import Navbar from "../components/Navbar";
// import { ProductTable } from "./ProductTable";
import { Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
// import { BuyProduct } from "./BuyProduct";
import { ShipProductByDelivery } from "./ShipProductByDelivery";
import { ReceiveProductByDelivery } from "./ReceiveProductByDelivery";

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

export default function DeliveryScreen(props) {
  const classes = useStyles();
  var [state, setCurState] = React.useState(0);
  var [count, setCount] = React.useState(0);
  var [shipTableData, setShipTableData] = React.useState([]);
  var [receiveTableData, setReceiveTableData] = React.useState([]);

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
      const shipArr = []; // 6
      const receiveArr = []; // 5

      for (var i = 1; i < count; i++) {
        const prodState = await supplyChainContract.methods
          .fetchProductState(i)
          .call({ from: accounts[0], gas: 100000 });
        // console.log(prodState);

        if (prodState == "6") {
          const a = await supplyChainContract.methods
            .fetchProduct(i)
            .call({ from: accounts[0], gas: 100000 });
          shipArr.push(a);
        } else if (prodState == "5") {
          const a = await supplyChainContract.methods
            .fetchProduct(i)
            .call({ from: accounts[0], gas: 100000 });
          receiveArr.push(a);
        }
      }

      setShipTableData(shipArr);
      setReceiveTableData(receiveArr);
    })();
  }, [count]);

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Delivery Hub
            </Typography>
            {/* <Button
							variant="contained"
							color="secondary"
							onClick={() => {
								setCurState(0);
							}}
						>
							Add Product
						</Button> */}
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCurState(0);
              }}
            >
              Ship Product
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCurState(1);
              }}
            >
              Receive Product
            </Button>
            &nbsp; &nbsp;
            {/* <Button
							variant="contained"
							color="secondary"
							onClick={() => {
								setCurState(2);
							}}
						>
						 Received Products
						</Button> */}
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
              <ShipProductByDelivery
                data={shipTableData}
                accounts={accounts}
                supplyChainContract={supplyChainContract}
              />
            </Grid>
          ) : null}
          {state == 1 ? (
            <Grid item xs={12}>
              <ReceiveProductByDelivery
                data={receiveTableData}
                accounts={accounts}
                supplyChainContract={supplyChainContract}
              />
            </Grid>
          ) : null}
        </Grid>
      </div>
    </div>
  );
}

// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import {Link} from "react-router-dom";
// import "../css/Distributorscreen.css";
// const date=new Date();
// const d=date.getFullYear();

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         textAlign: 'left',
//         flexGrow: 1,
//     },
// }));

//  function Navbar() {
//     const classes = useStyles();
//     return (
//         <div className={classes.root}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" className={classes.title}>
//                         Vaccine Distribution System
//                     </Typography>
//                     <Button variant="contained" color="primary"  component={Link} to="/">
//                         Delivery
//                     </Button>
//                     <Button variant="contained" color="primary" component={Link} to="/">
//                         Buy Product
//                     </Button>
//                     <Button variant="contained" color="primary" component={Link} to="/">
//                         Receive Product
//                     </Button>
//                     <Button variant="contained" color="primary" component={Link} to="/">
//                         Ship   Product
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     )
// }
// function Ship(){
//     return (
//         <Button variant="contained" color="primary" component={Link} to="/delivery/ship">
//         Ship
//         </Button>
//     )
// }
// function DeliveryTable(prob) {
//     return (
//       <div className="Distributor">
//         <table>
//           <tr>
//             <th>Universal ID</th>
//             <th>Product Code</th>
//             <th>Manufacture</th>
//             <th>Manufacture Date</th>
//             <th>Product Name </th>
//             <th> Owner</th>
//             <th>Ship </th>

//           </tr>
//          {/* adding data using loop */}
//           {prob.data.map((val, key) => {
//             return (
//               <tr key={key}>
//                 <td>{val.Universal_ID}</td>
//                 <td>{val.Product_Code}</td>
//                 <td>{val.Manufacture}</td>
//                 <td>{val.Manufacture_Date}</td>
//                 <td>{val.Product_Name}</td>
//                 <td>{val.Owner}</td>
//                 <td><Ship /></td>

//               </tr>
//             )
//           })}
//         </table>
//       </div>
//     );
//   }

//   //  contain array of object that need to be show on table
//    const data=[{Universal_ID:"Universal ID"
//     ,Product_Code:"Product_Code",
//     Manufacture:"Manufacture",
//     Manufacture_Date:"Date",
//     Product_Name:"Product Name",
//     Owner:"Owner",
//     ship:true}];

// function DeliveryScreen(){
//     return (<div><Navbar /><DeliveryTable data={data} /><footer>Copyright @vaccine distributtion {d}</footer></div>)
// }
// export default DeliveryScreen;
