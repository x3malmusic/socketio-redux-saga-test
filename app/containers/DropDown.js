import { connect } from "react-redux";
import DropDown from "../components/DropDown";

const mapStateToProps = ({ stockTicker: { interval } }) => ({
  interval
})

export default connect(mapStateToProps, null)(DropDown)