// components/LinkResults.tsx

interface LinkResult {
    link: string;
    status: string;
    description: string; // Adding a description for each link result
  }
  
  interface LinkResultsProps {
    results: LinkResult[];
    error?: string;
  }
  
  const LinkResults: React.FC<LinkResultsProps> = ({ results, error }) => {
    return (
      <div className="mt-6 w-full max-w-4xl overflow-x-auto">
        {error && (
          <div className="bg-red-200 text-red-700 p-4 rounded-md mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Side Område</th>
              <th className="px-4 py-2 text-left">(Sett inn lenke)</th>
              <th className="px-4 py-2 text-left">Feil/forslag til løsning</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } border-t border-b`}
              >
                <td className="px-4 py-2">{result.link}</td>
                <td className="px-4 py-2">
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    {result.link}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`font-semibold ${
                      result.status === 'OK'
                        ? 'text-green-600'
                        : result.status === 'Redirected'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {result.status}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default LinkResults;
  