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
import { BuyProductByDistributor } from "./BuyProductByDistributor";
import { ReceiveProductByDistributor } from "./ReceiveProductByDistributor";
import { ShipProductByDistributor } from "./ShipProductByDistributor";

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

export default function CustomerScreen(props) {
  const classes = useStyles();
  var [state, setCurState] = React.useState(0);
  var [count, setCount] = React.useState(0);
  var [buyTableData, setBuyTableData] = React.useState([]);
  var [receiveTableData, setReceiveTableData] = React.useState([]);
  var [shipTableData, setShipTableData] = React.useState([]);

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
      const buyArr = []; // 0
      const receiveArr = []; // 2
      const shipArr = []; // 4

      for (var i = 1; i < count; i++) {
        const prodState = await supplyChainContract.methods
          .fetchProductState(i)
          .call({ from: accounts[0], gas: 100000 });
        // console.log(prodState);

        if (prodState == "0") {
          const a = await supplyChainContract.methods
            .fetchProduct(i)
            .call({ from: accounts[0], gas: 100000 });
          buyArr.push(a);
        } else if (prodState == "2") {
          const a = await supplyChainContract.methods
            .fetchProduct(i)
            .call({ from: accounts[0], gas: 100000 });
          receiveArr.push(a);
        } else if (prodState == "4") {
          const a = await supplyChainContract.methods
            .fetchProduct(i)
            .call({ from: accounts[0], gas: 100000 });
          shipArr.push(a);
        }
      }

      setBuyTableData(buyArr);
      setReceiveTableData(receiveArr);
      setShipTableData(shipArr);
    })();
  }, [count]);

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Distributor
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
              Buy Product
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
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setCurState(2);
              }}
            >
              Ship Product
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
              <BuyProductByDistributor
                data={buyTableData}
                accounts={accounts}
                supplyChainContract={supplyChainContract}
              />
            </Grid>
          ) : null}
          {state == 1 ? (
            <Grid item xs={12}>
              <ReceiveProductByDistributor
                data={receiveTableData}
                accounts={accounts}
                supplyChainContract={supplyChainContract}
              />
            </Grid>
          ) : null}
          {state == 2 ? (
            <Grid item xs={12}>
              <ShipProductByDistributor
                data={shipTableData}
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
// import { BuyProduct } from './BuyProduct';
// import { Grid } from "@material-ui/core";
// const date=new Date();
// const d = date.getFullYear();

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
//                         Distributer
//                     </Button>
//                     <Button variant="contained" color="primary" component={Link} to="/">
//                         Purchase Product
//                     </Button>
//                     <Button variant="contained" color="primary" component={Link} to="/">
//                         Receive Product
//                     </Button>
//                     <Button variant="contained" color="primary" component={Link} to="/">
//                         Your  Product
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//         </div>
//     )
// }
// function Buy(){
//     return (
//         <Button variant="contained" color="primary"
//             // component={Link} to="/distributor/buy"
//         >
//         Buy
//         </Button>
//     )
// }
// function DistributionTable(props) {
//     const classes = useStyles();
// 	// var [state, setCurState] = React.useState(0);
// 	var [tableData, setTableData] = React.useState([]);
// 	const accounts = props.accounts;
// 	const supplyChainContract = props.supplyChainContract;
// 	React.useEffect(() => {
// 		supplyChainContract.methods
// 			.fetchProduct(1)
// 			.call({ from: accounts[0], gas: 100000 })
// 			.then((response) => {
// 				var temp = [];
// 				temp.push(response);
// 				setTableData(temp);
// 				console.log(temp);
// 			});
// 	}, []);
//     return (
//         		<div>
// 			<div className={classes.root}>
// 				{/* <AppBar position="static">
// 					<Toolbar>
// 						<Typography variant="h6" className={classes.title}>
// 							Manufacturer
// 						</Typography>
// 						<Button
// 							variant="contained"
// 							color="secondary"
// 							onClick={() => {
// 								setCurState(0);
// 							}}
// 						>
// 							Add Product
// 						</Button>
// 						&nbsp; &nbsp;
// 						<Button
// 							variant="contained"
// 							color="secondary"
// 							onClick={() => {
// 								setCurState(1);
// 							}}
// 						>
// 							Ship Product
// 						</Button>
// 						&nbsp; &nbsp;
// 						<Button
// 							variant="contained"
// 							color="secondary"
// 							onClick={() => {
// 								setCurState(2);
// 							}}
// 						>
// 							All Product
// 						</Button>
// 						&nbsp; &nbsp;
// 						<Button
// 							variant="contained"
// 							color="secondary"
// 							component={Link}
// 							to="/home"
// 						>
// 							Home
// 						</Button>
// 					</Toolbar>
// 				</AppBar> */}
// 			</div>
// 			<div className="form-container">
// 				{/* <Button variant="contained" color="primary" onClick={() => { setProductForm(true) }}>
//             Add Product
//         </Button> */}
// 				<Grid container spacing={2}>
// 					{/* {state == 0 ? (
// 						<Grid item xs={12}>
// 							<AddProductForm
// 								accounts={accounts}
// 								supplyChainContract={supplyChainContract}
// 							/>
// 						</Grid>
// 					) : null}
// 					{state == 1 ? ( */}
// 						<Grid item xs={12}>
// 							<BuyProduct data={tableData} />
// 						</Grid>
// 					{/* ) : null}
// 					{state == 2 ? (
// 						<Grid item xs={12}>
// 							<ProductTable data={tableData} />
// 						</Grid>
// 					) : null} */}
// 				</Grid>
// 			</div>
// 		</div>
//     );
//   }

//   //  contain array of object that need to be show on table
//    const data=[{Universal_ID:"Universal ID"
//     ,Product_Code:"Product_Code",
//     Manufacture:"Manufacture",
//     Manufacture_Date:"Date",
//     Product_Name:"Product Name",
//     Owner:"Owner",
//     Buy:true}];

// function CustomerScreen(){
//     return (<div><Navbar /><h1>Purchase Product </h1><DistributionTable data={data} /><footer>Copyright @vaccine distributtion {d}</footer></div>)
// }
// export default CustomerScreen;
