import { CardSetVague } from "../@types/cards";
import Link from "next/link";

export default function SetList(props: { sets: CardSetVague[] }) {
  return (
    <div className="rounded-lg overflow-scroll mb-4 w-80 sm:w-96">
      {props.sets.map((set) => (
        <div className="p-4 text-gray-800 bg-white text-4xl">
          <Link href={`/set/${set.id}`}>
            <a className="text-2xl flex justify-between">
              <span>{set.name}</span> <span>{set.length}</span>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}
