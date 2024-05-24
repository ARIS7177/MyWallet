interface props {
  title: string;
  styleText?: string;
  className?: string;
  onPress?: any;
  theme: "default" | "primary" | "secondary" | "icon";
  isSocialButton?: boolean;
}

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import clsx from "clsx";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
export default function Button({
  title,
  styleText,
  className,
  onPress,
  theme = "default",
  isSocialButton,
}: props) {
  let themeValue = "";
  switch (theme) {
    case "default":
      themeValue = "border";
      break;
    case "primary":
      themeValue = "bg-primary-500";
      break;
    case "secondary":
      themeValue = "";
      break;
    case "icon":
      themeValue = " bg-gray-300 rounded-2xl";
      break;
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        className={clsx(
          themeValue,
          className,
          " rounded-xl justify-center items-center"
        )}
      >
        <Text
          className={clsx(
            styleText,
            "font-helvitica-bold text-2xl py-3 items-center",
            styleText
          )}
        >
          {isSocialButton ? (
            <Icon
              name={title}
              size={28}
              className="flex-1 items-center justify-center "
            />
          ) : (
            title
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
