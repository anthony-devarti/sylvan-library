import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const Loader = ({fullscreen}) => {
    
    let size = ''
    
    if (fullscreen) size = 'full-screen-loader'
    return (
        <div className="loader">
            <div className={size}>
            <FontAwesomeIcon icon={faCircleNotch} spin size="8x"/>
            </div>
        </div>
    )
}

export default Loader