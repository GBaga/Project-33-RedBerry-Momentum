import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

const FormDatePicker = ({
  label,
  control,
  name,
  rules,
  errors,
  locale,
  dateFormat,
  minDate,
  defaultValue,
}) => (
  <div>
    <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
      {label}
    </label>
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <ReactDatePicker
          {...field}
          selected={field.value || defaultValue}
          onChange={(date) => field.onChange(date)}
          locale={locale}
          dateFormat={dateFormat}
          minDate={minDate}
          className="w-full p-2 border border-gray-300 rounded focus:border-[2px] focus:border-[#8338ec] focus:outline-none cursor-pointer pl-9"
        />
      )}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm">{errors[name].message}</p>
    )}
  </div>
);

export default FormDatePicker;
