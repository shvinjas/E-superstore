import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { auth, fireDB } from "../../firebase/FireBaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  /**========================================================================
   * signup function
   *========================================================================**/

  const userSignupFunction = async () => {
    //validation
    if (
      userSignup.name === "" ||
      (userSignup.email === "") | (userSignup.password === "")
    ) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );
      // create user object

      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
      
      // create user Reference
      const userReference = collection(fireDB, "user");

      // Add User Detail
      addDoc(userReference, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      toast.success("Signup Successfull");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.code.split("/")[1]);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Loader component */}
      {loading && <Loader />}

      {/* Signup Form  */}
      <div className="signup_Form bg-pink-50 px-1 lg:px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Signup
          </h2>
        </div>

        {/* Input One  */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            value={userSignup.name}
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Input Two  */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            value={userSignup.email}
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Input Three  */}
        <div className="mb-5">
          <input
            type="password"
            value={userSignup.password}
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
            placeholder="Password"
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Signup Button  */}
        <div className="mb-5">
          <button
            onClick={userSignupFunction}
            type="button"
            className="bg-red-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
          >
            Signup
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/login"}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
