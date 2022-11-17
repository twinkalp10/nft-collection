import React, { useState } from "react";
import axios from "axios";
import { addressOfBAYC } from "./alchemy";
import * as dayjs from "dayjs";

const GetNFTmetadata = ({ tokenId, address, ContractAddressOfNft }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/asset/${ContractAddressOfNft}/${tokenId}/`,
    params: {
      account_address: `${address}`,
      include_orders: "false",
    },
  };

  React.useEffect(() => {
    Promise.all(
      axios.request(options).then(function (response) {
        setData(response.data);
        setLoading(false);
      })
    ).catch(function (error) {
      console.error(error);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <tr className="border-b hover:bg-slate-200">
        <>
          <td className="text-center flex justify-center items-center p-1">
            <a
              href={data?.permalink}
              target="_blank"
              className="font-bold hover:text-cyan-600"
              rel="noreferrer"
            >
              <img
                src={data?.image_thumbnail_url}
                alt="nft face"
                width="45px"
                height="45px"
                className="shadow-lg hover:shadow-zinc-500"
              />
            </a>
          </td>
          <td className="text-center p-1">{tokenId}</td>
          <td className="text-center p-1">
            {dayjs(data?.ownership.created_date).format("DD/MM/YYYY")}
          </td>
        </>
      </tr>
    </>
  );
};

export default GetNFTmetadata;
