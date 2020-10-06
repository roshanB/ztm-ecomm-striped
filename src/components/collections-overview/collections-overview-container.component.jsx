import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsFetching } from "../../redux/shop/shop.selectors";

// Tried_moved_to_container_pattern_to_avoid_isLoading -
// note component returned by WithSpinner expects isLoading, hence below name should be same in mapStateToProps
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetching,
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
