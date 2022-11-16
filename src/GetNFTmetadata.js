import React, { useState } from "react";
import axios from "axios";
import { addressOfBAYC } from "./alchemy";
import * as dayjs from "dayjs";

const GetNFTmetadata = ({ tokenId, address }) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/asset/${addressOfBAYC}/${tokenId}/`,
    params: {
      account_address: `${address}`,
      include_orders: "false",
    },
  };

  React.useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="flex justify-between items-center gap-3">
          <div>
            <img
              src={data?.image_thumbnail_url}
              alt="nft face"
              width="45px"
              height="45px"
            />
          </div>
          <div className="flex flex-col">
            <p className="p-0">
              Date: {dayjs(data?.ownership.created_date).format("DD/MM/YYYY")}
            </p>
            <a
              href={data?.permalink}
              target="_blank"
              className="font-bold hover:text-cyan-600"
              rel="noreferrer"
            >
              check NFT here
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetNFTmetadata;
