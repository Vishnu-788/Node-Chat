import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-slate-900 p-2">
      <div className="dash-board w-2/6 bg-slate-800 p-4">
        <h1 className="text-base text-white">This is the dash board</h1>
      </div>

      <div className="message w-4/6 bg-slate-700 p-4">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
