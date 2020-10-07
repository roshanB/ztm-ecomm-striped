import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

import "./sign-in.styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignIn = ({ signInWithEmailAndPassword, signInWithGoogle }) => {
  const [emailAndPassword, setEmailAndPassword] = useState({
    email: "",
    password: "",
  });
  const { email, password } = emailAndPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Tried_sign_in_using_saga
      // await auth.signInWithEmailAndPassword(email, password);
      signInWithEmailAndPassword({ email, password });
      setEmailAndPassword({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setEmailAndPassword({ ...emailAndPassword, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton
            type="button" // Tried_set_type_button_else_it_will_trigger_submit_unfortunate_nature_of_form
            onClick={signInWithGoogle}
            isGoogleSignIn
          >
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signInWithGoogle: () => dispatch(googleSignInStart()),
    signInWithEmailAndPassword: (emailAndPassword) =>
      dispatch(emailSignInStart(emailAndPassword)),
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
