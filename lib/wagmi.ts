import { http, createConfig, injected } from "wagmi";
import { botchain } from "./botchain";

export const config = createConfig({
  chains: [botchain],
  connectors: [
    injected(),
  ],
  transports: {
    [botchain.id]: http("https://rpc.botchain.ai"),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
