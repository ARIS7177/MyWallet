interface props {
  title: string | any;
  styleText?: string;
  className?: string;
  onPress?: any;
  theme: "default" | "primary" | "secondary" | "icon" | "danger" | "success";
  isSocialButton?: boolean;
  isComposed?: boolean;
  isActive?: boolean;
  disabled?: boolean;
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
  isComposed = false,
  isActive = false,
  disabled = false,
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
    case "danger":
      themeValue = "bg-red-600";
      break;
    case "success":
      themeValue = "bg-green-500";
      break;
  }
  const iconColors: { [key in props["title"]]: string } = {
    facebook: "#3b5998",
    google: "#db4437",
    linkedin: "#0077b5",
  };
  const iconColor = iconColors[title] || "#000";
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      {isComposed ? (
        <View className="container justify-center items-center">
          <View
            className={clsx(
              `circle w-7 h-7 rounded-full bg-gray-300 border border-gray-400 ${
                isActive && " bg-primary-600 border-primary-800"
              }`
            )}
          ></View>
          <Text className=" font-raleway text-gray-500 text-xl">{title}</Text>
        </View>
      ) : (
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
                color={iconColor}
                name={title}
                size={28}
                className="flex-1 items-center justify-center "
              />
            ) : (
              title
            )}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

