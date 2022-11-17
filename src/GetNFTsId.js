import React, { useState } from "react";
import { alchemy } from "./alchemy";
import GetNFTmetadata from "./GetNFTmetadata";
import useGetNftList from "./useGetNftList";

const GetNFTsId = ({ address, ContractAddressOfNft }) => {
  return (
    <td colSpan={3} className="p-3">
      <GetNFTmetadata
        address={address}
        ContractAddressOfNft={ContractAddressOfNft}
      />
    </td>
  );
};

export default GetNFTsId;
