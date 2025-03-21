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
          styles={{
            control: (provided, state) => ({
              ...provided,
              borderColor: state.isFocused ? "#8338ec" : provided.borderColor,
              boxShadow: state.isFocused
                ? "0 0 0 1px #8338ec"
                : provided.boxShadow,
              "&:hover": {
                borderColor: state.isFocused ? "#8338ec" : provided.borderColor,
              },
            }),
          }}
        />
      )}
    />
    {errors[name] && (
      <p className="text-red-500 text-sm">{errors[name].message}</p>
    )}
  </div>
);

export default FormSelect;
