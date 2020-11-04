import { connect } from "react-redux";
import App from "../components/App";
import { changeInterval } from "../actions/actions";


const mapStateToProps = ({ stockTicker: { ticker, prevTicker } }) => ({
  ticker,
  prevTicker
})

const mapDispatchToProps = (dispatch) => ({
  changeInterval: (interval) => dispatch(changeInterval(interval))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)