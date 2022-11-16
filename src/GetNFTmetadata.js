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
    // <div>
    //   {loading ? (
    //     <div>loading</div>
    //   ) : (
    //     <>
    //       <table className="border-collapse w-full font-sans">
    //         <tr>
    //           <th className="text-left border">Company</th>
    //           <th className="text-left border">Contact</th>
    //           <th className="text-left border">Country</th>
    //         </tr>
    //         <tr>
    //           <td className="text-left border">Alfreds Futterkiste</td>
    //           <td className="text-left border">Maria Anders</td>
    //           <td className="text-left border">Germany</td>
    //         </tr>
    //         <tr>
    //           <td className="text-left border">Centro comercial Moctezuma</td>
    //           <td className="text-left border">Francisco Chang</td>
    //           <td className="text-left border">Mexico</td>
    //         </tr>
    //       </table>
    //       {/* <div className="flex justify-between items-center gap-3">
    //         <div>Token ID: {tokenId}</div>
    //         <div>
    //           <img
    //             src={data?.image_thumbnail_url}
    //             alt="nft face"
    //             width="45px"
    //             height="45px"
    //           />
    //         </div>

    //         <div className="flex flex-col">
    //           <p className="p-0">
    //             Date: {dayjs(data?.ownership.created_date).format("DD/MM/YYYY")}
    //           </p>
    //           <a
    //             href={data?.permalink}
    //             target="_blank"
    //             className="font-bold hover:text-cyan-600"
    //             rel="noreferrer"
    //           >
    //             check NFT here
    //           </a>
    //         </div>
    //       </div> */}
    //     </>
    //   )}
    // </div>
  );
};

export default GetNFTmetadata;
