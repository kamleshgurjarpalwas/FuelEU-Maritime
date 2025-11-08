export default function Table({ headers, rows }: { headers: string[]; rows: JSX.Element[] }) {
  return (
    <div className="overflow-auto bg-white rounded shadow-sm p-2">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="text-left border-b">
            {headers.map((h) => (
              <th key={h} className="p-2 text-sm text-gray-600">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows : <tr><td colSpan={headers.length} className="p-4 text-center text-sm text-gray-500">No data</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
