import React, { useEffect, useState } from "react";
import { addressOfBAYC, addresofCRYPTOPUNKS, alchemy } from "./alchemy";
import useNFTcontractAddress from "./useNFTcontractAddress";

const useNfWallet = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const { ContractAddressOfNft, callBAYC, callCryptoPunks } =
    useNFTcontractAddress();

  const getAllOwners = async () => {
    try {
      setLoading(true);
      const { owners } = await alchemy.nft.getOwnersForContract(
        ContractAddressOfNft,
        {
          withTokenBalances: true,
        }
      );
      const unSortedWalletAddress = owners.map((wallet) => {
        let count = 0;
        for (let i = 0; i < wallet.tokenBalances.length; i++) {
          count = count + wallet.tokenBalances[i].balance;
        }
        return {
          address: wallet.ownerAddress,
          count: count,
        };
      });
      const sortedAddresses = unSortedWalletAddress.sort(
        (a, b) => b.count - a.count
      );
      setData(sortedAddresses);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  useEffect(() => {
    getAllOwners();
  }, [ContractAddressOfNft]);
  return {
    loading,
    data,
    error,
    ContractAddressOfNft,
    callBAYC,
    callCryptoPunks,
  };
};

export default useNfWallet;
