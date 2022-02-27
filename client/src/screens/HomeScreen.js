import React from "react";
import Navbar from "../components/Navbar";
import "../css/HomeScreen.css";
import HomeScreenImage from "../assets/HomepageImage.jpg";
import ManufacturerImage from "../assets/Manufacturer.jpg";
import DistributorImage from "../assets/Distributer.png";
import DeliveryImage from "../assets/Delivery.jpg";
import VaccinationCenterImage from "../assets/center.jpg";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <div>
      <Navbar />
      <div className="homepage-container">
        <Grid container style={{}}>
          <Grid item xs={5}>
            <img src={HomeScreenImage} style={{ borderRadius: "25px" }}></img>
          </Grid>
          <Grid
            item
            xs={7}
            style={{ backgroundColor: "white", borderRadius: "25px" }}
          >
            <Grid spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <img
                          src={ManufacturerImage}
                          height={150}
                          width={150}
                        ></img>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/manufacturer"
                        >
                          Manufacturer
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <img
                          src={DistributorImage}
                          height={150}
                          width={180}
                        ></img>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/distributor"
                        >
                          Distributor
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <img src={DeliveryImage} height={150} width={150}></img>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/delivery"
                        >
                          Delivery
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <img
                          src={VaccinationCenterImage}
                          height={150}
                          width={150}
                        ></img>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to="/vaccinationCenter"
                        >
                          Vaccination Center
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
