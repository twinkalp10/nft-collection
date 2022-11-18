import axios from "axios";
import { useEffect, useState } from "react";
import { alchemy } from "./alchemy";
const getOptions = ({ address, ContractAddressOfNft, tokenId }) => {
  const options = {
    method: "GET",
    url: `https://api.opensea.io/api/v1/asset/${ContractAddressOfNft}/${tokenId}/`,
    params: {
      account_address: `${address}`,
      include_orders: "false",
    },
  };
  return options;
};

const useGetNftList = ({ userWalletAddress, ContractAddressOfNft }) => {
  const [nftList, setNftList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const getWalletNfts = async () => {
    try {
      const dataExist = localStorage.getItem(
        `${userWalletAddress}${ContractAddressOfNft}`
      );
      if (dataExist) {
        setNftList(JSON.parse(dataExist));
        setLoading(false);
        return;
      }
      const nfts = await alchemy.nft.getNftsForOwner(
        userWalletAddress,
        {
          contractAddresses: [ContractAddressOfNft],
        },
        { withMetadata: true }
      );
      const { ownedNfts } = nfts;

      const list = await Promise.all(
        ownedNfts.map(async (token, i) => {
          try {
            const { data } = await axios.request(
              getOptions({
                address: userWalletAddress,
                ContractAddressOfNft: ContractAddressOfNft,
                tokenId: token.tokenId,
              })
            );
            return { data, success: true };
          } catch (error) {
            setError(error);
            return { error, success: false };
          }
        })
      );
      localStorage.setItem(
        `${userWalletAddress}${ContractAddressOfNft}`,
        JSON.stringify(list)
      );
      setNftList(list);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  };

  console.log(nftList);

  useEffect(() => {
    getWalletNfts();
  }, []);

  return { loading, nftList, error };
};

export default useGetNftList;
