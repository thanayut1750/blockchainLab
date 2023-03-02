import React from "react";
import Web3Service from "./web3.server";

class Approve extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      kmutnbToken: null,
      spender: "",
      amount: 0,
    };
  }

  async componentDidMount() {
    await Web3Service.loadWeb3();
    await Web3Service.loadBlockchainData();
    // console.log(Web3Service.state.kmutnbToken);
    this.setState({
      account: Web3Service.state.account,
      kmutnbToken: Web3Service.state.kmutnbToken,
    });
  }
  createApprove() {
    // console.log(this.state.address)
    this.state.kmutnbToken.methods
      .approve(this.state.spender, this.state.amount)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        console.log("BurnSusess", this.state.account, ":", this.state.amount);
        window.location.reload();
      });
  }
  render() {
    return (
      <>
        <form
          role="form"
          onSubmit={(event) => {
            event.preventDefault();
            this.createApprove(this.state);
          }}
        >
          <div className="card">
            <div className="card-header">
              <a
                className="card-link"
                data-toggle="collapse"
                href="#collapseOne"
              >
                1.Approve(address,uint256)
              </a>
            </div>
            <div
              id="collapseOne"
              className="collapse hide"
              data-parent="#accordion"
            >
              <div class="card-body">
                <div className="row">
                  <div className="col-sm-12 card-col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="spender (address)"
                      name="spender"
                      value={this.state.spender}
                      onChange={(event) => {
                        this.setState({ spender: event.target.value });
                      }}
                    />
                  </div>
                  <div className="col-sm-12 card-col">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="amount (uint256)"
                      name="amount"
                      value={this.state.amount}
                      onChange={(event) => {
                        this.setState({ amount: event.target.value });
                      }}
                    />
                  </div>
                  <div className="col-sm-12 card-col">
                    <input
                      type="submit"
                      value="Approve"
                      className="btn btn-success"
                    />
                    <p>
                      <h4>approve(address spender, uint tokens)</h4>{" "}
                      ใช้กันเงินให้อีก address
                      เหมือนกับทำแคชเชียร์เช็คโอนเงินให้ ได้ transaction log
                      กลับมา เพราะเป็นการบันทึกข้อมูลลง transaction เหมือนกับ
                      transfer()
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default Approve;
