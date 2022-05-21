export default function RoundBtn(props: { content: string, handleClick: () => void }) {
  return (
    <button
    onClick={() => props.handleClick()}
    className="w-16 h-16 md:w-24 md:h-24 rounded-full shadow-md sm:text-md md:text-2xl text-purple-500 bg-white transition-all ease-in-out hover:scale-95 active:scale-95">
      {props.content}
    </button>
  );
}
