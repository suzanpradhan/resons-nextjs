import React from 'react';

interface CustomPopupProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const CustomPopup: React.FC<CustomPopupProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-lg shadow-xl z-50 overflow-hidden">
        <div className="modal-close absolute top-0 right-0 cursor-pointer mt-4 mr-4 text-gray-500 text-2xl z-50">
          <button onClick={onClose} className="hover:text-black">
            &times;
          </button>
        </div>
        <div className="modal-header p-6 bg-success">
            <h2 className="text-xl font-semibold">Confirmation</h2>
            <hr></hr>
        </div>
        <div className="modal-content p-6">
          <p className="text-2xl text-gray-800">{message}</p>
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
