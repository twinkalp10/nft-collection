import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: "binQGA06sXO3tFLwYmiDD548J5vFk4f9",
  network: Network.ETH_MAINNET,
};
export const addressOfBAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

export const alchemy = new Alchemy(settings);
