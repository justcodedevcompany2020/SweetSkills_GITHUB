import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M16.848 12.704a.98.98 0 00-.309-.693l-5.861-5.733a.87.87 0 00-.625-.257.884.884 0 00-.897.897c0 .241.098.467.271.64l5.274 5.146-5.274 5.145a.888.888 0 00-.27.64c0 .505.391.897.896.897.24 0 .452-.09.625-.256l5.861-5.74a.897.897 0 00.309-.686z"
                fill="#D3D6DA"
            />
        </Svg>
    )
}

export default SvgComponent
