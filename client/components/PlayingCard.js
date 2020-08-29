import { IconContext } from "react-icons";
import { ImClubs, ImDiamonds, ImHeart, ImSpades } from "react-icons/im";

function PlayingCard(props) {
  const color =
    props.card.suit === "clubs" || props.card.suit === "spades"
      ? "#000000"
      : "#ff0000";
  let suit;
  if (props.card.suit === "clubs") {
    suit = <ImClubs />;
  } else if (props.card.suit === "diamonds") {
    suit = <ImDiamonds />;
  } else if (props.card.suit === "hearts") {
    suit = <ImHeart />;
  } else if (props.card.suit === "spades") {
    suit = <ImSpades />;
  }

  return (
    <>
      <div className="playing-card-root p-2 flex flex-col border font-bold shadow-lg rounded-lg bg-white">
        <div className="h-16 w-8">
          <p className="text-center text-2xl" style={{ color: color }}>
            {props.card.number}
          </p>
          <IconContext.Provider
            value={{ color: color, size: "24px", className: "mx-auto" }}
          >
            {suit}
          </IconContext.Provider>
        </div>
        <div className="flex-grow flex justify-center items-center">
          <IconContext.Provider value={{ color: color, size: "80px" }}>
            {suit}
          </IconContext.Provider>
        </div>
        <div className="h-16 origin-center transform rotate-180">
          <div className="w-8">
            <p className="text-center text-2xl" style={{ color: color }}>
              {props.card.number}
            </p>
            <IconContext.Provider
              value={{ color: color, size: "24px", className: "mx-auto" }}
            >
              {suit}
            </IconContext.Provider>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .playing-card-root {
            height: 256px;
            width: 160px;
          }
        `}
      </style>
    </>
  );
}

export default PlayingCard;
