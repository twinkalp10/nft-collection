import React, { useEffect, useState } from "react";
import { addressOfBAYC, alchemy } from "./alchemy";
import Axios from "axios";

const GetTotalNft = ({ address, nftDetails, setNftDetails }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("http://localhost:3001/read-address").then((response) => {
      console.log(response);
    });
  }, []);

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

  Axios.post("http://localhost:3001/insert-address", {
    Address: address,
    Count: nftDetails?.totalCount,
  });

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
