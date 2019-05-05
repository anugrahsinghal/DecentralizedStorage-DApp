import React, { Component } from "react";
import { Card, Button, Table, Form, Message } from "semantic-ui-react";
import DecentralizedStorage from "../../ethereum/DecentralizedStorage";
import Layout from "../../components/Layout";
import ShowVideos from "../../components/ShowVideos";
import { Link } from "../../routes";
import ipfs from "../../ethereum/ipfs"
import web3 from "../../ethereum/web3";
import ShowVideosUser from "../../components/ShowVideosUser";

class User extends Component {
  state = {
    videos : [],
    videoName: "",
    defaultVidName: "",
    inputHash: "",
    errorMessage: "",
    loading: false
  };
  static async getInitialProps() {  
    return {
    };
  }

  showVideos() {
    return this.state.videos.map((video, index) => {
      return <ShowVideosUser key={index} index={index} video={video} />;
    });
  }

  onSubmit = async event => {
    // console.log("State Variables before ADDING AND ERROERRRRRRRRRRRRRR",this.state);
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: ""
    });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log("Your Account : ", accounts);

      await DecentralizedStorage.methods
        .addVideo(this.state.videoName,this.state.inputHash)
        .send({
          from: accounts[0]
        });
    } catch (error) {
      this.setState({
        errorMessage: error.message
      });
    }
    console.log("Video Added.");

    this.setState({
      loading: false
    });
  };

  getFormData = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts ", accounts);

    let VideosIndexes;
    try {
        VideosIndexes = await DecentralizedStorage.methods.getUserVideoIndexes().call({from : accounts[0]});
        console.log("Video Indexes : ",VideosIndexes);
        
    } catch (error) {
        console.log(error);
    }

    let Videos = [];
    for (let i = 0; i < VideosIndexes.length; i++){
      Videos.push(await DecentralizedStorage.methods.getVideoByIndex(VideosIndexes[i]).call({from : accounts[0],gasPrice : 100000}));
    }
    console.log("Videos : ", Videos);
    this.setState({videos : Videos});
  }

  render() {
    return (
      <Layout>
        <div>
          <h2> User Panel </h2>
          <h3> Add Secure Hash Of Video </h3>{" "}
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Group widths="equal" controlId="secureHash">
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-input-address"
                label="Input for Hash"
                placeholder="Enter Hash..."
                value={this.state.userAddress}
                onChange={event =>
                  this.setState({
                    inputHash: "0x".concat(event.target.value)
                  })
                }
              />{" "}
            </Form.Group>{" "}
            <h3>Add Video Name</h3>{" "}
            <Form.Group widths="equal" controlId="videoName">
              <Form.Input
                fluid
                id="form-subcomponent-shorthand-video-name"
                label="Input Video Name"
                placeholder="Video Name..."
                value={this.state.userAddress}
                onChange={event =>
                  this.setState({
                    videoName: event.target.value
                  })
                }
              />{" "}
            </Form.Group>{" "}
            <Message error header="Oops!!" content={this.state.errorMessage} />{" "}
            <Button loading={this.state.loading} primary>
              {" "}
              Add Video{" "}
            </Button>{" "}
          </Form>
          <h3> List Of All Your Videos On Blockchain </h3>{" "}
          <Link>
            <a><Button content='Get Transaction' color='green' onClick={this.getFormData} basic /></a>
          </Link>
          {this.state.videos.length == 0 ? null :
          (<Table celled singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell> No. </Table.HeaderCell>{" "}
                {/* <Table.HeaderCell> Uploaded By </Table.HeaderCell>{" "} */}
                <Table.HeaderCell> Videos Name </Table.HeaderCell>{" "}
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

export default User;
