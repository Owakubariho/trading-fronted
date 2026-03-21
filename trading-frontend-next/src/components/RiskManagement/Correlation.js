import React, { useState } from "react";
import Papa from "papaparse";
import Card from "../ui/card";
import Button from "../ui/button";

function Correlation() {
  const [csvData, setCsvData] = useState([]);
  const [pair1, setPair1] = useState("");
  const [pair2, setPair2] = useState("");
  const [day, setDay] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Handle CSV upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvData(results.data);
      },
    });
  };

  // Handle filter
  const handleFilter = () => {
    const result = csvData.filter(
      (row) =>
        (!pair1 || row.pair1 === pair1) &&
        (!pair2 || row.pair2 === pair2) &&
        (!day || row.day === day)
    );
    setFilteredData(result);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSV Pair Analyzer</h1>

      {/* File Upload */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {/* Input Fields */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Pair 1"
          value={pair1}
          onChange={(e) => setPair1(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Pair 2"
          value={pair2}
          onChange={(e) => setPair2(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <Button onClick={handleFilter}>Filter</Button>

      {/* Results */}
      {filteredData.length > 0 && (
        <Card className="mt-6">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                {Object.keys(filteredData[0]).map((key) => (
                  <th key={key} className="border p-2 text-left">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border p-2">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
export default Correlation;
