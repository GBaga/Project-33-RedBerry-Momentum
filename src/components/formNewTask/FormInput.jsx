const FormInput = ({
  label,
  register,
  name,
  rules,
  errors,
  type = "text",
  onFocus,
  watch,
  isFocused,
}) => {
  const value = watch(name) || "";

  return (
    <div>
      <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
        {label}
      </label>
      <input
        {...register(name, {
          ...rules,
          ref: (el) => el && el.focus && el.focus(),
        })}
        onFocus={onFocus}
        type={type}
        className="max-w-[550px] w-full min-h-[45px] rounded-[5px] border focus:border-[2px] border-[#DEE2E6] bg-[#FFFFFF] px-3 py-1.5 gap-[10px] focus:border-blue-400 focus:outline-none"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
      {isFocused && (
        <>
          <p
            className={`text-sm ${
              value.length < 3 ? "text-red-500" : "text-green-500"
            }`}
          >
            მინიმუმ 3 სიმბოლო
          </p>
          <p
            className={`text-sm ${
              value.length > 255 ? "text-red-500" : "text-green-500"
            }`}
          >
            მაქსიმუმ 255 სიმბოლო
          </p>
        </>
      )}
    </div>
  );
};

export default FormInput;
