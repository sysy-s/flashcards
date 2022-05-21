import { useRouter } from "next/router";
import RoundBtn from "./RoundButton";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center absolute top-0 left-0 p-2">
      <RoundBtn content="Home" handleClick={() => router.push("/")} />
    </div>
  );
}
