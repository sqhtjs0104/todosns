import React, { memo, useState } from "react";
import authService from "fbase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const Auth = memo(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] =  useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {target: {name, value}} = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {target: { name }} = event;
    let provider;
    try {
      switch (name) {
        case "google": provider = new GoogleAuthProvider(); break;
        case "facebook": provider = new FacebookAuthProvider(); break;
        case "github": provider = new GithubAuthProvider(); break;
        default: break;
      }
      const data = await signInWithPopup(authService, provider);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={onChange} 
            required
          />
          <input
            type="submit"
            value={newAccount ? "Create Account" : "Sign in"}
          />
          {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <div>
          <button name="google" onClick={onSocialClick}>Continue with Google</button>
          {/* <button name="facebook" onClick={onSocialClick}>Continue with Facebook</button> */}
          <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
      </div>
    </>
  )
});

export default Auth;