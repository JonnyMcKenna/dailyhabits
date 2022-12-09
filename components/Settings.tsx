import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Platform,
  TextInput,
  StyleSheet,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
// import * as Notifications from "expo-notifications";
// import {
//   getDailyNotificationsToggle,
//   getNotificationDate,
//   scheduleNotification,
//   storeNotificationDateToAsyncStorage,
//   getYourNameText,
// } from "./QuoteScreenAsyncStorage";

// import LinkComponent from "./settings/LinkComponent";
// import TitleComponent from "./settings/TitleComponent";
// import SeparatorComponent from "./settings/SeparatorComponent";
import {
  BE_NOTIFIED_DESC,
  CLOCK,
  DARK_THEME_COLOUR,
  MID_THEME_COLOUR,
  LIGHT_THEME_COLOUR,
  COLUMN,
  CONNECT,
  CONTACT,
  CONTACT_SUB_TEXT,
  DAILY,
  DAILY_NOTIFICATIONS_TOGGLE,
  DARK,
  DATE_TIME_PICKER,
  DEFAULT,
  DELIVERY_TIME,
  DELIVERY_TIME_DESC,
  EIGHTY_PERCENT,
  ENTER_YOUR_NAME,
  ENVELOPE,
  INLINE,
  INSTAGRAM,
  INSTAGRAM_URL,
  INSTAGRAM_USERNAME,
  IOS,
  LEFT,
  LIGHT_GRAY,
  MAIL_URL,
  NOTIFICATIONS,
  ONE_HUNDRED_PERCENT,
  SEVENTY_PERCENT,
  APP_NAME,
  THIRTY_PERCENT,
  TIME,
  WEBSITE,
  WEBSITE_SUB_TEXT,
  WEBSITE_TAB_ICON,
  WEBSITE_URL,
  YOUR_NAME,
  YOUR_NAME_TEXT,
  SETTINGS_INPUT_BOTTOM_BORDER,
  ROW,
  FONT_WEIGHT_500,
  FONT_WEIGHT_300,
  OTHER_APPS,
  STOIC_MIND_URL,
  MOBILE,
  STOIC_MIND,
  DAILY_STOICISM,
} from "../constants/AppConstants";
import TitleComponent from "./TitleComponent";
import SeparatorComponent from "./SeparatorComponent";
import LinkComponent from "./LinkComponent";
import { SettingsRowComponent } from "./SettingsRowComponent";

export const SettingsScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.bounce,
      useNativeDriver: false,
    }).start();
    // getNotificationDate().then((parsedNotificationDate) => {
    //   if (parsedNotificationDate) {
    //     setDate(parsedNotificationDate);
    //   }
    // });

    // getDailyNotificationsToggle().then((dailyNotificationToggleValue) => {
    //   setSelection(dailyNotificationToggleValue);
    // });

    // getYourNameText().then((yourNameText) => {
    //   onChangeNameText(yourNameText);
    // });
  }, []);

  const [date, setDate] = useState(new Date(1598051757900));
  const [isSelected, setSelection] = useState(true);
  const [nameText, onChangeNameText] = useState("");

  // useEffect(() => {
  //   AsyncStorage.setItem(YOUR_NAME_TEXT, nameText);
  // }, [nameText]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    // storeNotificationDateToAsyncStorage(currentDate).then(() => {
    //   scheduleNotification(nameText);
    // });
    setDate(currentDate);
  };

  const openDateTimePickerAndroid = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: TIME,
      is24Hour: true,
    });
  };

  const onDailyChange = async (isSelected: any, date: any) => {
    if (isSelected) {
      //if isSelected is true then this section is open but about to close
      // await Notifications.cancelAllScheduledNotificationsAsync();
    }
    if (!isSelected) {
      //if isSelected is false then this section is closed but about to open
      // cancelAllScheduledNotificationsAsync is already called in scheduleNotification which is why we don't trigger cancelAllScheduledNotificationsAsync twice
      // scheduleNotification(nameText);
    }

    const isSelectedToggle = !isSelected;

    // AsyncStorage.setItem(
    //   DAILY_NOTIFICATIONS_TOGGLE,
    //   isSelectedToggle.toString()
    // ).then(() => {
    //   setSelection(isSelectedToggle);
    // });
  };

  function addZeroBefore(n: any) {
    return (n < 10 ? "0" : "") + n;
  }

  var minutes = addZeroBefore(date.getMinutes());
  var hours = addZeroBefore(date.getHours());

  return (
    <View
      style={{
        backgroundColor: DARK_THEME_COLOUR,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          height: ONE_HUNDRED_PERCENT,
          width: ONE_HUNDRED_PERCENT,
        }}
      >
        <ScrollView>
          <View
            style={[
              settingsStyles.container,
              {
                flexDirection: COLUMN,
              },
            ]}
          >
            <TitleComponent title={NOTIFICATIONS} />

            <TouchableOpacity onPress={() => setSelection(!isSelected)}>
              <View style={settingsContainerStyle.rowContainer}>
                <View style={{ width: EIGHTY_PERCENT }}>
                  <Text style={settingsRowChecklistStyle.heading}>{DAILY}</Text>
                  <Text style={settingsRowChecklistStyle.description}>
                    {BE_NOTIFIED_DESC}
                  </Text>
                </View>
                <View style={settingsRowChecklistStyle.checkbox}>
                  <BouncyCheckbox
                    isChecked={isSelected}
                    size={25}
                    style={{ marginLeft: 30, padding: 0 }}
                    fillColor={DARK_THEME_COLOUR}
                    disableBuiltInState
                    unfillColor={LIGHT_THEME_COLOUR}
                    iconStyle={{ borderColor: LIGHT_THEME_COLOUR }}
                    onPress={() => onDailyChange(isSelected, date)}
                  />
                </View>
              </View>
            </TouchableOpacity>

            {isSelected && (
              <View style={settingsContainerStyle.rowContainer}>
                <View style={{ width: ONE_HUNDRED_PERCENT }}>
                  <Text style={settingsRowChecklistStyle.heading}>
                    {YOUR_NAME}
                  </Text>
                  <TextInput
                    style={{
                      color: LIGHT_THEME_COLOUR,
                      fontSize: 16,
                      marginTop: 20,
                      paddingBottom: 10,
                      borderColor: DARK_THEME_COLOUR,
                      borderBottomColor: SETTINGS_INPUT_BOTTOM_BORDER,
                      borderWidth: 1,
                    }}
                    textAlign={LEFT}
                    onChangeText={onChangeNameText}
                    value={nameText}
                    placeholder={ENTER_YOUR_NAME}
                    placeholderTextColor={MID_THEME_COLOUR}
                    keyboardType={DEFAULT}
                  />
                </View>
              </View>
            )}

            {isSelected && Platform.OS !== IOS && (
              <TouchableOpacity onPress={() => openDateTimePickerAndroid()}>
                <SettingsRowComponent
                  heading={DELIVERY_TIME}
                  description={DELIVERY_TIME_DESC + hours + ":" + minutes}
                />
              </TouchableOpacity>
            )}

            {isSelected && Platform.OS === IOS && (
              <View style={settingsContainerStyle.rowContainer}>
                <View style={{ width: SEVENTY_PERCENT }}>
                  <Text style={settingsRowChecklistStyle.heading}>
                    {DELIVERY_TIME}
                  </Text>
                  <Text style={settingsRowChecklistStyle.description}>
                    {DELIVERY_TIME_DESC + hours + ":" + minutes}
                  </Text>
                </View>
                <View style={{ width: THIRTY_PERCENT }}>
                  <RNDateTimePicker
                    testID={DATE_TIME_PICKER}
                    value={date}
                    mode={TIME}
                    onChange={onChange}
                    themeVariant={DARK}
                    display={Platform.OS === IOS ? INLINE : CLOCK}
                  />
                </View>
              </View>
            )}

            <SeparatorComponent />

            <TitleComponent title={APP_NAME} />

            <LinkComponent
              url={MAIL_URL}
              tabName={ENVELOPE}
              title={CONTACT}
              subText={CONTACT_SUB_TEXT}
            />

            <SeparatorComponent />

            <TitleComponent title={CONNECT} />

            <LinkComponent
              url={INSTAGRAM_URL}
              tabName={INSTAGRAM.toLowerCase()}
              title={INSTAGRAM}
              subText={INSTAGRAM_USERNAME}
            />

            <LinkComponent
              url={WEBSITE_URL}
              tabName={WEBSITE_TAB_ICON}
              title={WEBSITE}
              subText={WEBSITE_SUB_TEXT}
            />

            <SeparatorComponent />

            <TitleComponent title={OTHER_APPS} />

            <LinkComponent
              url={STOIC_MIND_URL}
              tabName={MOBILE.toLowerCase()}
              title={STOIC_MIND}
              subText={DAILY_STOICISM}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export const settingsContainerStyle = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#ffffff",
  },
  rowContainer: {
    marginTop: 30,
    flexDirection: ROW,
  },
});

export const settingsRowChecklistStyle = StyleSheet.create({
  rowContainer: {
    marginTop: 30,
    flexDirection: ROW,
  },
  heading: {
    fontSize: 16,
    fontWeight: FONT_WEIGHT_500,
    color: LIGHT_THEME_COLOUR,
  },
  description: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT_300,
    color: MID_THEME_COLOUR,
  },
  checkbox: {
    width: "20%",
    justifyContent: "center",
  },
});

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: "15%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    color: "#ffffff",
  },
});
