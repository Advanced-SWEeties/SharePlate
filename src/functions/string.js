

export function commaParse(commaSepString) {
  return commaSepString.split(',')
}


export const parseSchedule = (schedule) => {
  console.log(schedule)
  // Define the days of the week in order
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Initialize an object to hold the parsed schedule
  const parsedSchedule = {};

  // Loop through the days of the week to extract times for each day
  daysOfWeek.forEach((day, i) => {
    // Find the starting index of the current day in the string
    const dayStartIndex = schedule.indexOf(day);

    // If the day is found in the schedule
    if (dayStartIndex !== -1) {
      // Find the index of the next day's start (if exists)
      const nextDayStartIndex = i + 1 < daysOfWeek.length
        ? schedule.indexOf(daysOfWeek[i + 1])
        : schedule.length; // If it's the last day, use the end of the string

      // Extract the substring for the current day and its time slots
      const daySchedule = schedule.substring(dayStartIndex, nextDayStartIndex).trim();

      // Extract times from the substring after the colon
      const timeSlotMatch = daySchedule.match(/:\s*(.*)/);

      if (timeSlotMatch) {
        const times = timeSlotMatch[1].trim();

        // If it's "Closed", mark it as closed, else split into individual time slots
        if (times.toLowerCase() === 'closed') {
          parsedSchedule[day] = 'Closed';
        } else {
          parsedSchedule[day] = times.split(',').map(time => time.trim());
        }
      }
    }
  });

  return parsedSchedule;
};
