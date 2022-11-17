import React, { useEffect } from "react";
import GetNFTsId from "./GetNFTsId";
const TableRowData = ({ address, count, index, key, ContractAddressOfNft }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <tr
        onClick={() => {
          setOpen(!open);
        }}
        className="cursor-pointer hover:bg-sky-100 hover:text-orange-600"
      >
        <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {index + 1}
        </td>
        <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {address}
        </td>
        <td className="whitespace-nowrap text-center py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {count}
        </td>
      </tr>
      {open && (
        <tr key={key}>
          <GetNFTsId
            address={address}
            ContractAddressOfNft={ContractAddressOfNft}
          />
        </tr>
      )}
    </>
  );
};

export default TableRowData;
