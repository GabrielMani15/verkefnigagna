export default function Button(props) {
  return (
    <button
      {...props}
      className={`rounded-[8px] text-[0.5rem] flex justify-center items-center gap-x-1 w-[7.125rem] h-[1.813rem] text-white bg-gradient-to-l from-[#121212] to-[#0C0C0C] ${
        props.className || ""
      }`}
    >
      {props.children}
    </button>
  );
}
