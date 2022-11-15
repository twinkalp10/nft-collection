import React, { useEffect, useState } from "react";
import { addressOfBAYC, alchemy } from "./alchemy";

const useNfWallet = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const getAllOwners = async () => {
    try {
      setLoading(true);
      const { owners } = await alchemy.nft.getOwnersForContract(addressOfBAYC, {
        withTokenBalances: true,
      });
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
  }, []);
  return { loading, data, error };
};

export default useNfWallet;
