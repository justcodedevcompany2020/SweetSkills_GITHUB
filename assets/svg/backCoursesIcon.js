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
                d="M6.891 12c.01.316.127.586.37.83l7.017 6.863c.207.199.451.307.749.307.604 0 1.073-.469 1.073-1.073 0-.289-.117-.56-.325-.767L9.462 12l6.313-6.16c.208-.208.325-.47.325-.767C16.1 4.47 15.631 4 15.027 4c-.289 0-.541.108-.749.307l-7.017 6.872c-.252.235-.37.505-.37.821z"
                fill="#1C1D1E"
            />
        </Svg>
    )
}

export default SvgComponent
