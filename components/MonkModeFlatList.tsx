import * as React from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

export function MonkModeFlatList({ habits, setHabits }: any) {
  let row: Array<any> = [];
  let prevOpenedRow: any;

  const renderItem = ({ item, index }: any, onClick: any) => {
    const closeRow = (index: any) => {
      console.log("closerow");
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    const renderRightActions = (progress: any, dragX: any, onClick: any) => {
      return (
        <View
          style={{
            margin: 0,
            alignContent: "center",
            justifyContent: "center",
            width: 70,
          }}
        >
          <Button color="#FF4742" onPress={onClick} title="🗑️"></Button>
        </View>
      );
    };

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, onClick)
        }
        onSwipeableOpen={() => closeRow(index)}
        ref={(ref) => (row[index] = ref)}
        rightOpenValue={-100}
      >
        <View
          style={{
            borderWidth: 1,
            padding: 12,
            backgroundColor: "white",
            height: 46,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {item.habitName}
          </Text>
        </View>
      </Swipeable>
    );
  };

  const deleteItem = ({ item, index }: any) => {
    let a = habits;
    a.splice(index, 1);
    setHabits([...a]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        renderItem={(v) =>
          renderItem(v, () => {
            deleteItem(v);
          })
        }
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 8,
    height: "45%",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
