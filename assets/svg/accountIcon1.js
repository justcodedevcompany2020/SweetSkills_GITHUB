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
                d="M12.01 19.093a6.711 6.711 0 01-4.765-1.973 6.744 6.744 0 010-9.528 6.744 6.744 0 019.528 0 6.744 6.744 0 010 9.528 6.711 6.711 0 01-4.764 1.973zm0-12.03c-1.358 0-2.715.52-3.745 1.55a5.31 5.31 0 000 7.487 5.3 5.3 0 007.488 0 5.31 5.31 0 000-7.488 5.284 5.284 0 00-3.744-1.55z"
                fill="#1C1D1E"
            />
            <Path
                d="M8.4 22a.883.883 0 01-.27-.048c-2.165-.866-3.917-2.397-5.09-4.418a10.201 10.201 0 01-1.29-6.477.725.725 0 01.808-.626.725.725 0 01.625.809 8.83 8.83 0 001.107 5.563 8.762 8.762 0 004.37 3.792.735.735 0 01.404.943A.712.712 0 018.4 22zM6.09 5.484a.724.724 0 01-.568-.279.71.71 0 01.125-1.01A10.244 10.244 0 0112.01 2c2.272 0 4.437.731 6.256 2.117a.72.72 0 11-.875 1.146 8.77 8.77 0 00-5.38-1.82A8.829 8.829 0 006.532 5.33a.708.708 0 01-.443.154zM15.619 22a.73.73 0 01-.674-.452.73.73 0 01.404-.944 8.809 8.809 0 004.37-3.792 8.705 8.705 0 001.107-5.563.725.725 0 01.625-.808.73.73 0 01.809.625 10.276 10.276 0 01-1.29 6.478 10.243 10.243 0 01-5.091 4.418c-.077.019-.164.038-.26.038z"
                fill="#1C1D1E"
            />
        </Svg>
    )
}

export default SvgComponent