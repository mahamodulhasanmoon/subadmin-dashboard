import { useState } from "react";


export default function useModal() {
    const [showModal, setShowModal] = useState(true);

  return{
    showModal,
    setShowModal
  }
}
