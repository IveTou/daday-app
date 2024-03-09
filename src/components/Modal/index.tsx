'use client'
import { createPortal } from "react-dom"

export default function Modal({
  children,
  visible,
  close,
  show
}: Readonly<{
  children: React.ReactNode,
  visible: boolean,
  close: () => void,
  show?: () => void
}>) {

  return (
    visible && createPortal(
      <dialog open={visible}>
        <button onClick={close}>Close</button>
        {children}
      </dialog>,
      document.body
    )
  )
}
