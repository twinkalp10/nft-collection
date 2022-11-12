import React, { useState } from "react";
import axios from "axios";
import { addressOfBAYC } from "./alchemy";

const GetNFTmetadata = ({ tokenId, address }) => {
  const [data, setData] = useState();
  // const res = axios.get(
  //   `https://api.opensea.io/api/v1/asset/${addressOfBAYC}/${tokenId}/`,
  //   {
  //     params: { account_address: `${address}`, include_orders: "false" },
  //   }
  // );

  // console.log(res.then((res) => res.json()));

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
        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  console.log(data);

  return (
    <div>
      <div>
        <img
          src={data?.image_thumbnail_url}
          alt="nft face"
          width="45px"
          height="45px"
        />
      </div>
      <div>{data?.ownership.created_date}</div>
      <a
        href={data?.permalink}
        target="_blank"
        className="font-bold hover:text-cyan-600"
        rel="noreferrer"
      >
        check NFT here
      </a>
    </div>
  );
};

export default GetNFTmetadata;
