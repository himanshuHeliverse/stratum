import { useEffect } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import router from "next/router";

const API_URL = process.env.STRAPI_URL;

//register a new user
export const registerUser = (Firstname,LastName, email, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, { Firstname,LastName, email, password})
      .then((res) => {
        //set token response from Strapi for server validation
        Cookies.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
       reject(error); 
      });
  });
};

export const login = (identifier, password) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, { identifier, password })
      .then((res) => {
        //set token response from Strapi for server validation
        Cookies.set("token", res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
      })
      .catch((error) => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const forgotPassword = (identifier) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/forgot-password`, { email: identifier })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addOrder = (cart, user, address, city) => {
  let productIds = [];
  cart.map((value) => (productIds = [...productIds, value.id]));
  if (typeof window === "undefined") {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/orders`, {
        productIds,
        users_permissions_user: user?.id,
        address,
        city,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const loginSocial = (socialIdentifier) => {
  //prevent function from being ran on the server
  if (typeof window === "undefined") {
    return;
  }

  router.push(`${API_URL}/connect/${socialIdentifier}`);
};

export const logout = () => {
  //remove token and user cookie
  Cookies.remove("token");
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem("logout", Date.now());
  //redirect to the home page
  Router.push("/");
};

//Higher Order Component to wrap our pages and logout simultaneously logged in tabs
// THIS IS NOT USED in the tutorial, only provided if you wanted to implement
export const withAuthSync = (Component) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};
