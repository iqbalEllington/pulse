import { useRouter } from 'next/router'
import {IoIosArrowBack, IoMdArrowBack} from "react-icons/io"

export default function backButton() {
  const router = useRouter()

  return (
    <button type="button" className='backButton-innerpage' onClick={() => router.back()}>
    <IoIosArrowBack/> 
    </button>
  )
}