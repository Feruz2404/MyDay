import { Modal, Button } from "antd";
import { useSuccessModal } from "./useSuccessModal";
import SuccessModal from "./SuccessModal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void; // ✅ onConfirm propsini qo'shish
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const {
    isOpen: successOpen,
    openModal: openSuccess,
    closeModal: closeSuccess,
  } = useSuccessModal();

  const handleConfirm = () => {
    onConfirm(); // ✅ NewLeadModal'dan kelgan confirm funksiyasini chaqirish
    openSuccess(); // ✅ SuccessModal'ni ochish
    onClose(); // ✅ ConfirmModal'ni yopish
  };

  return (
    <>
      <Modal
        title="Confirm Action"
        open={isOpen}
        onCancel={onClose}
        footer={null}
        centered
      >
        <p className="text-gray-500">Are you sure you want to proceed?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={handleConfirm}>
            Yes, Confirm
          </Button>
        </div>
      </Modal>

      {/* ✅ SuccessModal faqat Yes bosilganda ko'rinadi */}
      <SuccessModal isOpen={successOpen} onClose={closeSuccess} />
    </>
  );
};

export default ConfirmModal;
