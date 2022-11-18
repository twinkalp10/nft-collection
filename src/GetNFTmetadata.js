import React, { useState } from "react";
import * as dayjs from "dayjs";
import useGetNftList from "./useGetNftList";

const GetNFTmetadata = ({ address, ContractAddressOfNft }) => {
  const { loading, nftList, error } = useGetNftList({
    userWalletAddress: address,
    ContractAddressOfNft,
  });

  if (loading) {
    return (
      <div colSpan={3} className="flex justify-center items-center w-full">
        <svg
          class="animate-spin h-5 w-5 text-black m-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  console.log(nftList);
  if (error) {
    return (
      <div colSpan={3} className="flex justify-center items-center w-full p-4">
        <p>Error loading the data Api rate limited</p>
      </div>
    );
  }
  return (
    <table className="border-collapse w-full font-sans text-xs bg-gray-100 rounded-md">
      <thead>
        <tr className="border-b">
          <th className="text-center p-2">NFT</th>
          <th className="text-center p-2">Token ID</th>
          <th className="text-center p-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {nftList?.ownedNfts.map((nft) => {
          {
            /* if (!nft.success) {
            return null;
          } */
          }
          return (
            <tr className="border-b hover:bg-slate-200" key={nft.tokenId}>
              <td className="text-center flex justify-center items-center p-1">
                <a
                  href={nft.data?.permalink}
                  target="_blank"
                  className="font-bold hover:text-cyan-600"
                  rel="noreferrer"
                >
                  <img
                    src={nft.media[0].gateway}
                    alt="nft face"
                    width="45px"
                    height="45px"
                    className="shadow-lg hover:shadow-zinc-500"
                  />
                </a>
              </td>
              <td className="text-center p-1">{nft.tokenId}</td>
              <td className="text-center p-1">
                {dayjs(nft.timeLastUpdated).format("DD/MM/YYYY")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GetNFTmetadata;
