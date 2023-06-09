import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M22 11.386V4.215C22 2.633 21.302 2 19.567 2H15.16c-1.735 0-2.433.633-2.433 2.215v7.17c0 1.582.698 2.215 2.433 2.215h4.407c1.735 0 2.433-.633 2.433-2.214zM11.273 12.614v7.171c0 1.582-.698 2.215-2.433 2.215H4.433C2.698 22 2 21.367 2 19.785v-7.17c0-1.582.698-2.215 2.433-2.215H8.84c1.735 0 2.433.633 2.433 2.214zM22 19.9v-2.8c0-1.5-.698-2.1-2.433-2.1H15.16c-1.735 0-2.433.6-2.433 2.1v2.8c0 1.5.698 2.1 2.433 2.1h4.407C21.302 22 22 21.4 22 19.9zM11.273 6.9V4.1c0-1.5-.698-2.1-2.433-2.1H4.433C2.698 2 2 2.6 2 4.1v2.8C2 8.4 2.698 9 4.433 9H8.84c1.735 0 2.433-.6 2.433-2.1z"
                fill="#CCDD53"
            />
        </Svg>
    )
}

export default SvgComponent
