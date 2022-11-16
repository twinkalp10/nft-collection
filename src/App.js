import { useState } from "react";
import "./App.css";
import TableRowData from "./TableRowData";
import useNfWallet from "./useNftWalletAddress";
import usePagination from "./usePagination";

function App() {
  const { data, error, loading } = useNfWallet();
  const { next, page, previous } = usePagination(data.length);
  const [value, setValue] = useState(15);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }
  return (
    <div className="App">
      <h4 className="flex justify-center items-center pt-2">
        Owner's list of BAYC NFT
      </h4>
      <div className="flex justify-center items-center px-10">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="inline-block mix-w-fit py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Index
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Wallet Address
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Total BAYC
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data
                      .slice(page * value - value, page * value)
                      .map((wallet, index) => (
                        <TableRowData
                          address={wallet.address}
                          count={wallet.count}
                          key={wallet.address}
                          index={index + page * value - value}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className=" mix-w-fit pb-2 align-middle md:px-6 lg:px-8">
              <div className="flex gap-4 justify-between items-center">
                <p className="p-0 text-xs">Page {page}</p>
                <p className="p-0 text-xs">
                  Total Page {Math.ceil(data.length / value)}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mix-w-fit pb-16 align-middle md:px-6 lg:px-8">
              <div>
                <label htmlFor="selectPage">Showing result</label>
                <select
                  id="selectPage"
                  value={value}
                  onChange={handleChange}
                  className="bg-[#fff] h-10"
                >
                  <option value="15">15</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">500</option>
                </select>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button onClick={previous}>Previous</button>
                <button onClick={next}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
