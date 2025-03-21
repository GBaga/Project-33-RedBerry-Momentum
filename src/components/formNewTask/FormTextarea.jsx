const FormTextarea = ({
  label,
  register,
  name,
  rules,
  onFocus,
  watch,
  isFocused,
}) => {
  const value = watch(name) || ""; // Ensure value is a string

  return (
    <div>
      <label className="block text-[#343A40] font-normal text-[16px] leading-[100%] tracking-[0%] mb-1.5">
        {label}
      </label>
      <textarea
        {...register(name, {
          ...rules,
          ref: (el) => el && el.focus && el.focus(),
        })}
        onFocus={onFocus}
        className="max-w-[550px] w-full min-h-[133px] rounded-[5px] border focus:border-[2px] border-[#DEE2E6] bg-[#FFFFFF] p-[14px] gap-[10px] focus:border-[#8338ec] focus:outline-none"
      />
      {isFocused && value && (
        <>
          <p
            className={`text-sm ${
              value.split(" ").filter(Boolean).length < 4
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            მინიმუმ 4 სიტყვა
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

export default FormTextarea;
