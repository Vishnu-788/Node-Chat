import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-screen p-2">
      <Navbar />

      <div className="flex flex-row flex-1 p-2">
        <div className="dash-board w-2/6 bg-slate-800 p-4">
          <h1 className="text-base text-white">This is the dashboard</h1>
        </div>

        <div className="message w-4/6 bg-slate-700 p-4">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
