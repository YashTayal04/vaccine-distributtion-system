import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Navbar from "../components/Navbar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// export default
function AdminPanelScreen(props) {
  const accounts = props.accounts;
  const supplyChainContract = props.supplyChainContract;

  const [address, setAddress] = React.useState("");
  const [role, setRole] = React.useState("1");
  const handleAddRole = async () => {
    handleClick();
    console.log(address, role);
    if (role == "1") {
      await supplyChainContract.methods
        .addManufacturerRole(address)
        .send({ from: accounts[0], gas: 100000 })
        .then(console.log);
    } else if (role == "2") {
      await supplyChainContract.methods
        .addDistributorRole(address)
        .send({ from: accounts[0], gas: 100000 })
        .then(console.log);
    } else if (role == "3") {
      await supplyChainContract.methods
        .addDeliveryHubRole(address)
        .send({ from: accounts[0], gas: 100000 })
        .then(console.log);
    } else {
      await supplyChainContract.methods
        .addVaccinationCenterRole(address)
        .send({ from: accounts[0], gas: 100000 })
        .then(console.log);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // -------// -------
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };
  // -------// -------

  return (
    <div>
      <Navbar />
      <h3>Add New Member to the Blockchain</h3>
      <div className="homepage-container">
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="address"
              label="Enter Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: "500px" }}
            />
          </div>
        </form>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">Role</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={role}
            label="Role"
            onChange={handleChange}
          >
            {/* <MenuItem value={0}>
              <em>None</em>
            </MenuItem> */}
            <MenuItem value={1}>Manufacturer</MenuItem>
            <MenuItem value={2}>Distributor</MenuItem>
            <MenuItem value={3}>Delivery</MenuItem>
            <MenuItem value={4}>Vaccination Center</MenuItem>
          </Select>
        </FormControl>

        {/* <Stack spacing={2} sx={{ width: "100%" }}> */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddRole}
          style={{ width: "20%", marginLeft: "10px" }}
        >
          Add Member
        </Button>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClick}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="success"
            sx={{ width: "100%" }}
          >
            Member Added Successfully!
          </Alert>
        </Snackbar>
        {/* </Stack> */}
      </div>
    </div>
  );
}
export default AdminPanelScreen;
