import React, { useEffect, useState } from "react";
import { addressOfBAYC, alchemy } from "./alchemy";

const GetTotalNft = ({ address }) => {
  const [loading, setLoading] = useState(true);
  const [nftDetails, setNftDetails] = useState();

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
