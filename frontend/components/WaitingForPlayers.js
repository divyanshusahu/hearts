import clsx from "clsx";

function WaitingForPlayers(props) {
  return (
    <>
      <div className="bg-white py-2 w-64">
        <h1 className="text-center text-2xl font-bold mb-2">
          Code: {props.room_code}
        </h1>
        <h3 className="text-lg text-center">Wait for players to join</h3>
        <img src="/loading.gif" alt="Loading" className="mx-auto" />
        <h4 className="text-md font-bold">
          Players Joined: {props.players.length}
        </h4>
        {props.players.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <button
          className={clsx(
            "w-full bg-blue-500 px-4 py-2 font-bold text-white mt-4 focus:outline-none",
            {
              "opacity-50 cursor-not-allowed pointer-events-none":
                props.players.length < 4,
            }
          )}
          onClick={props.start_game}
        >
          Start
        </button>
      </div>
    </>
  );
}

export default WaitingForPlayers;
