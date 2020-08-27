import clsx from "clsx";

const create_room = () => {
  console.log("Room");
};

function CreateRoom() {
  const [playerName, setPlayerName] = React.useState("");

  return (
    <div className="w-64">
      <h1 className="text-md font-bold text-center">Create a Room</h1>
      <input
        type="text"
        placeholder="Player Name"
        className="w-full focus:outline-none my-4 border rounded-lg px-4 py-2"
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
      />
      <button
        className={clsx(
          "w-full bg-blue-500 px-4 py-2 font-bold text-white mt-4 focus:outline-none",
          playerName.length < 3 && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
        onClick={create_room}
      >
        Let's Play
      </button>
    </div>
  );
}

export default CreateRoom;
