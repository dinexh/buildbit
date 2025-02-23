import Image from "next/image";
import logo from "./aessts/hero.gif";

export default function Home() {
  return (
    <div className="home-component">
      <Image src={logo} alt="logo" width={200} height={200} priority />
      <h1>AI Powered Project Planner</h1>
      <p>
        Plan, track, and collaborate on your projects with ease using our
        AI-powered project planner.
      </p>
      <button>Coming Soon!</button>
    </div>
  );
}
