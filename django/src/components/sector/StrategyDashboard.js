// StrategyDashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// COMMAND: Configure base URL if not using a proxy
// You can also set this in your main App.js or via environment variables
const API_BASE_URL = 'http://127.0.0.1:8000';

const StrategyDashboard = () => {
  const [sectors, setSectors] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    minRS: 80,
    showOnlyLeaders: true,
    showOnlyTopIndustries: true,
    maxIndustriesPerSector: 10,
    sortBy: 'rank',
    sectorFilter: 'all',
  });

  const [expandedSectors, setExpandedSectors] = useState({});
  const [expandedIndustries, setExpandedIndustries] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  // Memoized fetch function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch market structure with filters
      const [marketRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/market-structure/`, {
          params: {
            min_rs: activeFilters.minRS,
            only_leaders: activeFilters.showOnlyLeaders
          }
        }),
        axios.get(`${API_BASE_URL}/dashboard-stats/`)
      ]);

      setSectors(marketRes.data);
      setStats(statsRes.data);

      // Auto-expand top 3 sectors
      const initialExpanded = {};
      marketRes.data.slice(0, 3).forEach(sector => {
        initialExpanded[sector.id] = true;
      });
      setExpandedSectors(initialExpanded);

    } catch (err) {
      setError(`Failed to load data: ${err.message}`);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activeFilters.minRS, activeFilters.showOnlyLeaders]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSector = (sectorId) => {
    setExpandedSectors(prev => ({
      ...prev,
      [sectorId]: !prev[sectorId]
    }));
  };

  const toggleIndustry = (industryId) => {
    setExpandedIndustries(prev => ({
      ...prev,
      [industryId]: !prev[industryId]
    }));
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined) return '0.00%';
    const num = parseFloat(value);
    return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  const formatPrice = (value) => {
    if (value === null || value === undefined) return '$0.00';
    return `$${parseFloat(value).toFixed(2)}`;
  };

  const getRSColorClass = (rsRating) => {
    if (rsRating >= 90) return 'bg-green-100 text-green-800 border border-green-200';
    if (rsRating >= 80) return 'bg-blue-100 text-blue-800 border border-blue-200';
    if (rsRating >= 70) return 'bg-gray-100 text-gray-800 border border-gray-200';
    return 'bg-red-100 text-red-800 border border-red-200';
  };

  const getSectorRankClass = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border border-yellow-200';
    if (rank === 2) return 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border border-gray-200';
    if (rank === 3) return 'bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border border-orange-200';
    return 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border border-blue-200';
  };

  const getPerformanceColor = (performance) => {
    const perf = parseFloat(performance);
    if (perf > 20) return 'text-green-700';
    if (perf > 10) return 'text-green-600';
    if (perf > 0) return 'text-blue-600';
    if (perf < -10) return 'text-red-700';
    return 'text-red-600';
  };

  const getPerformanceBgColor = (performance) => {
    const perf = parseFloat(performance);
    if (perf > 20) return 'bg-green-50 border border-green-200';
    if (perf > 10) return 'bg-green-100 border border-green-200';
    if (perf > 0) return 'bg-blue-50 border border-blue-200';
    if (perf < -10) return 'bg-red-50 border border-red-200';
    return 'bg-red-100 border border-red-200';
  };

  const calculateSectorStrength = (sector) => {
    if (!sector.industries || sector.industries.length === 0) return 0;

    const leadingIndustries = sector.industries.filter(ind =>
      ind.avg_3m_performance > 0 && ind.stock_count > 5
    ).length;

    const totalIndustries = sector.industries.length;
    return Math.round((leadingIndustries / totalIndustries) * 100);
  };

  if (loading && !refreshing) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Analyzing Market Structure</p>
          <p className="text-sm text-gray-500">Fetching sector and industry data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Market Leadership Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Real-time sector & industry analysis</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                O'Neil RS Methodology
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => window.open(`${API_BASE_URL}/dashboard-stats/`, '_blank')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
              title="View raw API data"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              API
            </button>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
            >
              {refreshing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Refreshing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Data
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">Total Sectors</div>
            <div className="text-2xl font-bold text-gray-900">{stats.summary?.total_sectors || 0}</div>
            <div className="text-xs text-gray-400 mt-1">Active</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">Total Stocks</div>
            <div className="text-2xl font-bold text-gray-900">{stats.summary?.total_stocks || 0}</div>
            <div className="text-xs text-gray-400 mt-1">Price  greater than $10</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">Avg RS Rating</div>
            <div className="text-2xl font-bold text-blue-600">
              {stats.summary?.avg_rs_rating ? Math.round(stats.summary.avg_rs_rating) : 0}
            </div>
            <div className="text-xs text-gray-400 mt-1">Market Average</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">Leaders (RS ≥ 80)</div>
            <div className="text-2xl font-bold text-green-600">
              {stats.performance?.stocks_rs_above_80 || 0}
            </div>
            <div className="text-xs text-gray-400 mt-1">{stats.summary?.total_stocks ? Math.round((stats.performance?.stocks_rs_above_80 / stats.summary.total_stocks) * 100) : 0}% of total</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">Superior (RS ≥ 90)</div>
            <div className="text-2xl font-bold text-purple-600">
              {stats.performance?.stocks_rs_above_90 || 0}
            </div>
            <div className="text-xs text-gray-400 mt-1">Top Performers</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="text-sm text-gray-500 mb-1">Top Sector</div>
            <div className="text-lg font-bold text-gray-900 truncate" title={stats.performance?.top_sector || 'None'}>
              {stats.performance?.top_sector || 'None'}
            </div>
            <div className="text-xs text-gray-400 mt-1">Rank #1</div>
          </div>
        </div>

        {/* RS Distribution Chart */}
        {stats.rs_distribution && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Relative Strength Distribution</h3>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(stats.rs_distribution).map(([range, count]) => {
                const label = range.replace('_', ' ').replace('plus', '+').replace('below', '<');
                const percentage = stats.summary?.total_stocks ? (count / stats.summary.total_stocks * 100).toFixed(1) : 0;

                return (
                  <div key={range} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                    <div className="text-sm text-gray-600">{label}</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filters Panel */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum RS Rating: <span className={`font-bold ${activeFilters.minRS >= 90 ? 'text-purple-600' : 'text-blue-600'}`}>
                    {activeFilters.minRS}+
                  </span>
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="70"
                    max="99"
                    value={activeFilters.minRS}
                    onChange={(e) => handleFilterChange('minRS', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFilterChange('minRS', 80)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${activeFilters.minRS === 80 ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      RS 80+
                    </button>
                    <button
                      onClick={() => handleFilterChange('minRS', 90)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${activeFilters.minRS === 90 ? 'bg-purple-100 text-purple-800 border border-purple-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      RS 90+
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.showOnlyLeaders}
                    onChange={(e) => handleFilterChange('showOnlyLeaders', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Show only leaders (RS ≥ {activeFilters.minRS})</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.showOnlyTopIndustries}
                    onChange={(e) => handleFilterChange('showOnlyTopIndustries', e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Top industries only</span>
                </label>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-600">
                Showing <span className="font-bold">{sectors.length}</span> sectors
              </div>
              <select
                value={activeFilters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="rank">Sort by Rank</option>
                <option value="performance">Sort by Performance</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Sectors */}
      <div className="space-y-6">
        {sectors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-200">
            <div className="text-gray-400 text-5xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Sector Data Available</h3>
            <p className="text-gray-500 mb-6">Run the ingestion command to populate the database</p>
            <div className="inline-flex flex-col items-center space-y-2">
              <code className="block p-4 bg-gray-900 text-gray-100 rounded-lg text-sm font-mono">
                python manage.py ingest_stocks --test --delay=3
              </code>
              <a
                href="http://localhost:8000/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Or check Django Admin →
              </a>
            </div>
          </div>
        ) : (
          sectors
            .sort((a, b) => {
              switch (activeFilters.sortBy) {
                case 'performance':
                  return b.avg_3m_performance - a.avg_3m_performance;
                case 'name':
                  return a.name.localeCompare(b.name);
                default:
                  return a.rank - b.rank;
              }
            })
            .map((sector) => {
              const isExpanded = expandedSectors[sector.id];
              const sectorStrength = calculateSectorStrength(sector);

              // Filter industries based on settings
              const filteredIndustries = sector.industries
                ?.filter(ind => {
                  if (activeFilters.showOnlyTopIndustries && ind.rank > 10) return false;
                  return true;
                })
                .sort((a, b) => a.rank - b.rank) || [];

              return (
                <div key={sector.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Sector Header - Clickable */}
                  <div
                    className={`p-6 cursor-pointer transition-colors ${isExpanded ? 'bg-gradient-to-r from-blue-50 to-indigo-50' : 'bg-gradient-to-r from-gray-50 to-gray-100'} hover:from-blue-50 hover:to-blue-100`}
                    onClick={() => toggleSector(sector.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-3 mb-3">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold ${getSectorRankClass(sector.rank)}`}>
                            Rank #{sector.rank}
                          </span>
                          <h2 className="text-2xl font-bold text-gray-900">{sector.name}</h2>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V7z" clipRule="evenodd" />
                              </svg>
                              {filteredIndustries.length} industries
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                              </svg>
                              {sector.stock_count} stocks
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <div className={`px-4 py-2 rounded-lg ${getPerformanceBgColor(sector.avg_3m_performance)}`}>
                            <div className="text-sm text-gray-600">Avg Performance</div>
                            <div className={`text-xl font-bold ${getPerformanceColor(sector.avg_3m_performance)}`}>
                              {formatPercentage(sector.avg_3m_performance)}
                            </div>
                          </div>

                          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
                            <div className="text-sm text-gray-600">Sector Strength</div>
                            <div className="text-xl font-bold text-gray-800">
                              {sectorStrength}%
                            </div>
                          </div>

                          <div className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                            <div className="text-sm text-gray-600">Leading Industries</div>
                            <div className="text-xl font-bold text-blue-700">
                              {filteredIndustries.filter(ind => ind.avg_3m_performance > 0).length}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <button
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 hover:border-gray-400 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSector(sector.id);
                          }}
                        >
                          <svg
                            className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Industries Grid - Collapsible */}
                  {isExpanded && filteredIndustries.length > 0 && (
                    <div className="p-6 border-t border-gray-200">
                      <div className="mb-4 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Industries</h3>
                        <span className="text-sm text-gray-500">
                          Showing {filteredIndustries.length} of {sector.industries?.length || 0} industries
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredIndustries.map((industry) => {
                          const isIndustryExpanded = expandedIndustries[industry.id];
                          const leaderStocks = industry.top_stocks || [];
                          const filteredLeaderStocks = leaderStocks.filter(stock =>
                            !activeFilters.showOnlyLeaders || stock.rs_rating_3m >= activeFilters.minRS
                          );

                          return (
                            <div key={industry.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all bg-white">
                              <div className="mb-4">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-semibold rounded-full">
                                        #{industry.rank}
                                      </span>
                                      <h4 className="font-bold text-lg text-gray-900 truncate" title={industry.name}>
                                        {industry.name}
                                      </h4>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                      <span>{industry.stock_count || 0} stocks</span>
                                      <span>{filteredLeaderStocks.length} leaders</span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className={`text-2xl font-bold ${getPerformanceColor(industry.avg_3m_performance)}`}>
                                      {formatPercentage(industry.avg_3m_performance)}
                                    </div>
                                    <div className="text-xs text-gray-500">Industry Avg</div>
                                  </div>
                                </div>

                                <button
                                  onClick={() => toggleIndustry(industry.id)}
                                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                                >
                                  {isIndustryExpanded ? 'Hide' : 'Show'} stocks
                                  <svg
                                    className={`w-4 h-4 ml-1 transition-transform ${isIndustryExpanded ? 'transform rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>

                              {/* Stocks Table - Collapsible */}
                              {isIndustryExpanded && (
                                <div className="mt-4 border-t border-gray-100 pt-4">
                                  {filteredLeaderStocks.length > 0 ? (
                                    <>
                                      <div className="overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="w-full text-sm">
                                          <thead className="bg-gray-50">
                                            <tr>
                                              <th className="text-left p-3 font-semibold text-gray-700">Symbol</th>
                                              <th className="text-left p-3 font-semibold text-gray-700">Price</th>
                                              <th className="text-left p-3 font-semibold text-gray-700">RS</th>
                                              <th className="text-left p-3 font-semibold text-gray-700">3M Change</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {filteredLeaderStocks.map((stock) => (
                                              <tr key={stock.symbol} className="border-t border-gray-100 hover:bg-blue-50 transition-colors">
                                                <td className="p-3">
                                                  <div className="flex flex-col">
                                                    <span className="font-bold text-blue-700">{stock.symbol}</span>
                                                    <span className="text-xs text-gray-500 truncate max-w-[120px]" title={stock.company_name}>
                                                      {stock.company_name}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td className="p-3 font-mono">
                                                  {formatPrice(stock.current_price)}
                                                </td>
                                                <td className="p-3">
                                                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getRSColorClass(stock.rs_rating_3m)}`}>
                                                    {stock.rs_rating_3m}
                                                  </span>
                                                </td>
                                                <td className={`p-3 font-bold ${getPerformanceColor(stock.raw_3m_change)}`}>
                                                  {formatPercentage(stock.raw_3m_change)}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                      <div className="mt-3 text-xs text-gray-500 text-center">
                                        Showing {filteredLeaderStocks.length} of {leaderStocks.length} stocks
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-center py-8 text-gray-400">
                                      <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <p>No stocks with RS ≥ {activeFilters.minRS}</p>
                                      <p className="text-sm mt-1">Try lowering the RS filter</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between text-gray-500 text-sm">
          <div className="mb-4 md:mb-0">
            <p className="font-medium">Market Leadership Dashboard v1.0</p>
            <p className="mt-1">Data sourced from Yahoo Finance • RS Ratings calculated using O'Neil methodology</p>
          </div>
          <div className="text-right">
            <p>Last updated: {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyDashboard;
