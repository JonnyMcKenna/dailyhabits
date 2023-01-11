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

  // return weekDays;

  return { id: uuid.v4(), habitName: habitName }
};


export const addEachHabitDetails = (habitName: string, monkModeDays: any) => {
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

  // return { id: uuid.v4(), habitName: habitName }
};


// export const appendDatesToHabits = (habits: any, monkModeDays: any) => {

//   const numberOfHabits = habits.length;

//   habits.array.forEach(element => {
    
//   });





//   var weekDays = [];

//   var weekdays = new Array(7);
//   weekdays[0] = "Sun";
//   weekdays[1] = "Mon";
//   weekdays[2] = "Tue";
//   weekdays[3] = "Wed";
//   weekdays[4] = "Thu";
//   weekdays[5] = "Fri";
//   weekdays[6] = "Sat";

//   const habitGroupId = uuid.v4();

//   for (let i = 0; i < monkModeDays; i++) {
//     const currentDate = new Date();
//     const date = new Date(currentDate.getTime() + i * 86400000);
//     const day = date.getDay();
//     const dayNumber = date.getDate();

//     weekDays.push({
//       dayName: weekdays[day],
//       dayNumber: dayNumber,
//       date: date,
//       isSelected: false,
//     });
//   }

//     //TODO: for each habit add a new days property
//   // The days property will be an array of objects with dayName, dayNumber, date, isSelected


//   habits.forEach((element) => {
//     element.habitDays = weekDays;
//   });

//   // return weekDays;

//   return habits;
// };
