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
