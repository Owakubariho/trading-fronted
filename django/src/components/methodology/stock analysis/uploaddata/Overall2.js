import React from 'react'
import AnalysisDaily from './AnalysisDailyUpload'
import AnalysisHourly from './AnalysisHourlyUpload'
import WeeklyAnalysis from './AnalysisWeeklyUpload'
const Overall2 = () => {
  return (
    <div>
        <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Daily Analysis</h2>
            <AnalysisDaily />
        </div>
        <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Hourly Analysis</h2>
            <AnalysisHourly />
        </div>
        <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Weekly Analysis</h2>
            <WeeklyAnalysis />
      
    </div>
    </div>
  )
}

export default Overall2
