import './Modal.css';
import { useModal } from "@/app/context/ModalContext";

const Modal = ({ children }) => {
  const { showModal, setShowModal } = useModal();

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={() => setShowModal(false)}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;