import React from "react";
import PLAYER_O from "../assets/images/player-o.png";
import PLAYER_X from "../assets/images/player-x.png";

function Tile({ value, className, onClick }) {
	return (
		<div onClick={onClick} className={`tile ${className}`}>
			<img src={value === "X" ? PLAYER_X : value === "O" ? PLAYER_O : null} />
		</div>
	);
}

export default Tile;
