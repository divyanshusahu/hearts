import { useRouter } from "next/router";

import clsx from "clsx";
import cogoToast from "cogo-toast";

import feathers_client from "../utils/feathers_client";

function JoinRoom(props) {
  const router = useRouter();

  const [roomCode, setRoomCode] = React.useState("");

  const join_room = () => {
    feathers_client
      .service("rooms")
      .patch(roomCode, { player_name: props.user })
      .then((r) => {
        if (!r.success) {
          cogoToast.error(r.message);
          return;
        }
        router.push("/room/[id]", `/room/${r.room.id}`);
      });
  };

  return (
    <>
      <div className="w-64">
        <h1 className="text-md font-bold text-center">Join a Room</h1>
        <input
          id="input-join-room"
          maxLength="4"
          className="block w-full my-4 mx-auto focus:outline-none"
          value={roomCode}
          onChange={(event) => setRoomCode(event.target.value)}
        />
        <button
          className={clsx(
            "w-full bg-blue-500 px-4 py-2 font-bold text-white mt-4 focus:outline-none",
            roomCode.length !== 4 &&
              "opacity-50 cursor-not-allowed pointer-events-none"
          )}
          onClick={join_room}
        >
          Let's Play
        </button>
      </div>
      <style jsx>
        {`
          #input-join-room {
            width: 6ch;
            background: repeating-linear-gradient(
                90deg,
                dimgrey 0,
                dimgrey 1ch,
                transparent 0,
                transparent 1.5ch
              )
              0 100%/100% 2px no-repeat;
            letter-spacing: 0.5ch;
            font: 4ch droid sans mono, consolas, monospace;
          }
        `}
      </style>
    </>
  );
}

export default JoinRoom;
