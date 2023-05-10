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
                d="M12.112 13.423h-.158c-2.112-.065-3.694-1.711-3.694-3.74a3.756 3.756 0 013.75-3.748 3.756 3.756 0 013.748 3.749 3.734 3.734 0 01-3.618 3.74h-.028zM12 7.321a2.356 2.356 0 00-2.353 2.353c0 1.275.995 2.307 2.26 2.354.028-.01.12-.01.214 0a2.358 2.358 0 002.232-2.354A2.356 2.356 0 0012 7.321zM12 22a9.963 9.963 0 01-6.744-2.623.702.702 0 01-.224-.586c.121-1.107.81-2.14 1.954-2.902 2.772-1.842 7.265-1.842 10.028 0 1.144.772 1.832 1.795 1.953 2.902a.666.666 0 01-.223.586A9.963 9.963 0 0112 22zm-5.507-3.395a8.566 8.566 0 005.507 2 8.566 8.566 0 005.507-2c-.168-.568-.614-1.117-1.275-1.563-2.288-1.526-6.167-1.526-8.474 0-.66.446-1.098.995-1.265 1.563z"
                fill="#6B7683"
            />
            <Path
                d="M12 22C6.484 22 2 17.516 2 12S6.484 2 12 2s10 4.484 10 10-4.484 10-10 10zm0-18.605c-4.744 0-8.605 3.86-8.605 8.605 0 4.744 3.86 8.605 8.605 8.605 4.744 0 8.605-3.86 8.605-8.605 0-4.744-3.86-8.605-8.605-8.605z"
                fill="#6B7683"
            />
        </Svg>
    )
}

export default SvgComponent
