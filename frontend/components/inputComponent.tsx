import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/MaterialIcons";
import PhoneInput from "react-native-phone-number-input";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import clsx from "clsx";

//noms d'icones presents dans MaterialIcons
const iconNames = {
  nom: "person",
  prenom: "person",
  phone: "phone",
  motdepasse: "lock",
  datenaissance: "calendar-today",
};

interface inputProps {
  type: "nom" | "prenom" | "phone" | "motdepasse" | "datenaissance";
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
}: inputProps) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const togglePasswordVisible = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleConfirm = (date: any) => {
    const formattedDate = date.toLocaleDateString();
    onChangeText(formattedDate);
    hideDatePicker();
  };

  const iconName = iconNames[type] || "person";
  return (
    <View className=" ">
      {type === "datenaissance" ? (
        <View className="border-[0.5px] p-3 rounded-xl bg-purple-50">
          <TouchableOpacity onPress={showDatePicker} style={styles.dateInput}>
            <Text className=" text-russian-950">{value || placeholder}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
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
          />
        </View>
      ) : (
        <View
          className={clsx(
            "border-[0.5px] border-[#292929] w-full rounded-xl bg-purple-50 relative",
            className
          )}
        >
          <TextInput
            className={clsx("font-raleway-medium text-lg p-4 ", textStyle)}
            placeholder={placeholder}
            placeholderTextColor={"gray"}
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
              <Icon
                name={
                  type === "motdepasse"
                    ? isVisiblePassword
                      ? "visibility"
                      : "visibility-off"
                    : iconName
                }
                size={24}
                className={clsx("", iconStyle)}
              />
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
