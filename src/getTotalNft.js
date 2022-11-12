import React, { useEffect, useState } from "react";
import { addressOfBAYC, alchemy } from "./alchemy";
import useNfWallet from "./useNftWalletAddress";

const GetTotalNft = ({ address, nftDetails, setNftDetails }) => {
  const [loading, setLoading] = useState(true);

  const getTotalNft = async () => {
    try {
      const nfts = await alchemy.nft.getNftsForOwner(
        address,
        {
          contractAddresses: [addressOfBAYC],
        },
        { withMetadata: true }
      );
      setNftDetails(nfts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getTotalNft();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  return (
    <div>
      <p>
        {loading ? (
          <p>Loading</p>
        ) : (
          <div>
            <p>{nftDetails?.totalCount}</p>
          </div>
        )}
      </p>
    </div>
  );
};

export default GetTotalNft;
