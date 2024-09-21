import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export const PopUpModal = ({
  children = () => {},
  title = () => {},
  placement = "top-center",
  size = "lg",
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      {title(onOpen)}
      <Modal
        backdrop={"opaque"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={placement}
        size={size}
        scrollBehavior="inside"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) =>
            children({ onClose, ModalHeader, ModalBody, ModalFooter })
          }
        </ModalContent>
      </Modal>
    </div>
  );
};
