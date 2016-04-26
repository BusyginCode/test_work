export default class Navigation extends React.Component {

  render() {
    return (
      <div>
        {
          // check min step
          this.props.step > 1 ?
          <button className="btn btn-default" onClick={ this.props.changeStepMinus }>Prev. page</button> : null
        }
        {
          // check max step
          this.props.step < this.props.totalPages ?
            <button 
              className="btn btn-primary" 
              onClick={ this.props.changeStepPlus } 
              style={{ marginLeft: 10 }}
            >
              Next page
            </button>
          : null
        }
      </div>
    )
  }

}




