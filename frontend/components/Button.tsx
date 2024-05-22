interface props{
    title: string,
    styleText?: string,
    className?:string,
    onPress?:any,
    theme : "default" | "primary" | "secondary"
}

import React from 'react'
import { Text,TouchableOpacity, View } from 'react-native'
import clsx from 'clsx'
export default function Button({title,styleText,className,onPress, theme='default'}:props) {
  let themeValue =""
  switch(theme){
    case "default":
       themeValue ='border'
      break;
    case "primary":
       themeValue = "bg-primary-600"
      break;
    case "secondary":
       themeValue = ""
      break

  }
  
  return (
    <TouchableOpacity  onPress={onPress}>
        <View className={clsx('py-3 px-7 rounded-xl ',themeValue,className)}>
        <Text className={clsx(' font-raleway text-2xl font-bold',styleText)}>{title}</Text>
        </View>
    </TouchableOpacity>
  )
}
