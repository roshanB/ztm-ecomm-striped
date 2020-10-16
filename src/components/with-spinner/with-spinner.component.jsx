import React from "react";
import Spinner from '../spinner/spinner.component';

//Tried_read_as -
//WithSpinner takes in component to render,
// returns another functional component
// (it is like any other component if seen the signature apart / separately)
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
