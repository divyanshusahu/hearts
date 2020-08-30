import Head from "next/head";

import Modal from "react-modal";

import Login from "../components/Login";
import CreateRoom from "../components/CreateRoom";
import JoinRoom from "../components/JoinRoom";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
  overlay: {
    backgroundColor: "rgba(32, 32, 32, 0.25)",
  },
};

Modal.setAppElement("body");

function Index() {
  const [modalContent, setModalContent] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const toggleModal = (type) => {
    if (type === "create") {
      setModalContent(<CreateRoom />);
    } else if (type === "join") {
      setModalContent(<JoinRoom />);
    }
    setShowModal((s) => !s);
  };

  return (
    <>
      <Head>
        <title>Hearts</title>
      </Head>
      <div className="h-screen w-screen" id="custom_root">
        <div className="container mx-auto p-4">
          <div>
            <picture>
              <source srcSet="/banner.webp" type="image/webp" />
              <source srcSet="/banner.png" type="image/png" />
              <img
                src="/banner.png"
                alt="Hearts Banner Image"
                className="mx-auto"
              />
            </picture>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-16">
            <div>
              <button
                className="button px-8 py-4 text-2xl font-bold text-white rounded-lg w-full md:w-auto shadow-md focus:outline-none md:float-right"
                onClick={() => toggleModal("create")}
              >
                Create Room
              </button>
            </div>
            <div>
              <button
                className="button px-8 py-4 text-2xl font-bold text-white rounded-lg w-full md:w-auto shadow-md focus:outline-none"
                onClick={() => toggleModal("join")}
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={true} style={customStyles}>
        <Login />
      </Modal>
      <Modal
        isOpen={showModal}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        onRequestClose={toggleModal}
      >
        {modalContent}
      </Modal>
      <style jsx>
        {`
          #custom_root {
            background-color: #52c41a;
          }
          .button {
            background-color: #13c2c2;
          }
        `}
      </style>
    </>
  );
}

export default Index;
