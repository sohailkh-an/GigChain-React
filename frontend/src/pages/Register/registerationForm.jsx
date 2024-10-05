import React, { useState } from "react";
import axios from "redaxios";
import styles from "./styles/page.module.scss";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Web3 from "web3";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    userType: "",
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleUserTypeSelect = (type) => {
    setUserData({ ...userData, userType: type });
  };

  const handleLoginSuccess = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  const handleMetaMaskLogin = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/register-metamask`,
          { address, userType: userData.userType }
        );
        console.log(res.data);
        alert("Registration with MetaMask successful");
        handleLoginSuccess(res.data, res.token);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
        alert("Error connecting to MetaMask");
      }
    } else {
      alert("MetaMask is not installed");
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register-google`,
        { tokenId: response.credential, userType: userData.userType }
      );
      console.log(res.data);
      alert("Registration with Google successful, redirecting to home page");
      handleLoginSuccess(res.data, res.token);
    } catch (error) {
      console.error("Error registering with Google", error);
      alert("Error registering with Google");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        if (!isCodeSent) {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/send-verification`,
            { email: userData.email }
          );
          setIsCodeSent(true);
          alert(res.data.message);
        } else {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/register`,
            userData
          );
          console.log(res.data);
          alert("Registration successful");
          navigate("/login");
        }
      } catch (err) {
        console.error(err.response.data);
        alert(
          err.response.data.message ||
            "Error sending verification code (Error occurred in frontend)"
        );
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.userType_container}>
            <p>Register as a:</p>
            <button
              type="button"
              className={`${styles.userType_button} ${
                userData.userType === "client" ? styles.selected : ""
              }`}
              onClick={() => handleUserTypeSelect("client")}
            >
              Client
            </button>
            <button
              type="button"
              className={`${styles.userType_button} ${
                userData.userType === "freelancer" ? styles.selected : ""
              }`}
              onClick={() => handleUserTypeSelect("freelancer")}
            >
              Freelancer
            </button>
            <div className={styles.signIn_link_container}>
              <Link to="/signIn" className={styles.signIn_link}>
                Already a GigChain user? Sign In
              </Link>
            </div>
          </div>
        );

      case 2:
        return (
          <>
            <div>
              <button
                type="button"
                className={styles.button_secondary}
                onClick={handleMetaMaskLogin}
              >
                Register with MetaMask
              </button>
            </div>

            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <GoogleLogin
                buttonText="Register with Google"
                onSuccess={handleGoogleSuccess}
                onFailure={(error) =>
                  console.error("Google Sign-In Error", error)
                }
                cookiePolicy={"single_host_origin"}
              />
            </GoogleOAuthProvider>

            <div className={styles.or_container}>
              <div className={styles.line}></div>
              <div className={styles.or_text}>or</div>
              <div className={styles.line}></div>
            </div>

            <input
              className={styles.input}
              type="text"
              placeholder="First Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
          </>
        );

      case 3:
        return (
          <>
            <p>Please enter the verification code sent to your email:</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Verification Code"
              name="verificationCode"
              value={userData.verificationCode}
              onChange={handleChange}
            />
            {!isCodeSent && (
              <button
                type="button"
                onClick={handleSubmit}
                className={styles.button_secondary}
              >
                Send Verification Code
              </button>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className={styles.signUp_wrapper}>
        <div className={styles.parent_cont_right}>
          <div>
            <h1 className={styles.h1}>GigChain</h1>
            <p className={styles.p}>
              The first peer-to-peer freelance marketplace
            </p>
          </div>
        </div>

        <div className={styles.parent_cont_left}>
          <form
            onSubmit={handleSubmit}
            className={styles.main_content_container}
          >
            <h1 className={styles.h3}>GigChain</h1>

            <div>
              <h4 className={styles.welcome_text}>
                Hi, Start your GigChain Journey Now
              </h4>

              <h2 className={styles.h4}>Register - Step {step} of 3</h2>
            </div>
            <div className={styles.input_container}>{renderStep()}</div>
            <div className={styles.navigation_container}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className={styles.nav_button}
                >
                  <ArrowLeft size={20} /> Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={styles.nav_button}
                >
                  Next <ArrowRight size={20} />
                </button>
              ) : (
                <button type="submit" className={styles.button_primary}>
                  Sign Up
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
