import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview-container.component";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {
  convertCollectionSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionStartAsync,
  fetchCollectionStart,
  updateCollection,
} from "../../redux/shop/shop.actions";

import {
  selectIsCollectionsLoaded,
  selectIsFetching,
} from "../../redux/shop/shop.selectors";
import CollectionPageContainer from "../collection/collection-container.component";
import CollectionPage from "../collection/collection.component";

//Tried_WithSpinnerHOC
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  /*
    // Tried_moved_to_thunk_action
  state = {
    isLoading: true,
  };
  unsubscribeCollectionSnapshot = null;*/
  componentDidMount() {
    /*
    // Tried_moved_to_thunk_action
    const collectionRef = firestore.collection("collections");
    const { updateCollectionMap } = this.props;
    */
    // Tried_retriving_collection_using_onSnapshot
    /*
    // Tried_this_is_observable_observer_pattern
    this.unsubscribeCollectionSnapshot = collectionRef.onSnapshot(
      async (collectionSnapshot) => {
        const collectionMap = convertCollectionSnapshotToMap(
          collectionSnapshot
        );
        console.log("collectionSnapshot > array > map", collectionMap);
        //Tried_setting_shop_data_in_redux
        updateCollectionMap(collectionMap);
        // Tried_WithSpinnerHOC
        this.setState({ isLoading: false });
      }
    );*/
    /*
    // Tried_moved_to_thunk_action
    // Tried_this_is_promise_pattern
    collectionRef.get().then((collectionSnapshot) => {
      const collectionMap = convertCollectionSnapshotToMap(collectionSnapshot);
      console.log("collectionSnapshot > array > map", collectionMap);
      //Tried_setting_shop_data_in_redux
      updateCollectionMap(collectionMap);
      // Tried_WithSpinnerHOC
      this.setState({ isLoading: false });
    });*/

    //Tried_moved_to_thunk_action
    //Tried_move_to_saga
    // this.props.fetchCollectionStartAsync();
    this.props.fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        {/* Tried_WithSpinnerHOC
        <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
          // Tried_moved_to_container_pattern_to_avoid_isLoading
          // render={(props) => (
          //   <CollectionsOverviewWithSpinner
          //     isLoading={this.props.isLoading}
          //     {...props}
          //   />
          // )}
        />
        {/* Tried_WithSpinnerHOC
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        /> */}
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
          // Tried_moved_to_container_pattern_to_avoid_isLoading
          // render={(props) => (
          //   <CollectionPageWithSpinner
          //     {...props}
          //     isLoading={this.props.isCollectionsLoading}
          //   />
          // )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCollectionMap: (collection) => dispatch(updateCollection(collection)),
    //Tried_moved_to_thunk_action
    //Tried_move_to_saga
    // fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync()),
    fetchCollectionsStart: () => dispatch(fetchCollectionStart()),
  };
};

const mapStateToProps = createStructuredSelector({
  //Tried_moved_to_thunk_action
  isLoading: selectIsFetching,
  isCollectionsLoading: (state) => !selectIsCollectionsLoaded(state), //Tried_using_state_in_createStructuredSelector
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
