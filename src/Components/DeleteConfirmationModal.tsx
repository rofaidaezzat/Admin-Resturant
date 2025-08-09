import { FiTrash2, FiAlertTriangle } from "react-icons/fi";
import { Button } from "./UI/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

const DeleteConfirmationModal = ({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-all duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle size={32} className="text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">
          Delete Item
        </h2>

        {/* Message */}
        <p className="text-slate-600 text-center mb-6 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-800">"{itemName}"</span>?
          <br />
          <span className="text-sm text-red-600 mt-2 block">
            This action cannot be undone.
          </span>
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 border-slate-300 hover:bg-slate-50 text-slate-700 py-2.5"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2 justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <FiTrash2 size={16} />
                Delete
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
