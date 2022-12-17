import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import {
  DAILY_NOTIFICATIONS_TOGGLE,
  DAILY_HABITS,
  DEFAULT_DATE_TIME,
  DEFAULT_QUOTE,
  DEFAULT_QUOTE_AUTHOR,
  NOTIFICATION_DATE,
  PAST_DAY,
  QUOTE_NOTIFICATION_MESSAGE,
  APP_NAME,
  TRUE,
  YOUR_NAME_TEXT,
} from "../constants/AppConstants";
// import data from "../quotes.json";

export const getDailyNotificationsToggle = async () => {
  try {
    const dailyNotificationToggle = await AsyncStorage.getItem(
      DAILY_NOTIFICATIONS_TOGGLE
    );

    if (dailyNotificationToggle !== null) {
      return dailyNotificationToggle === TRUE;
    } else {
      return false;
    }
  } catch (e) {
    return false;
    // error reading value
  }
};

export const getYourNameText = async () => {
  try {
    const yourNameText = await AsyncStorage.getItem(YOUR_NAME_TEXT);

    if (yourNameText !== null) {
      return yourNameText;
    } else {
      return "";
    }
  } catch (e) {
    return "";
    // error reading value
  }
};

export const getNotificationDate = async () => {
  try {
    const notificationDate = await AsyncStorage.getItem(NOTIFICATION_DATE);
    if (notificationDate !== null) {
      const parsedNotificationDate = new Date(notificationDate);
      return parsedNotificationDate;
    } else {
      return new Date(DEFAULT_DATE_TIME);
    }
  } catch (e) {
    // error reading value
  }
};

export const storeNotificationDateToAsyncStorage = async (currentDate: any) => {
  try {
    await AsyncStorage.setItem(NOTIFICATION_DATE, currentDate.toString());
  } catch (e) {
    // saving error
  }
};

const getCurrentDate = () => {
  var currentDay = new Date().getDate().toString();
  var currentMonth = (new Date().getMonth() + 1).toString();
  var currentYear = new Date().getFullYear().toString();
  const concatDate = currentYear + currentMonth + currentDay;
  const currentDate = Number(concatDate);
  return currentDate;
};

const storeCurrentDayToAsyncStorageAndGetQuote = (
  currentDate: any,
  dailyQuote: any
) => {
  storeCurrentDayToAsyncStorage(currentDate);
  //   return JSON.parse(dailyQuote);
  return;
};

// const storeQuoteAndGetNewQuote = (currentDate: any) => {
//   const retrievedQuotes = data.quotes;
//   const randomIndex = Math.floor(Math.random() * retrievedQuotes.length);
//   const newQuote = retrievedQuotes[randomIndex];

//   storeQuoteToAsyncStorage(newQuote);
//   storeCurrentDayToAsyncStorage(currentDate);
//   return newQuote;
// };

export const getHabits = async () => {
  // await AsyncStorage.setItem(DAILY_HABITS, JSON.stringify([]));

  const storedHabits = await AsyncStorage.getItem(DAILY_HABITS);

  if (storedHabits !== null) {

    return JSON.parse(storedHabits);
    // const returnedQuote = await AsyncStorage.getItem(PAST_DAY).then(
    //   (pastDay) => {
    //     if (pastDay !== null) {
    //       const currentDate = getCurrentDate();
    //       const pastDate = Number(JSON.parse(pastDay));

    //       const isNewDay = pastDate < currentDate;

    //       //   return isNewDay
    //       //     ? storeQuoteAndGetNewQuote(currentDate)
    //       //     : storeCurrentDayToAsyncStorageAndGetQuote(currentDate, dailyQuote);

    //       if (isNewDay) {
    //         return;
    //       } else {
    //       }
    //     } else {
    //       const currentDate = getCurrentDate();
    //       return storeCurrentDayToAsyncStorageAndGetQuote(
    //         currentDate,
    //         storedHabits
    //       );
    //     }
    //   }
    // );
    // return returnedQuote;
  } else {
    return []
    // If no quote is stored in async storage, store and return deafult quote
    // const intitialQuote = {
    //   text: DEFAULT_QUOTE,
    //   author: DEFAULT_QUOTE_AUTHOR,
    // };
    // storeQuoteToAsyncStorage(intitialQuote);
    // const currentDate = getCurrentDate();
    // storeCurrentDayToAsyncStorage(currentDate);
    // return intitialQuote;
  }
};

export const scheduleNotification = async (nameText: string) => {
  // Cancel previous notification from async storage
  await Notifications.cancelAllScheduledNotificationsAsync();

  let minute = 0;
  let hour = 8;

  getNotificationDate()
    .then((updatedNotificationDate) => {
      if (updatedNotificationDate) {
        minute = Number(updatedNotificationDate.getMinutes());
        hour = Number(updatedNotificationDate.getHours());
      }
    })
    .then(() => {
      const schedulingOptions = {
        content: {
          title: APP_NAME,
          body: nameText
            ? `${nameText}, check out today's new quote!`
            : QUOTE_NOTIFICATION_MESSAGE,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
          hour: hour,
          minute: minute,
          repeats: true,
        },
      };
      Notifications.scheduleNotificationAsync(schedulingOptions);

      Notifications.addNotificationResponseReceivedListener((response) => {
        //TODO: might need to add code to open app when this is clicked?
      });
    });
};

export const storeHabitsToAsyncStorage = async (newQuote?: any) => {
  try {
    // Store the new quote in async storage
    await AsyncStorage.setItem(DAILY_HABITS, JSON.stringify(newQuote));
  } catch (e) {
    // saving error
  }
};

export const storeCurrentDayToAsyncStorage = async (currentDay: number) => {
  try {
    await AsyncStorage.setItem(
      PAST_DAY,
      JSON.stringify(JSON.stringify(currentDay))
    );
  } catch (e) {
    // saving error
  }
};
