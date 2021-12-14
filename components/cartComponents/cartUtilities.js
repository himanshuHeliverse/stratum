import Cookies from "js-cookie";

export const saveCartToStrapi = async (products) => {
  let productIds = [];
  products?.map(
    (value) =>
      (productIds = [
        ...productIds,
        {
          product: value.id,
          quantity: value.quantity,
          size: value.size,
          finishProp: value.finishProp,
          weight: value.weight,
        },
      ])
  );
  const userToken = Cookies.get("token");

  const response = await fetch(`${process.env.STRAPI_URL}/carts`, {
    method: "POST",
    headers: userToken && { Authorization: `Bearer ${userToken}` },
    body: JSON.stringify({
      products: productIds,
    }),
  });
  return response;
};

export const deleteCartFromStrapi = async (user) => {
  const userToken = Cookies.get("token");
  const response = await fetch(`${process.env.STRAPI_URL}/carts/${user}`, {
    method: "DELETE",
    headers: userToken && { Authorization: `Bearer ${userToken}` },
  });
  return response;
};

export const getCartFromStrapi = async (user, token) => {
  const userToken = token ? token : Cookies.get("token");
  const response = await fetch(`${process.env.STRAPI_URL}/carts/${user}`, {
    method: "GET",
    headers: userToken && { Authorization: `Bearer ${userToken}` },
  });
  return response.json();
};
