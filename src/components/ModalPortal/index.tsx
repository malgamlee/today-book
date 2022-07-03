import { createPortal } from 'react-dom'

interface Props {
  children: React.ReactNode
}

const ModalPortal = ({ children }: Props) => {
  const modalRoot = document.getElementById('modal-root')
  if (modalRoot === null) return null
  return createPortal(children, modalRoot)
}

export default ModalPortal
