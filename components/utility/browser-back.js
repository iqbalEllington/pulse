import { useRouter } from 'next/router'

export default function Browserback() {
  const router = useRouter()

  return (<button onClick={() => router.back()}
    className="back_btn">
    <i className="fa-solid fa-angle-left" /> Back
  </button>
  )
}