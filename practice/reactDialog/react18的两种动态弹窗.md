```tsx
import { Modal, ModalProps } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";

// const MyForm = forwardRef((props, ref) => {
//   useImperativeHandle(ref, () => ({
//     // 获取表单数据
//     getValue: () => ({
//       name: '张三',
//       age: 18
//     })
//   }))
//   return (
//     <div>MyForm</div>
//   )
// })

export const useAsyncModalHook = () => {
  const contentRef = useRef<{ getValue: () => FixAny }>();
  let div: HTMLDivElement | null = null;
  const openModal = ({
    content,
    ...modalProps
  }: ModalProps & { content: React.ReactElement }) => {
    div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);
    return new Promise((resolve, reject) => {
      const handleOk = () => {
        const data = contentRef.current?.getValue();
        resolve(data);
        handleClose();
      };
      const handleClose = () => {
        root.render(<ModalNode isOpen={false} />);
      };
      const handleAfterClose = () => {
        reject(false);
        setTimeout(() => {
          root.unmount();
          div?.remove();
          div = null;
        }, 200);
      };

      const ModalNode = ({ isOpen }: { isOpen: boolean }) => {
        return (
          <Modal
            {...modalProps}
            onOk={handleOk}
            onCancel={handleClose}
            afterClose={handleAfterClose}
            open={isOpen}
          >
            {React.cloneElement(content, { ref: contentRef })}
          </Modal>
        );
      };
      root.render(<ModalNode isOpen={true} />);
    });
  };
  return { openModal };
};

export const useModalHook = () => {
  const contentRef = useRef<{ getValue: () => FixAny }>();
  const modalRef = useRef<{
    updateModal: (props: ModalProps) => void;
    closeModal: () => void;
    openModal: () => void;
  }>();
  let div: HTMLDivElement | null = null;
  const openModal = ({
    content,
    ...modalProps
  }: ModalProps & { content: React.ReactElement }) => {
    div = document.createElement("div");
    document.body.appendChild(div);
    const root = createRoot(div);
    const handleOk = async () => {
      const data = contentRef.current?.getValue();
      await modalProps.onOk?.(data);
      handleClose();
    };
    const handleClose = () => {
      modalRef.current?.closeModal();
    };
    const handleUpdateModal = (updateProps: ModalProps) => {
      modalRef.current?.updateModal({...modalProps, ...updateProps});
    };
    const handleAfterClose = () => {
      setTimeout(() => {
        root.unmount();
        div?.remove();
        div = null;
      }, 200);
    };

    const ModalNode = forwardRef((_props, ref) => {
      const [modalNodeProps, setModalNodeProps] = useState(modalProps);
      const [isOpen, setOpen] = useState(true);

      useImperativeHandle(ref, () => ({
        updateModal: (props: ModalProps) => {
          setModalNodeProps(props);
        },
        closeModal: () => {
          setOpen(false);
        },
        openModal: () => {
          setOpen(true);
        },
      }));
      return (
        <Modal
          {...modalNodeProps}
          open={isOpen}
          onOk={handleOk}
          onCancel={handleClose}
          afterClose={handleAfterClose}
        >
          {content && React.cloneElement(content, { ref: contentRef, modalRef: modalInstance })}
        </Modal>
      );
    });
    modalInstance.updateModal = handleUpdateModal
    modalInstance.closeModal = handleClose
    root.render(<ModalNode ref={modalRef} />);
  };
  const modalInstance = {
    openModal,
    updateModal: (props: ModalProps) => { console.log(props) },
    closeModal: () => {},
  };
  return modalInstance;
};


```