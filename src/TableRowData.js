import React, { useState } from "react";
import GetNFTmetadata from "./GetNFTmetadata";
import GetTotalNft from "./getTotalNft";

const TableRowData = ({ address }) => {
  const [open, setOpen] = React.useState(false);
  const [nftDetails, setNftDetails] = useState();

  return (
    <>
      <tr
        key={address}
        onClick={() => {
          setOpen(!open);
        }}
        className="cursor-pointer hover:bg-sky-100 hover:text-orange-600"
      >
        <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {address}
        </td>
        <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          <GetTotalNft
            address={address}
            nftDetails={nftDetails}
            setNftDetails={setNftDetails}
          />
        </td>
      </tr>
      {open && (
        <tr>
          {nftDetails?.ownedNfts.map((n) => (
            <div className="whitespace-nowrap text-left py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              <div className="flex items-center gap-2 ">
                <div>
                  <img
                    src={n.media[0].thumbnail}
                    alt="nft face"
                    width="45px"
                    height="45px"
                  />
                </div>
                <div>Token ID: {n.tokenId}</div>
                <GetNFTmetadata tokenId={n.tokenId} address={address} />
              </div>
            </div>
          ))}
        </tr>
      )}
    </>
  );
};

export default TableRowData;
