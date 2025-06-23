interface CustomButtonProps{
  label:string;
  className?:string;
  onClick?:()=>void;
}
const CustomButton: React.FC<CustomButtonProps> =({label,onClick,className})=>{
  return(
    <div onClick={onClick}
    className={` py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition text-center cursor-pointer ${className} `}>
      {label}
      </div>
  )
}
export default CustomButton;