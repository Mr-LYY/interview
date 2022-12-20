export const BASE_URL = "https://2add-212-175-114-43.eu.ngrok.io";
export const AUTHORIZATION_EVENT = "authorizationEvent";

export const dispatchIsAuthorizedEvent = (isAuthorized = false) => {
  document.dispatchEvent(
    new CustomEvent(AUTHORIZATION_EVENT, {
      detail: {
        isAuthorized,
      },
    })
  );
};

export const makeCustomFetch = (url, method = "GET", data) =>
  fetch(`${BASE_URL}/api/${url}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: new Headers({
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    }),
  });
