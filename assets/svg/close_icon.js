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
                d="M5.317 17.069c-.42.42-.428 1.165.009 1.602.445.437 1.19.429 1.602.017l5.073-5.073 5.065 5.065c.428.428 1.165.428 1.602-.009.437-.445.437-1.174.009-1.602l-5.065-5.065 5.065-5.073a1.143 1.143 0 00-.01-1.602c-.436-.437-1.173-.437-1.602-.009l-5.064 5.065L6.928 5.32c-.411-.42-1.165-.437-1.602.009-.437.437-.429 1.191-.009 1.602l5.065 5.073-5.065 5.065z"
                fill="#6B7683"
            />
        </Svg>
    )
}

export default SvgComponent
