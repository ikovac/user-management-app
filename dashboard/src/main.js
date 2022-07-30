import { createAuth0 } from "@auth0/auth0-vue";
import app from "./app";
import router from "./router";

import "./assets/main.css";

app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_API_IDENTIFIER,
    redirect_uri: window.location.origin,
  })
);

app.mount("#app");
