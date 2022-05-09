import { Provider, allChains } from "wagmi";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";

const connectors = [
  new WalletConnectConnector({
    options: { qrcode: true },
    chains: allChains,
  }),
];

const WAGMIProvider = ({ children }: { children: JSX.Element }) => (
  <Provider autoConnect connectors={connectors}>
    {children}
  </Provider>
);

export default WAGMIProvider;
