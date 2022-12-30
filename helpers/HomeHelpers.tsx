import uuid from "react-native-uuid";

export const addHabitDetails = (habitName: string, monkModeDays: any) => {
  var weekDays = [];

  var weekdays = new Array(7);
  weekdays[0] = "Sun";
  weekdays[1] = "Mon";
  weekdays[2] = "Tue";
  weekdays[3] = "Wed";
  weekdays[4] = "Thu";
  weekdays[5] = "Fri";
  weekdays[6] = "Sat";

  const habitGroupId = uuid.v4();

  for (let i = 0; i < monkModeDays; i++) {
    const currentDate = new Date();
    const date = new Date(currentDate.getTime() + i * 86400000);
    const day = date.getDay();
    const dayNumber = date.getDate();

    weekDays.push({
      dayName: weekdays[day],
      dayNumber: dayNumber,
      date: date,
      isSelected: false,
      id: uuid.v4(),
      habitName: habitName,
      currentStreak: null,
      habitGroupId: habitGroupId,
    });
  }

  return weekDays;
};
