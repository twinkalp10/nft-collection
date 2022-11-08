import React, { useEffect, useState } from "react";
import { addressOfBAYC, alchemy } from "./alchemy";

const useNfWallet = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const getAllOwners = async () => {
    try {
      setLoading(true);
      const { owners } = await alchemy.nft.getOwnersForContract(addressOfBAYC);
      setData(owners);
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
