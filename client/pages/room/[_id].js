import { useRouter } from "next/router";

import Modal from "react-modal";
import isEmpty from "is-empty";
import jwtDecode from "jwt-decode";

import WaitingForPlayers from "../../components/WaitingForPlayers";
import PlayingCard from "../../components/PlayingCard";

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

Modal.setAppElement("body");
const isBrowser = typeof window !== "undefined";

function Room(props) {
  const router = useRouter();

  if (!props.success) {
    return (
      <div id="custom_root">
        <button onClick={() => router.replace("/")}>GO BACK</button>
      </div>
    );
  }

  if (isBrowser) {
    if (
      isEmpty(localStorage.heartsLoginToken) ||
      !props.players.includes(jwtDecode(localStorage.heartsLoginToken).username)
    ) {
      return (
        <div id="custom_root">
          <button onClick={() => router.replace("/")}>GO BACK</button>
        </div>
      );
    }
  }

  const user = isBrowser
    ? jwtDecode(localStorage.heartsLoginToken).username
    : null;

  const [players, setPlayers] = React.useState(props.players);
  const [roomStatus, setRoomStatus] = React.useState(props.open);
  const [myCards, setMyCards] = React.useState([]);

  const start_game = () => {
    feathers_client
      .service("rooms")
      .patch(props.code, { open: false })
      .then((data) => {
        if (data.success) {
          setRoomStatus(false);
        }
      });
    feathers_client.service("plays").create({ _roomid: router.query._id });
  };

  React.useEffect(() => {
    feathers_client.service("rooms").on("patched", (data) => {
      if (data.success) {
        setPlayers(data.players);
        setRoomStatus(data.open);
        if (data.players.length === 5) {
          setRoomStatus(false);
        }
      }
    });
    feathers_client.service("plays").on("created", (data) => {
      setMyCards(data.decks[user]);
    });
  }, []);

  let display = roomStatus ? null : myCards.length ? (
    <PlayingCard card={myCards[0]} />
  ) : null;

  return (
    <>
      <div className="w-screen h-screen" id="custom_root">
        <div className="container mx-auto">
          <p className="text-right text-white font-bold">{user}</p>
          {display}
        </div>
      </div>
      <Modal isOpen={roomStatus} style={customStyles}>
        <WaitingForPlayers
          players={players}
          room_code={props.code}
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
  const data = await feathers_client
    .service("rooms")
    .get(context.params["_id"]);
  return { props: data };
}

export default Room;
