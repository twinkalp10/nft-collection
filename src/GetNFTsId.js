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

  return (
    <td colSpan={3}>
      <table className="border-collapse w-full font-sans text-xs">
        <tbody>
          <tr className="border-b">
            <th className="text-center p-2">NFT</th>
            <th className="text-center p-2"> Token ID</th>
            <th className="text-center p-2"> Date</th>
          </tr>
          <>
            {data?.ownedNfts.map((id) => {
              return <GetNFTmetadata address={address} tokenId={id.tokenId} />;
            })}
          </>
        </tbody>
      </table>
      {/* {data?.ownedNfts.map((id) => {
        return (
          <div className="m-3">
            <div className="flex gap-1 justify-around">
              <GetNFTmetadata address={address} tokenId={id.tokenId} />
            </div>
          </div>
        );
      })} */}
    </td>
  );
};

export default GetNFTsId;
