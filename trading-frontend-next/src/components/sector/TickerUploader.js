import React, { useState } from 'react';
import axios from 'axios';

const TickerUploader = () => {
    const [nasdaqFile, setNasdaqFile] = useState(null);
    const [nyseFile, setNyseFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e, type) => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'nasdaq') setNasdaqFile(e.target.files[0]);
            if (type === 'nyse') setNyseFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!nasdaqFile || !nyseFile) {
            setUploadStatus('Please select both files first.');
            return;
        }

        const formData = new FormData();
        formData.append('nasdaq_file', nasdaqFile);
        formData.append('nyse_file', nyseFile);

        setLoading(true);
        setUploadStatus('Uploading files to server...');

        try {
            const response = await axios.post('http://localhost:8000/api/upload-tickers/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setUploadStatus('✅ Upload Complete! Files are ready for analysis.');
            }
        } catch (error) {
            console.error(error);
            setUploadStatus('❌ Upload Failed. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Step 1: Upload Ticker Data</h2>

            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">NASDAQ Tickers (.xlsx)</label>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => handleFileChange(e, 'nasdaq')}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-bold mb-2">NYSE Tickers (.xlsx)</label>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={(e) => handleFileChange(e, 'nyse')}
                    className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                />
            </div>

            <button
                onClick={handleUpload}
                disabled={loading}
                className={`w-full py-2 px-4 rounded text-white font-bold 
                    ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {loading ? 'Uploading...' : 'Upload Files'}
            </button>

            {uploadStatus && (
                <div className={`mt-4 p-2 text-center rounded ${uploadStatus.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {uploadStatus}
                </div>
            )}
        </div>
    );
};

export default TickerUploader;