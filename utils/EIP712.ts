export const domain = {
  name: "Ledger test",
  version: "1",
  verifyingContract: "0xa8ad7a9250115ef71d4e437f7b14124142a0c906",
  chainId: 56,
};

export const types = {
  burn: [
    { name: "owner", type: "address" },
    { name: "tokenId", type: "uint256" },
  ],
};
