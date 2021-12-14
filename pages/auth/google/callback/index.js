import React from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import AppContext from "../../../../components/context/appContext";

const AuthCallback = () => {
  const appContext = React.useContext(AppContext);
  const [authToken, setAuthToken] = React.useState(null);
  const router = useRouter();
  const handleClick = (path) => {
    router.push(path);
  };
  React.useEffect(() => {
    if (router?.query?.id_token !== null) {
      setAuthToken(router?.query?.id_token);
      fetch(`${process.env.STRAPI_URL}${router.asPath}`, {
        method: "GET",
      }).then(async (res) => {
        if (!res.ok) {
          Cookies.remove("token");
          appContext?.setUser(null);
          handleClick("/");

          return null;
        } else {
          res.json().then((data) => {
            // appContext?.setUser(data);
            Cookies.set("token", data.jwt);
            handleClick("/");
          });
        }
      });
    }
  }, []);

  return <div>redirecting</div>;
};

export default AuthCallback;

///auth/google/callback/?id_token=${router?.query?.id_token}&access_token=${router?.query?.["raw[access_token]"]}&raw[access_token]=${router?.query?.["raw[access_token]"]}&raw[expires_in]=${router?.query?.["raw[expires_in]"]}&raw[id_token]=${router?.query?.["raw[id_token]"]}&raw[scope]=${router?.query?.["raw[scope]"]}&raw[token_type]=${router?.query?.["raw[token_type]"]}
