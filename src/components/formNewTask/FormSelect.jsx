import { Controller } from "react-hook-form";
import ReactSelect from "react-select";

const FormSelect = ({
  label,
  control,
  name,
  options,
  rules,
  errors,
  placeholder,
  isDisabled = false,
  onChange,
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
        <ReactSelect
          {...field}
          options={options}
          value={options.find((option) => option.value === field.value) || null}
          onChange={(selectedOption) => {
            field.onChange(selectedOption?.value);
            if (onChange) onChange(selectedOption);
          }}
          placeholder={placeholder}
          className="w-full"
          isDisabled={isDisabled}
        />
      )}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm">{errors[name].message}</p>
    )}
  </div>
);

export default FormSelect;
