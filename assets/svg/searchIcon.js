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
                d="M10.76 18.372c1.684 0 3.238-.54 4.51-1.44l4.783 4.738c.222.22.514.33.827.33.656 0 1.12-.5 1.12-1.14 0-.3-.1-.59-.323-.799l-4.752-4.717a7.61 7.61 0 001.594-4.658c0-4.228-3.491-7.686-7.76-7.686C6.501 3 3 6.448 3 10.686c0 4.228 3.491 7.686 7.76 7.686zm0-1.66c-3.33 0-6.085-2.728-6.085-6.026 0-3.298 2.755-6.027 6.084-6.027 3.33 0 6.085 2.729 6.085 6.027s-2.755 6.027-6.085 6.027z"
                fill="#1C1D1E"
            />
        </Svg>
    )
}

export default SvgComponent
