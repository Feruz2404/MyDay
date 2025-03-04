import { Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} centered>
      <div className="flex flex-col items-center text-center">
        <CheckCircleOutlined className="text-blue-500 text-6xl" />
        <h2 className="mt-4 text-lg font-semibold">New lead has been added</h2>
        <p className="text-gray-500">
          A new lead has been successfully added to the system
        </p>
      </div>
    </Modal>
  );
}
