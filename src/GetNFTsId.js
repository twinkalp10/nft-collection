import React, { useState } from "react";
import { addressOfBAYC, alchemy } from "./alchemy";
import GetNFTmetadata from "./GetNFTmetadata";

const GetNFTsId = ({ address }) => {
  const [data, setData] = useState();

  const getTotalNft = async () => {
    try {
      const nfts = await alchemy.nft.getNftsForOwner(
        address,
        {
          contractAddresses: [addressOfBAYC],
        },
        { withMetadata: true }
      );
      setData(nfts);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTotalNft();
  }, []);

  console.log(data?.ownedNfts);
  return (
    <td colSpan={3}>
      {data?.ownedNfts.map((id) => {
        return (
          <div className="m-3">
            <div className="flex gap-1 justify-around">
              <GetNFTmetadata address={address} tokenId={id.tokenId} />
              <div>Token ID: {id.tokenId}</div>
            </div>
          </div>
        );
      })}
    </td>
  );
};

export default GetNFTsId;
