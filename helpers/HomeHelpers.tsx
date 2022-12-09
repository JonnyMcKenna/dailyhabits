import uuid from "react-native-uuid";

export const addHabitDetails = (habitName: string) => {
  var weekDays = [];
  var curr = new Date();
  var first = curr.getDate();

  var weekdays = new Array(7);
  weekdays[0] = "Sun";
  weekdays[1] = "Mon";
  weekdays[2] = "Tue";
  weekdays[3] = "Wed";
  weekdays[4] = "Thu";
  weekdays[5] = "Fri";
  weekdays[6] = "Sat";

  for (let i = first; i > first - 14; i--) {
    let day = new Date(curr.setDate(i)).getDay();
    let dayNumber = new Date(curr.setDate(i)).getDate();
    let date = new Date(curr.setDate(i)).toISOString().slice(0, 10);

    weekDays.push({
      dayName: weekdays[day],
      dayNumber: dayNumber,
      date: date,
      isSelected: false,
      id: uuid.v4(),
      habitName: habitName,
    });
  }

  return weekDays.reverse();
};
