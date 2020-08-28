import { useRouter } from "next/router";

import feathers_client from "../../utils/feathers_client";

function Room(props) {
  const router = useRouter();

  if (!props.success) {
    return <button onClick={() => router.replace("/")}>GO BACK</button>;
  }

  const [players, setPlayers] = React.useState(props.room.players);

  React.useEffect(() => {
    feathers_client.service("rooms").on("patched", (data) => {
      if (data.success) {
        setPlayers(data.room.players);
      }
    });
  }, []);

  return (
    <>
      <div className="w-screen h-screen" id="custom_root">
        <h1>Room Code: {props.room.room_code}</h1>
        <h1>Player's Joined: {players.length}</h1>
        {players.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <style jsx>
        {`
          #custom_root {
            background-color: #52c41a;
          }
        `}
      </style>
    </>
  );
}

export async function getServerSideProps(context) {
  const data = await feathers_client
    .service("rooms")
    .get(context.params.id);
  return { props: data };
}

export default Room;
