import type { NextPage } from "next";
import { useState } from "react";
import useAccount from "../utils/useAccount";
import Connector from "../components/Connector";
import { useSignTypedData } from "wagmi";
import { domain, types } from "../utils/EIP712";

const Home: NextPage = () => {
  const [{ data: account }, , isConnected] = useAccount();
  const [, signTypedData] = useSignTypedData();
  const [error, setError] = useState<Error | null>(null);
  const [isGood, setIsGood] = useState<boolean>(false);
  const [sign, setSignature] = useState<string | null>(null);

  const handleClick = async () => {
    const value = { owner: account?.address, tokenId: 4 };

    try {
      const signature = await signTypedData({ domain, types, value });
      if (signature.error) throw signature.error;
      setSignature(signature.data);
      setIsGood(true);
    } catch (e) {
      console.error(e);
      /* @ts-ignore */
      setError(e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "12px",
        alignContent: "flex-start",
      }}
    >
      <Connector />
      <button
        disabled={!isConnected}
        onClick={handleClick}
        style={{ maxWidth: "fit-content" }}
      >
        signer
      </button>
      {error && (
        <p style={{ fontSize: "18px", color: "red", fontWeight: "600" }}>
          {error.message}
        </p>
      )}
      {isGood && (
        <div>
          <p style={{ fontSize: "18px", color: "green", fontWeight: "600" }}>
            Message signé correctement ! signTypedData_v4 supporté{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://docs.metamask.io/guide/signing-data.html"
            >
              (doc)
            </a>
          </p>
          <p>hash: {sign}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
