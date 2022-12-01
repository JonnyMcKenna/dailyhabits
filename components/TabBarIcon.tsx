import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginBottom: 0 }} {...props} />;
}
