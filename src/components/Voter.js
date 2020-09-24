import React, { Component } from "react";
import { increaseVotes } from "../api";

export default class Voter extends Component {
  state = {
    upVoterDisabled: false,
    downVoterDisabled: false,
    voteNum: null,
    votingError: null,
  };

  render() {
    const { voteNum } = this.state;
    return (
      <div>
        <h5 className="votes">Votes: {voteNum}</h5>
        <h5>
          Vote for this {this.props.item}?{" "}
          <button
            disabled={this.state.upVoterDisabled}
            onClick={() => {
              if (
                !this.state.upVoterDisabled &&
                !this.state.downVoterDisabled
              ) {
                this.setState({ upVoterDisabled: true });
              } else {
                this.setState({
                  downVoterDisabled: false,
                });
              }

              this.updateVotes(this.props.id, this.props.section, 1);
            }}
          >
            Up
          </button>
          <button
            disabled={this.state.downVoterDisabled}
            onClick={() => {
              if (
                !this.state.upVoterDisabled &&
                !this.state.downVoterDisabled
              ) {
                this.setState({
                  downVoterDisabled: true,
                });
              } else {
                this.setState({
                  upVoterDisabled: false,
                });
              }

              this.updateVotes(this.props.id, this.props.section, -1);
            }}
          >
            Down
          </button>
        </h5>
      </div>
    );
  }
  componentDidMount = () => {
    this.setState({ voteNum: this.props.voteNum });
  };

  updateVotes = (id, section, amount) => {
    increaseVotes(id, section, amount).catch((err) => {
      this.setState({ votingError: err });
      this.setState((prevState) => {
        prevState.voteNum -= amount;
        return { voteNum: prevState.voteNum };
      });
    });

    this.setState((prevState) => {
      prevState.voteNum += amount;
      return { voteNum: prevState.voteNum };
    });
  };
}
