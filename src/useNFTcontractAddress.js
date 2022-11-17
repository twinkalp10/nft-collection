import { useState } from "react";
import { addressOfBAYC, addresofCRYPTOPUNKS } from "./alchemy";

const useNFTcontractAddress = () => {
  const [ContractAddressOfNft, setContractAddressOfNft] =
    useState(addressOfBAYC);

  const callBAYC = () => {
    setContractAddressOfNft(addressOfBAYC);
  };

  const callCryptoPunks = () => {
    setContractAddressOfNft(addresofCRYPTOPUNKS);
  };

  return { ContractAddressOfNft, callBAYC, callCryptoPunks };
};

export default useNFTcontractAddress;
