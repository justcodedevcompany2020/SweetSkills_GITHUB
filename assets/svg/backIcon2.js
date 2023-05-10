import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            width={11}
            height={16}
            viewBox="0 0 11 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M.891 8c.01.316.127.586.37.83l7.017 6.863c.208.199.451.307.749.307.604 0 1.073-.469 1.073-1.073 0-.289-.117-.56-.325-.767L3.462 8l6.313-6.16c.208-.208.325-.47.325-.767C10.1.47 9.631 0 9.027 0c-.289 0-.541.108-.749.307L1.261 7.179c-.252.235-.37.505-.37.821z"
                fill="#1C1D1E"
            />
        </Svg>
    )
}

export default SvgComponent
