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
                d="M10.383 16.877a6.363 6.363 0 003.71-1.195l3.935 3.934a.947.947 0 00.681.274c.54 0 .921-.415.921-.946a.9.9 0 00-.265-.664l-3.91-3.918a6.358 6.358 0 001.312-3.868c0-3.512-2.872-6.384-6.384-6.384C6.88 4.11 4 6.974 4 10.494c0 3.51 2.872 6.383 6.383 6.383zm0-1.378c-2.739 0-5.005-2.266-5.005-5.005 0-2.74 2.266-5.006 5.005-5.006 2.74 0 5.006 2.266 5.006 5.006 0 2.739-2.266 5.005-5.006 5.005z"
                fill="#6B7683"
            />
        </Svg>
    )
}

export default SvgComponent
