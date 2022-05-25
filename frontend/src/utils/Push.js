import axios from "axios";

const API_URL = "/api/services/";

const publicVapidKey =
  "BOBhH6roGSouSD7BV45soxqrcnIVdGm5CfJ-M2ahMlXpOXX88P3YIce3SwGTvhdNYRW8bbPhcCDFqS0_3H7D03E";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  /* eslint-disable no-useless-escape */
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export const send = async (title, message) => {
  // Register service worker
  console.log("Registering service worker...");
  await navigator.serviceWorker.register("/worker.js", {
    // const register =
    scope: "/",
  });
  console.log("Service Worker Registered...");

  // Register push
  console.log("Registering Push...");
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration) {
        return;
      }

      // do we already have a push message subscription
      registration.pushManager
        .getSubscription()
        .then(function (existedSubscription) {
          if (existedSubscription === null) {
            // create new subscription
            registration.pushManager
              .subscribe({
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                userVisibleOnly: true,
              })
              .then(function (newSubscription) {
                sendSubscription(newSubscription, title, message);
              })
              .catch(function (e) {
                if (Notification.permission !== "granted") {
                } else {
                  console.error(e);
                }
              });
          } else {
            sendSubscription(existedSubscription, title, message);
          }
        })
        .catch(function (e) {
          console.error(e);
        });
    });
  }
};

const sendSubscription = async (subscription, title, message) => {
  return axios.post(
    API_URL + "subscribe",
    JSON.stringify({ subscription, title, message }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  // fetch("http://localhost:3001/api/services/subscribe", {
  //   method: "POST",
  //   body: JSON.stringify({ subscription, title, message }),
  //   headers: {
  //     "content-type": "application/json",
  //   },
  // });
};
