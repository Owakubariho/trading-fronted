import React from 'react'
import Daily from './DailyUpload'
import Hour from './HourlyUpload'
import Four from './Fourpload'
import Weekly from './WeeklyUpload'

const Main = () => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Daily Upload</h2>
        <Daily />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Hourly Upload</h2>
        <Hour />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Four Hour Upload</h2>
        <Four />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Weekly Upload</h2>
        <Weekly />
      </div>
    </div>
  )
}

export default Main
