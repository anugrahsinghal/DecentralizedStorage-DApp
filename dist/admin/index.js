import React, { Component } from "react";
import { Card, Button, Table, Form, Message } from "semantic-ui-react";
import DecentralizedStorage from "../../ethereum/DecentralizedStorage";
import Layout from "../../components/Layout";
import ShowVideos from "../../components/ShowVideos";
import { Link } from "../../routes";
import web3 from "../../ethereum/web3";
import ipfs from "../../ethereum/ipfs";

class Admin extends Component {
  state = {
    videos : [],
    userAddress: "",
    errorMessage: "",
    loading: false
  };

  static async getInitialProps() {  
    return {};  
  }

  showVideos() {
    console.log("Yooooo");
    
    return this.state.videos.map((video, index) => {
      return <ShowVideos key={index} index={index} video={video} />;
    });
  }

  onSubmit = async event => {
    //console.log(this.state);
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: ""
    });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Register From : ", accounts);

      await DecentralizedStorage.methods
        .registerAddress(this.state.userAddress)
        .send({
          from: accounts[0]
        });
      Router.pushRoute("/");
    } catch (error) {
      this.setState({
        errorMessage: error.message
      });
    }
    console.log("User Registered");

    this.setState({
      loading: false
    });
  };

   getFromData = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log("Admin Accounts : ", accounts);
    let VideosCount;
    try {
      VideosCount = await DecentralizedStorage.methods.getVideosCount().call({from: accounts[0] });
      console.log('Video Count : ',VideosCount);
    } catch (error) {
      console.log("Error From VideoCount",error);
    }

    let Videos = [];
    for (let i = 0; i < VideosCount; i++){      
      Videos.push(await DecentralizedStorage.methods.getVideoByIndex(i).call({from : accounts[0],gasPrice : 100000}));
    }
    console.log("Videos : ", Videos);
    this.setState({videos : Videos});
  }

  render() {
    return (
      <Layout>
        <div>
          <h2> Admin Panel </h2>
          <h3> Register New User </h3>{" "}
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-address"
                // label="Register User"
                placeholder="User's Address"
                value={this.state.userAddress}
                onChange={event =>
                  this.setState({
                    userAddress: event.target.value
                  })
                }
              />{" "}
            </Form.Group>{" "}
            <Message error header="Oops!!" content={this.state.errorMessage} />{" "}
            <Button loading={this.state.loading} primary>
              {" "}
              Register{" "}
            </Button>{" "}
          </Form>
          <h3> List Of All Videos On Blockchain </h3>{" "}
          <Link>
            <a><Button content='Get Transaction' color='green' onClick={this.getFromData} basic /></a>
          </Link>
          {this.state.videos.length == 0 ? null :
          (<Table celled singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell> No. </Table.HeaderCell>{" "}
                <Table.HeaderCell> Uploaded By </Table.HeaderCell>{" "}
                <Table.HeaderCell> Video Name </Table.HeaderCell>{" "}
                <Table.HeaderCell> Secure Hash </Table.HeaderCell>{" "}
                <Table.HeaderCell> Time Stamp </Table.HeaderCell>{" "}
              </Table.Row>{" "}
            </Table.Header>{" "}
            <Table.Body> {this.showVideos()} </Table.Body>{" "}
          </Table>)}
        </div>{" "}
      </Layout>
    );
  }
}

export default Admin;
