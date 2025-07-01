interface CustomButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  className,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition text-center cursor-pointer w-full ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;