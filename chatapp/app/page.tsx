
import Image from "next/image";
import Filter from './components/Filter';
import Friend from "./components/Friend";
// import Model from './components/Model';



export default function Home() {
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  );
}
