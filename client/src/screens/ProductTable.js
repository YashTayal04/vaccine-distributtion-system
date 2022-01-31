import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import "../css/Distributorscreen.css";
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
        textAlign: 'left',
        flexGrow: 1,
    },
}));

export function ProductTable(props) {
    console.log(props.data[0]);

    return (
        <div className="Distributor">
            <table>
                <tr>
                    <th>Product ID </th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Product Category </th>
                    <th>Manufacture</th>

                </tr>
                {/* adding data using loop */}
                {
                    props.data.map((s) => {
                        return <tr>
                            <td>{s[0]}</td>
                            <td>{s[1]}</td>
                            <td>{s[2]}</td>
                            <td>{s[3]}</td>
                            <td>{s[4]}</td>

                        </tr>
                    })
                }

            </table>
        </div>
    );
}

