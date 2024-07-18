import { DAY_STR, MONTH_STR } from "@/constant/date"

export const formattedDate = (dates, isNeedYear = false) => {
  const date = new Date(dates)

  // Get the day and month strings
  const day = DAY_STR[date.getDay()]

  // Get the month string
  const month = MONTH_STR[date.getMonth()]

  // Return the formatted date string
  return isNeedYear
    ? `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`
    : `${day}, ${date.getDate()} ${month}`
}

export const formattedDateStr = (dateStr) => {
  const date = new Date(dateStr)

  // Get the day and month strings
  const day = String(date.getUTCDate()).padStart(2, "0")

  // Get the month string
  const month = String(date.getUTCMonth() + 1).padStart(2, "0") // getUTCMonth() is zero-based

  // Get the year
  const year = date.getUTCFullYear()

  return `${day}-${month}-${year}`
}

export function getAllWeeksInMonth(year, month) {
  let firstDay = new Date(Date.UTC(year, month - 1, 1)) // Use UTC to prevent timezone issues

  // Find the first Monday of the month
  while (firstDay.getUTCDay() !== 1) {
    firstDay.setUTCDate(firstDay.getUTCDate() + 1)
  }

  // Initialize an array to store the weeks
  let weeks = []
  let currentWeekStart = new Date(firstDay)
  let counter = 1

  // Ensure we only collect weeks that belong entirely to the specified month
  while (currentWeekStart.getUTCMonth() + 1 === month) {
    let week = []

    let day = new Date(currentWeekStart)

    for (let i = 0; i < 6; i++) {
      // Collect Monday to Saturday
      week.push(new Date(day))
      day.setUTCDate(day.getUTCDate() + 1)
    }

    weeks.push({
      numOfTheWeek: counter, // Week number
      range: `${formattedDateStr(week[0])} - ${formattedDateStr(week[week.length - 1])}`,
      week,
    })

    // Increment the counter
    counter++

    currentWeekStart.setUTCDate(currentWeekStart.getUTCDate() + 7)

    // Adjust currentWeekStart to the next Monday to avoid spilling over to the next month's first week
    while (currentWeekStart.getUTCDay() !== 1) {
      currentWeekStart.setUTCDate(currentWeekStart.getUTCDate() + 1)
    }
  }

  return weeks
}

export function getWeekMonToSaturdayDates(year, month, week) {
  let firstDay = new Date(Date.UTC(year, month - 1, 1)) // Use UTC to prevent timezone issues

  // Find the first Monday of the month
  while (firstDay.getUTCDay() !== 1) {
    // 1 represents Monday
    firstDay.setUTCDate(firstDay.getUTCDate() + 1)
  }

  // Adjust to the start of the desired week
  firstDay.setUTCDate(firstDay.getUTCDate() + (week - 1) * 7)

  // Initialize an array to store the dates
  let dates = []

  // Push Monday to Saturday of that week into the array
  for (let i = 0; i < 7; i++) {
    // Iterate from Monday to Sunday
    if (firstDay.getUTCDay() >= 1 && firstDay.getUTCDay() <= 6) {
      // Check if it's Monday to Saturday
      dates.push(new Date(firstDay)) // Add the current date to the array
    }
    firstDay.setUTCDate(firstDay.getUTCDate() + 1) // Move to the next day
  }

  return dates
}

export function getWeekOfMonth(date) {
  // Create a new Date object for the first day of the month
  const firstDayOfMonth = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), 1),
  )

  // Get the day of the week for the first day of the month
  // (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7 // Adjust to make Monday the first day of the week

  // Calculate the difference in days between the input date and the first day of the month
  const dayOfMonth = date.getDate()
  const adjustedDate = dayOfMonth + firstDayOfWeek

  // Calculate the week number
  const weekNumber = Math.ceil(adjustedDate / 7)

  return weekNumber
}
