'use client'

import {add, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isEqual, isSameMonth, parse, startOfMonth, startOfToday, startOfWeek } from 'date-fns'
import { useState } from 'react'
import styles from './calendar.module.css'
import { ko } from 'date-fns/locale'
import Link from 'next/link'

let colStartClasses = [
  '',
  'start-2',
  'start-3',
  'start-4',
  'start-5',
  'start-6',
  'start-7',
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function IndexPage() {
  
  let today = startOfToday();
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy', { locale: ko }));
  let [selectedDay, setSelectedDay] = useState(today);

  let firstDayOfCurrentMonth = startOfMonth(
    parse(currentMonth, 'MMM-yyyy', new Date(), { locale: ko })
  )
  let days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth)),
  }).map((date) => ({
    date,
  }))

  function next() {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayOfNextMonth, 'MMM-yyyy', { locale: ko }))
  }

  function previous() {
    let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayOfNextMonth, 'MMM-yyyy', { locale: ko }))
  }


  return (
        <>
          <div className={styles.header}>
            <button onClick={previous}>지난달</button>
            <h2>
              {format(firstDayOfCurrentMonth, 'MMMM', { locale: ko })}
            </h2>
            <button onClick={next}>다음달</button>
          </div>
          <div className={styles.main}>
            <div className={styles.week}>
              <div style={{ color : "red" }}>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
            </div>
            <div className={styles.day}>
              {days.map((day, dayIdx) => (
                <div
                  key={day.date}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day.date)],
                  )}
                >
                  <Link href={`/diet/${format(day.date, "yyyy-MM-dd")}`}>
                    <button
                      type="button"
                      className={classNames(
                        isEqual(day.date, selectedDay) && styles['text-red'],
                        !isEqual(day.date, selectedDay) && isEqual(day.date, today) && styles['text-red'],
                        !isEqual(day.date, today) && !isSameMonth(day.date, firstDayOfCurrentMonth) && styles['invisible'],
                        !isEqual(day.date, today) && isSameMonth(day.date, firstDayOfCurrentMonth) && styles['text-gray']
                      )}
                    >
                      <time dateTime={day.date.toString()}>{format(day.date, 'd')}</time>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
  ) 
}

