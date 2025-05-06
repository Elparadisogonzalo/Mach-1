const config = {
  domainName: "elparadisogonzalo.com", // or elparadisogonzalo.x
  unstoppable: {
    clientId: "YOUR_CLIENT_ID_HERE", // Replace with actual if using OAuth
    redirectUri: "http://elparadisogonzalo.com/callback", // Or your own
    scope: "openid wallet",
    responseType: "token", // or "code" for OAuth2 flow
  },
  network: {
    name: "mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Optional
  }
};
