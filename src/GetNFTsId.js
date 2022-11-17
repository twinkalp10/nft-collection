import React, { useState } from "react";
import { addressOfBAYC, alchemy } from "./alchemy";
import GetNFTmetadata from "./GetNFTmetadata";

const GetNFTsId = ({ address, ContractAddressOfNft }) => {
  const [data, setData] = useState();

  const getTotalNft = async () => {
    try {
      const nfts = await alchemy.nft.getNftsForOwner(
        address,
        {
          contractAddresses: [ContractAddressOfNft],
        },
        { withMetadata: true }
      );
      localStorage.setItem("nft data", JSON.stringify(data));
      setData(nfts);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getTotalNft();
  }, [ContractAddressOfNft]);

  return (
    <td colSpan={3}>
      <table className="border-collapse w-full font-sans text-xs">
        <tbody>
          <tr className="border-b">
            <th className="text-center p-2">NFT</th>
            <th className="text-center p-2">Token ID</th>
            <th className="text-center p-2">Date</th>
          </tr>
          {/* {data?.ownedNfts.map((nft) => (
            <tr>
              <td>
                {
                  <img
                    src={nft?.media[0].gateway}
                    alt="nft face"
                    width="45px"
                    height="45px"
                    className="shadow-lg hover:shadow-zinc-500"
                  />
                }
              </td>
            </tr>
          ))} */}

          <>
            {data?.ownedNfts.map((id) => {
              return (
                <GetNFTmetadata
                  address={address}
                  tokenId={id.tokenId}
                  ContractAddressOfNft={ContractAddressOfNft}
                />
              );
            })}
          </>
        </tbody>
      </table>
    </td>
  );
};

export default GetNFTsId;
