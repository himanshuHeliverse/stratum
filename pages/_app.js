import { createGlobalStyle, ThemeProvider } from "styled-components";
import "nprogress/nprogress.css";
import "../components/reusableComponents/videoPlayer.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./globalFontLoader.css";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../components/context/appContext";
import React from "react";
import {
  deleteCartFromStrapi,
  getCartFromStrapi,
  saveCartToStrapi,
} from "../components/cartComponents/cartUtilities";
import ResetPasswordPopup from "../components/reusableComponents/resetPasswordPopup";

const TopProgressBar = dynamic(
  () => {
    return import("../components/reusableComponents/TopProgressBar");
  },
  { ssr: false }
);
const GlobalStyle = createGlobalStyle`
html{
  box-sizing: border-box;
  background: '#ffffff';
  display:block;
  height: 100%;
  width:100vw;
  margin:auto;
  padding: auto; 
  overflow-x: hidden;
  overflow-y: overlay;
}

body {
  width:100vw;
  overflow-x: hidden;
  overflow-y: overlay;
  min-height:100vh;
  padding: 0;
  margin:0;
}
`;

const theme = {
  colors: {
    primary: "#fafafa",
  },
};

const MyApp = ({ Component, pageProps }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  const [userToken, setUserToken] = React.useState(token);
  const [cartState, setCartState] = React.useState({ items: [], total: 0 });
  const [shippingTo, setShippingTo] = React.useState(0);
  const [triggerReauth, setTriggerReauth] = React.useState(false);
  const [resetPopupEnabled, setResetPopupEnabled] = React.useState(false);
  const [scrollToCollection, setScrollToCollection] = React.useState(false);
  const handleClick = (path) => {
    router.push(path);
  };
  const [privateCode, setPrivateCode] = React.useState("");

  React.useEffect(() => {
    if (
      (router?.query?.access_token !== null &&
        router?.query?.access_token !== undefined) ||
      (router?.query?.id_token !== null &&
        router?.query?.id_token !== undefined)
    ) {
      fetch(`${process.env.STRAPI_URL}${router.asPath}`, {
        method: "GET",
      }).then(async (res) => {
        if (!res.ok) {
          return null;
        } else {
          res.json().then((data) => {
            setUser(data?.user);
            Cookies.set("token", data.jwt);
            if (cartState?.items?.length === 0) {
              getCartFromStrapi(data?.user?.id, data?.jwt).then((res) => {
                let total = 0;
                res?.products?.map((value) => {
                  total += value.product.price * value.quantity;
                });

                const itemsToSet = {
                  items: res?.products?.map((value) =>
                    Object.assign({}, value.product, {
                      quantity: value.quantity,
                      size: value.size,
                      weight: value.weight,
                      finishProp: value.finishProp,
                      id: `${value?.product?.id}`,
                    })
                  ),
                  total,
                };
                setCartState(itemsToSet);
                handleClick("/");
                Cookies.set("cartState", JSON.stringify(itemsToSet.items));
              });
            }
          });
        }
      });
    } else if (
      router?.query?.code !== undefined &&
      router?.asPath.includes("?code")
    ) {
      setResetPopupEnabled(true);
      setPrivateCode(router?.query?.code);
    }
  }, [
    token,
    router?.query?.access_token,
    router?.query?.id_token,
    router.code,
    router.asPath,
    router?.query?.code,
    resetPopupEnabled,
  ]);

  React.useEffect(() => {
    ReAuthenticate();
  }, [triggerReauth]);

  const ReAuthenticate = async () => {
    // restore cart from cookie, this could also be tracked in a db
    const cart = Cookies.get("cartState");
    // authenticate the token on the server and place set user object
    const promise = fetch(`${process.env.STRAPI_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async (res) => {
      // if res comes back not valid, token is not valid
      // delete the token and log the user out on client
      if (!res.ok) {
        Cookies.remove("token");
        setUser(null);
        return null;
      }
      const user = await res.json();
      setUser(user);
      if (cartState?.items?.length === 0) {
        user?.id
          ? getCartFromStrapi(user?.id).then((res) => {
              let total = 0;
              res?.products?.map((value) => {
                total += value.product.price * value.quantity;
              });

              const itemsToSet = {
                items: res?.products?.map((value) =>
                  Object.assign({}, value.product, {
                    quantity: value.quantity,
                    id: `${value?.product?.id}`,
                    size: value.size,
                    weight: value.weight,
                    finishProp: value.finishProp,
                  })
                ),
                total,
              };
              setCartState(itemsToSet);
              Cookies.set("cartState", JSON.stringify(itemsToSet.items));
            })
          : null;
      } else {
        saveCartToStrapi(cartState?.items);
      }
    });
    return promise;
  };
  React.useEffect(() => {
    // grab token value from cookie

    // restore cart from cookie, this could also be tracked in a db
    const cart = Cookies.get("cartState");

    //if items in cart, set items and total from cookie
    if (typeof cart === "string" && cart !== "undefined") {
      JSON.parse(cart).forEach((item) => {
        setCartState({
          items: JSON.parse(cart),
          total: item.price * item.quantity,
          size: value.size,
          weight: value.weight,
          finishProp: value.finishProp,
        });
      });
    }
    if (token) {
      ReAuthenticate();
    }
  }, [token]);
  const emptyCart = () => {
    const itemsToSet = { items: [], total: 0 };
    setCartState(itemsToSet);
    Cookies.set("cartState", JSON.stringify(itemsToSet.items));
  };

  const addItem = (item) => {
    let { items } = cartState;
    const newItem = items.find((i) => i?.id === item?.id);
    if (!newItem) {
      let createdItem = item;
      createdItem.quantity = 1;
      createdItem.weight =
        createdItem?.productSpecifications?.SpecificationsField?.find(
          (value) => value?.Title === "Weight"
        )?.Value;
      createdItem.size =
        createdItem?.productSpecifications?.SpecificationsField?.find(
          (value) => value?.Title === "Size"
        )?.Value;
      createdItem.finishProp =
        createdItem?.productSpecifications?.SpecificationsField?.find(
          (value) => value?.Title === "Finish"
        )?.Value;
      const itemsToSet = {
        items: [...items, createdItem],
        total: cartState.total + item.price,
      };
      setCartState(itemsToSet);
      Cookies.set("cartState", JSON.stringify(itemsToSet.items));
      if (user !== null && cartState.items !== [])
        saveCartToStrapi(itemsToSet.items);
    } else {
      const itemsToSet = {
        items: cartState.items.map((item) =>
          item.id === newItem.id
            ? Object.assign({}, item, { quantity: item.quantity + 1 })
            : item
        ),
        total: cartState.total + item.price,
      };

      setCartState(itemsToSet);
      Cookies.set("cartState", JSON.stringify(itemsToSet.items));
      if (user !== null && cartState.items !== [])
        saveCartToStrapi(itemsToSet.items);
    }
  };

  const removeItem = (item, remove) => {
    let { items } = cartState;
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      if (remove !== true) {
        const itemsToSet = {
          items: cartState.items.map((item) =>
            item.id === newItem.id
              ? Object.assign({}, item, { quantity: item.quantity - 1 })
              : item
          ),
          total: cartState.total - item.price,
        };
        setCartState(itemsToSet);
        Cookies.set("cartState", JSON.stringify(itemsToSet.items));
        if (user !== null && cartState.items !== [])
          saveCartToStrapi(itemsToSet.items);
      } else {
        const items = [...cartState.items];
        const index = items.findIndex((i) => i.id === newItem.id);

        items.splice(index, 1);
        const itemsToSet = {
          items: items,
          total: cartState.total - item.price,
        };
        setCartState(itemsToSet);
        Cookies.set("cartState", JSON.stringify(itemsToSet.items));
        if (user !== null && cartState.items !== [])
          saveCartToStrapi(itemsToSet.items);
      }
    } else {
      const items = [...cartState.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      const itemsToSet = { items: items, total: cartState.total - item.price };
      setCartState(itemsToSet);
      Cookies.set("cartState", JSON.stringify(itemsToSet.items));
      if (user !== null && cartState.items !== [])
        saveCartToStrapi(itemsToSet.items);
    }
  };

  return (
    <>
      {resetPopupEnabled ? (
        <ResetPasswordPopup
          privateCode={privateCode}
          enabled={resetPopupEnabled}
          setEnabled={setResetPopupEnabled}
        />
      ) : null}
      <AppContext.Provider
        value={{
          user: user,
          userToken: userToken,
          isAuthenticated: !!user,
          setUser: setUser,
          cart: cartState,
          addItem: addItem,
          removeItem: removeItem,
          emptyCart: emptyCart,
          shippingTo: shippingTo,
          setShippingTo: setShippingTo,
          scrollToCollection: scrollToCollection,
          setScrollToCollection: setScrollToCollection,
        }}
      >
        <TopProgressBar />
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
};

export default MyApp;
