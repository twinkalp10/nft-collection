import "./App.css";
import GetTotalNft from "./getTotalNft";
import useNfWallet from "./useNftWalletAddress";
import usePagination from "./usePagination";

function App() {
  const { data, error, loading } = useNfWallet();
  const { next, page, previous } = usePagination(data.length);
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
                      .slice(page * 15 - 15, page * 15)
                      .map((address, index) => (
                        <tr key={address}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {address}
                          </td>
                          <td>
                            <GetTotalNft address={address} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-4 justify-center items-center">
                <button
                  onClick={previous}
                  className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                >
                  Previous
                </button>
                <p>Page Number : {page}</p>
                <p>Total Page : {Math.ceil(data.length / 15)}</p>
                <button
                  onClick={next}
                  className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
