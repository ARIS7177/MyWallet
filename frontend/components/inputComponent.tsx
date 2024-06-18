import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import PhoneInput from "react-native-phone-number-input";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import clsx from "clsx";
import { string } from "zod";

//noms d'icones presents dans MaterialIcons
const iconNames = {
  default: "person",
  phone: "phone",
  motdepasse: "lock",
  datenaissance: "calendar-today",
};

interface inputProps {
  type: "default" | "phone" | "motdepasse" | "datenaissance";
  placeholder: string;
  onChangeText: any;
  secureTextEntry?: boolean;
  phoneInputRef?: any;
  onChangeFormattedText?: any;
  value?: any;
  isIcon?: boolean;
  className?: string;
  textStyle?: string;
  iconStyle?: string;
  errorMessage?: string; // Nouveau prop pour afficher les messages d'erreur
  personalIcon?: string;
  iconType?: "FontAwesome" | "MaterialIcons" | "Ionicons"; //pour prendre des icons autres part que dans materialIcons
}

export default function InputComponent({
  type,
  placeholder,
  secureTextEntry = false,
  onChangeText,
  phoneInputRef,
  onChangeFormattedText,
  value,
  className,
  isIcon = false,
  textStyle,
  iconStyle,
  errorMessage, // Recevoir les messages d'erreur
  personalIcon = "error-outline",
  iconType = "MaterialIcons",
}: inputProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Fonction utilitaire pour formater la date en "jour-mois-année"
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois sont de 0 à 11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const togglePasswordVisible = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleConfirm = (event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      const formattedDate = formatDate(date);
      onChangeText(formattedDate);
      setSelectedDate(date);
    }
    if (Platform.OS === "android") {
      hideDatePicker();
    }
  };

  const iconName = personalIcon || iconNames[type];
  const renderIcon = () => {
    const IconComponent = {
      FontAwesome: FontAwesome,
      MaterialIcons: Icon,
      Ionicons: Ionicons,
    }[iconType];

    return (
      <IconComponent
        name={iconName}
        size={20}
        color={"gray"}
        // className={clsx("", iconStyle)}
      />
    );
  };
  return (
    <View className=" ">
      {type === "datenaissance" ? (
        <View className="border-[0.5px] p-3 rounded-xl bg-purple-50">
          <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
            <Text className=" text-russian-950">{value || placeholder}</Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              maximumDate={new Date(currentYear - 18, 10, 20)}
              timeZoneName="Africa/Douala"
              onChange={handleConfirm}
              onTouchCancel={hideDatePicker}
            />
          )}
        </View>
      ) : type === "phone" ? (
        <View className=" flex-row border-[#292929] border-[0.5px] rounded-xl overflow-hidden">
          <PhoneInput
            ref={phoneInputRef}
            defaultValue={value}
            defaultCode="CM"
            layout="first"
            placeholder={placeholder}
            onChangeText={onChangeText}
            onChangeFormattedText={onChangeFormattedText}
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            flagButtonStyle={{ backgroundColor: "#efecfd" }}
          />
        </View>
      ) : (
        <View
          className={clsx(
            `border-[0.5px] border-[#292929] w-full rounded-xl bg-purple-50 relative ${
              isFocus && "border-primary-500 border-2"
            }`,
            className
          )}
        >
          <TextInput
            className={clsx("font-raleway-medium text-lg p-4 ", textStyle)}
            placeholder={placeholder}
            placeholderTextColor={"gray"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={
              type === "motdepasse" ? !isVisiblePassword : secureTextEntry
            }
            keyboardType={"default"}
          />
          {isIcon && (
            <TouchableOpacity
              onPress={
                type === "motdepasse" ? togglePasswordVisible : undefined
              }
            >
              {iconType === "MaterialIcons" ? (
                <Icon
                  name={
                    type === "motdepasse"
                      ? isVisiblePassword
                        ? "visibility"
                        : "visibility-off"
                      : personalIcon
                  }
                  size={24}
                  className={clsx("", iconStyle)}
                />
              ) : (
                renderIcon()
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  dateInput: {
    paddingVertical: 10,
  },
  phoneInputContainer: {
    flex: 1,
  },
  phoneInputTextContainer: {
    backgroundColor: "#f6f5fd",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
