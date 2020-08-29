import { useRouter } from "next/router";

import Modal from "react-modal";

import WaitingForPlayers from "../../components/WaitingForPlayers";

import feathers_client from "../../utils/feathers_client";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    padding: "8px 32px 8px 32px",
  },
  overlay: {
    backgroundColor: "rgba(32, 32, 32, 0.5)",
  },
};

Modal.setAppElement("#custom_root");

function Room(props) {
  const router = useRouter();

  if (!props.success) {
    return (
      <div id="custom_root">
        <button onClick={() => router.replace("/")}>GO BACK</button>
      </div>
    );
  }

  const [players, setPlayers] = React.useState(props.room.players);
  const [roomStatus, setRoomStatus] = React.useState(props.room.open);

  const start_game = () => {
    feathers_client
      .service("rooms")
      .patch(props.room.room_code, { open: false })
      .then((data) => {
        if (data.success) {
          setRoomStatus(false);
        }
      });
  };

  React.useEffect(() => {
    feathers_client.service("rooms").on("patched", (data) => {
      if (data.success) {
        setPlayers(data.room.players);
        setRoomStatus(data.room.open);
        if (data.room.players.length === 5) {
          setRoomStatus(false);
        }
      }
    });
  }, []);

  let display = roomStatus ? null : "Loading Game...";

  return (
    <>
      <div className="w-screen h-screen" id="custom_root">
        {display}
      </div>
      <Modal isOpen={roomStatus} style={customStyles}>
        <WaitingForPlayers
          players={players}
          room_code={props.room.room_code}
          start_game={start_game}
        />
      </Modal>
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
  const data = await feathers_client.service("rooms").get(context.params.id);
  return { props: data };
}

export default Room;
