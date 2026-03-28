import React from 'react';
import { useNavigate } from 'react-router-dom';
// Step 1: Import the static list from your new data file.
import { assetList } from './assetList';


function AssetSelector({ currentAsset }) {
    // Step 2: Use the imported assetList directly.
    // There's no need for useState or useEffect for the asset list anymore,
    // as the data is static and available immediately.
    const assets = assetList;
    const navigate = useNavigate();

    // The handleAssetChange function remains the same.
    const handleAssetChange = (e) => {
        const selectedAsset = e.target.value;
        if (selectedAsset) {
            navigate(`/asset/${encodeURIComponent(selectedAsset)}`);
        }
    };

    return (
        <div className="mb-8">
            <label htmlFor="asset-selector" className="block text-sm font-medium text-gray-700 mb-1">
                Quick Navigate to Asset
            </label>
            <select
                id="asset-selector"
                value={currentAsset}
                onChange={handleAssetChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            >
                {/* Step 3: Map over the static 'assets' array. */}
                {assets.map(asset => (
                    <option key={asset} value={asset}>
                        {asset}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default AssetSelector;
