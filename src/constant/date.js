export const monthsIndonesian = [
  {
    id: 1,
    name: "Januari",
  },
  {
    id: 2,
    name: "Februari",
  },
  {
    id: 3,
    name: "Maret",
  },
  {
    id: 4,
    name: "April",
  },
  {
    id: 5,
    name: "Mei",
  },
  {
    id: 6,
    name: "Juni",
  },
  {
    id: 7,
    name: "Juli",
  },
  {
    id: 8,
    name: "Agustus",
  },
  {
    id: 9,
    name: "September",
  },
  {
    id: 10,
    name: "Oktober",
  },
  {
    id: 11,
    name: "November",
  },
  {
    id: 12,
    name: "Desember",
  },
]

export const formattedDateStr = (dateStr) => {
  const date = new Date(dateStr)

  const day = String(date.getUTCDate()).padStart(2, "0")
  const month = String(date.getUTCMonth() + 1).padStart(2, "0") // getUTCMonth() is zero-based
  const year = date.getUTCFullYear()

  return `${day}-${month}-${year}`
}

export function getAllWeeksInMonth(year, month) {
  let firstDay = new Date(Date.UTC(year, month - 1, 1)) // Use UTC to prevent timezone issues

  // Find the first Monday of the month
  while (firstDay.getUTCDay() !== 1) {
    firstDay.setUTCDate(firstDay.getUTCDate() + 1)
  }

  let weeks = []
  let currentWeekStart = new Date(firstDay)

  // Ensure we only collect weeks that belong entirely to the specified month
  while (currentWeekStart.getUTCMonth() + 1 === month) {
    let week = []

    let day = new Date(currentWeekStart)

    for (let i = 0; i < 6; i++) {
      // Collect Monday to Saturday
      week.push(new Date(day))
      day.setUTCDate(day.getUTCDate() + 1)
    }

    // weeks.push(week);

    weeks.push({
      range: `(${formattedDateStr(week[0])} - ${formattedDateStr(week[week.length - 1])})`,
      week,
    })

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

export const formattedDate = (d) => {
  const date = new Date(d)

  // Months in Indonesian
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  // Days in Indonesian
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

  const day = days[date.getDay()]
  const month = months[date.getMonth()]

  return `${day}, ${date.getDate()} ${month}`
}
