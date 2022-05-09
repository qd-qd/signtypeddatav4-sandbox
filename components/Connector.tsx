import { useConnect } from "wagmi";
import { useMemo } from "react";
import Image from "next/image";
import type { Connector as WAGMIConnect } from "wagmi-core";
import useAccount from "../utils/useAccount";
import getHashPreview from "../utils/getHashPreview";

type ConnectorButtonProps = { connector?: WAGMIConnect; onClick: () => void };
const ConnectorButton = ({ connector, onClick }: ConnectorButtonProps) => {
  if (!connector) return null;

  return (
    <button onClick={onClick} style={{ padding: "0.75rem", fontSize: "12px" }}>
      <Image
        src={`/connectors/${connector.name}.svg`}
        alt={connector.name}
        width={24}
        height={24}
      />
    </button>
  );
};

const DisconnectButton = ({
  address,
  onClick,
}: {
  address: string;
  onClick: () => void;
}) => {
  const addressPreview = useMemo(() => getHashPreview(address), [address]);

  return (
    <button
      onClick={onClick}
      style={{ fontSize: "12px", maxWidth: "fit-content" }}
    >
      Disconnect <p style={{ fontWeight: 400 }}>({addressPreview})</p>
    </button>
  );
};

const Connector = () => {
  const [{ data }, connect] = useConnect();
  const [{ data: account }, disconnect, isConnected] = useAccount();

  // Render null if the connectors are loading
  if (!data.connectors.length) return null;

  // Connect the connector
  const handleClick = (connectorId: string) => {
    /* @ts-ignore */
    connect(data.connectors.find((connector) => connector.id === connectorId));
  };

  // Render the disconnect button if needed
  if (isConnected && account)
    return <DisconnectButton address={account.address} onClick={disconnect} />;

  // Render the list of connectors available
  return (
    <div style={{ display: "flex", columnGap: "6px" }}>
      {data.connectors.map((connector) => (
        <ConnectorButton
          key={connector.id}
          connector={connector}
          onClick={() => handleClick(connector.id)}
        />
      ))}
    </div>
  );
};

export default Connector;
