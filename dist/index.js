import React, { Component } from "react";
import { Card, Button, Table, Form, Message, TableRow, TableCell } from "semantic-ui-react";
// import DecentralizedStorage from "../../ethereum/DecentralizedStorage";
// import Layout from "../../components/Layout";
// import ShowVideos from "../../components/ShowVideos";
import { Link } from "../routes";
import Layout from "../components/Layout";
// import web3 from "../../ethereum/web3";
// import ipfs from "../../ethereum/ipfs";


{/* <div style="display: inline-block">
   Content in column A
</div>
<div style="display: inline-block">
   Content in column B
</div> */}
const divStyle = {
    display: 'inline-block'
  };
  const TableCellx = {
      width: '100%',
    //   border: '1px solid #dddddd'
  }
  const Cellx = {
      
    border: '1px solid black',
    // border-collapse: 'collapse'
  }

//   table {
//     border-collapse: collapse;
//     margin: 0 auto;
//   }
//   table td {
//     padding: 1rem;
//     border: 5px solid black; 
//   }
//   table tr:first-child td {
//     border-top: 0;
//   }
//   table tr:last-child td {
//     border-bottom: 0;
//   }
//   table tr td:first-child {
//     border-left: 0;
//   }
//   table tr td:last-child {
//     border-right: 0;
//   }
class Landing extends Component {
    render() {
        return (
            <Layout>
                <table style={TableCellx} margin='0 auto' >
                    <tr>
                        <th  border-collapse='collapse'><h2>Goto Admin Page</h2></th>
                        <th border-collapse='collapse'><h2>Goto User Page</h2></th>
                    </tr>
                    <tr>
                        <td align='center'  border-collapse='collapse'>
                            <Link><a><Button content='Goto Admin' color='google plus' href="admin"/></a></Link>
                        </td>
                        <td align='center' border-collapse='collapse'>
                            <Link><a><Button content='Goto User' color='blue' href="user"/></a></Link>
                        </td>
                    </tr>
                </table>
               
            </Layout>
        );
}
}
export default Landing;
