import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import DecentralizedStorage from "../ethereum/DecentralizedStorage";
import web3 from "../ethereum/web3";
import { Link } from "../routes";

class ShowVideosUser extends Component {

    state = {
        loading : false
    }

    transfer = async () => {
        this.setState({loading : true});
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        console.log("video :", this.props.video);
        console.log("Index : ", this.props.index);

        this.setState({ loading : false});
    }

    render() {
        const { Row, Cell } = Table;
        const { index, video } = this.props;
        console.log("USERVIDEOSINDEXXXXXXXXXXXX",index,video);
        
        return (
            <Row>
                <Cell>{index+1}</Cell>
                {/* <Cell>{video[0]}</Cell> Uploaded By Box */}
                <Cell>{video[3]}</Cell>
                <Cell>{video[2]}</Cell>
                <Cell>{video[1]}</Cell>
            </Row >
        );
    }
}
export default ShowVideosUser;