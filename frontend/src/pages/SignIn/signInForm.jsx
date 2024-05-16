import React, { useState } from "react";
import { Web3 } from "web3";
import styles from "./styles/page.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";

export default function SignInPage() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [connectedAccount, setConnectedAccount] = useState("");

  async function connectMetamask() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      setConnectedAccount(accounts[0]);
    } else {
      alert("Please download metamask");
    }
  }

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('${import.meta.env.VITE_API_URL}/api/users/signin', userData);
    const { token, user } = res.data;
    login({ token, user });
    console.log(res.data);
    localStorage.setItem('token', token);
    navigate('/');
  } catch (err) {
    console.error(err.response.data);
    alert('Error signing in');
  }
};


  return (
    <React.Fragment>
      <div className={styles.signIn_wrapper}>
        <div className={styles.parent_cont_left}>
          <form
            onSubmit={handleSubmit}
            className={styles.main_content_container}
          >
            <h1 className={styles.h3}>GigChain</h1>

            <div>
              <h4 className={styles.h4}>Login Now</h4>
            </div>

            <div className={styles.input_container}>
              <input
                className={styles.input}
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>

            <div className={styles.misc_fields}>
              <label className={styles.custom_checkbox} htmlFor="rememberMe">
                <input type="checkbox" id="rememberMe" />
                <span className={styles.checkbox_label}>Remember Me</span>
              </label>

              <a className={styles.forgetPassLink} href="/forgetPassword">
                Forgot password?
              </a>
            </div>

            <div>
              <button type="submit" className={styles.button_primary}>
                Login
              </button>
            </div>

            <div className={styles.or_container}>
              <div className={styles.line}></div>
              <div className={styles.or_text}>or</div>
              <div className={styles.line}></div>
            </div>

            <div>
              <button onClick={connectMetamask} disabled={!!connectedAccount}>
                {connectedAccount
                  ? "Wallet Connected:" + connectedAccount
                  : "Login with MetaMask"}
              </button>
            </div>

            <div className={styles.register_link_container}>
              <Link to="/register">Dont have a GigChain profile? Register</Link>
            </div>
          </form>
        </div>
        <div className={styles.parent_cont_right}>
          <div>
            <h1 className={styles.h1}>GigChain</h1>
            <p className={styles.p}>
              The first peer-to-peer freelance marketplace
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
