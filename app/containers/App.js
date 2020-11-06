import { connect } from "react-redux";
import App from "../components/App";
import { changeInterval, socketConnect } from "../actions/actions";


const mapStateToProps = ({ stockTicker: { ticker, prevTicker } }) => ({
  ticker,
  prevTicker
})

const mapDispatchToProps = (dispatch) => ({
  changeInterval: (interval) => dispatch(changeInterval(interval)),
  socketConnect: () => dispatch(socketConnect())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)