export default function Button({ text }) {
  return (
    <button className="py-2 hover:bg-opacity-90 transition duration-500 ease-out px-10 border-[1px] text-white rounded-[6px] border-solid border-black bg-[#2B187D]">
      {text}
    </button>
  );
}
