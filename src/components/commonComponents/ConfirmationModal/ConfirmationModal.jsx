import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import CustomButton from "../Button/Button";

export const ConfirmationModal = ({
  message = "Are you sure you want to proceed?",
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = "Confirm",
  cancelText = "Cancel",
  title = "Confirmation",
  placement = "top-center",
  isModalOpen = false,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onOpenChange={onOpenChange}
        placement={placement}
        onClose={() => {
          onCancel();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3>{title}</h3>
              </ModalHeader>
              <ModalBody>
                <p>{message}</p>
              </ModalBody>
              <ModalFooter>
                <CustomButton
                  className=" text-primaryBtn"
                  variant="bordered"
                  onClick={() => {
                    onCancel();
                    onClose();
                  }}
                  color="default"
                >
                  {cancelText}
                </CustomButton>
                <CustomButton
                  className=" text-white bg-primaryBtn"
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  {confirmText}
                </CustomButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
