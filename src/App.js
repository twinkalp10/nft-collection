import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import "./App.css";

const settings = {
  apiKey: "binQGA06sXO3tFLwYmiDD548J5vFk4f9",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [resultOfBayc, setResultOfBayc] = useState([]);
  const main = async () => {
    // Contract address
    const addressOfBAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

    // Get owners
    const { owners } = await alchemy.nft.getOwnersForContract(addressOfBAYC);
    setResultOfBayc(owners);
  };

  console.log(resultOfBayc);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runMain = () => {
    try {
      main();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    runMain();
  }, []);

  return (
    <div className="App">
      <div className="flex justify-center items-center p-10">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block mix-w-fit py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Wallet Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {resultOfBayc.map((token) => (
                      <tr>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {token}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
