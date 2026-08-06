import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";

interface DatePickerProps {
  value: Date;
  onChange: (event: unknown, selectedDate?: Date) => void;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return (
    <View>
      <DateTimePicker
        value={value}
        mode="date"
        display="default"
        maximumDate={new Date()}
        minimumDate={new Date(1920, 0, 1)}
        onChange={onChange}
      />
    </View>
  );
};

export default DatePicker;
