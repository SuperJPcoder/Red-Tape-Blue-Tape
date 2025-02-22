import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Events.css'

const eventTypes = {
  holiday: 'holiday',
  working: 'working',
  exam: 'exam',
  activity: 'activity'
}

const dummyEvents = {
  '2025-02-14': [{ type: eventTypes.holiday, title: "Valentine's Day" }],
  '2025-02-20': [{ type: eventTypes.exam, title: 'Mid Term Exam' }],
  '2025-02-25': [{ type: eventTypes.activity, title: 'Club Meeting' }],
  '2025-02-28': [{ type: eventTypes.holiday, title: 'National Holiday' }]
}

function Events() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }
  const renderCalendarCells = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
    const cells = []
    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDay + 1
      let cellDate = null
      let displayNumber = ''
      if (dayNumber > 0 && dayNumber <= daysInMonth) {
        displayNumber = dayNumber
        cellDate = new Date(currentYear, currentMonth, dayNumber)
      }
      let formattedDate = ''
      if (cellDate) {
        const monthStr = (cellDate.getMonth() + 1).toString().padStart(2, '0')
        const dayStr = cellDate.getDate().toString().padStart(2, '0')
        formattedDate = `${cellDate.getFullYear()}-${monthStr}-${dayStr}`
      }
      let eventsForDay = cellDate ? (dummyEvents[formattedDate] || []) : []
      let cellClass = 'calendar-cell'
      if (eventsForDay.length > 0) {
        eventsForDay.forEach(ev => {
          if (ev.type === eventTypes.holiday) {
            cellClass += ' holiday'
          } else if (ev.type === eventTypes.exam) {
            cellClass += ' exam'
          } else if (ev.type === eventTypes.activity) {
            cellClass += ' activity'
          } else if (ev.type === eventTypes.working) {
            cellClass += ' working'
          }
        })
      }
      cells.push(
        <div key={i} className={cellClass}>
          <div className="day-number">{displayNumber}</div>
          <div className="events">
            {eventsForDay.map((ev, index) => (
              <div key={index} className={`event ${ev.type}`}>
                {ev.title}
              </div>
            ))}
          </div>
        </div>
      )
    }
    return cells
  }
  return (
    <div className="events-page">
      <div className="calendar-header">
        <motion.button whileHover={{ scale: 1.1 }} onClick={handlePrevMonth}>Prev</motion.button>
        <div className="month-year">{monthNames[currentMonth]} {currentYear}</div>
        <motion.button whileHover={{ scale: 1.1 }} onClick={handleNextMonth}>Next</motion.button>
      </div>
      <div className="calendar-grid">
        <div className="day-name">Sun</div>
        <div className="day-name">Mon</div>
        <div className="day-name">Tue</div>
        <div className="day-name">Wed</div>
        <div className="day-name">Thu</div>
        <div className="day-name">Fri</div>
        <div className="day-name">Sat</div>
        {renderCalendarCells()}
      </div>
    </div>
  )
}

export default Events
