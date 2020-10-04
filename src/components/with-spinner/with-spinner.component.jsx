import React from "react";
import "./with-spinner.styles.scss";

//Tried_read_as -
//WithSpinner takes in component to render,
// returns another functional component
// (it is like any other component if seen the signature apart / separately)
const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <div className="spinner-overlay">
      <div className="spinner-container"></div>
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
