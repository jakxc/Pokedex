import "./styles.css"

const Modal = ({content, text}) => {
    return (
        <div className="modal | position-fixed top-0 start-0 z-50 vw-100 vh-100 d-flex justify-content-center align-items-center">
            <div className="py-2 px-5 rounded-lg d-flex flex-column align-items-center">
                {content}
                <div className="text-xl font-medium text-center">
                    {text}
                </div>
            </div>
        </div>
    )
}

export default Modal;