import { Button } from "@/components/Elements/Button"
import PageHead from "@/components/Layout/PageHead"
import { useRouter } from "next/router"


const Page = () => {
  const title = "top"
  const description = "uniplanner トップページ"

  const router = useRouter()

  return (
    <>
      <PageHead title={title} description={description} />
      <div className="text-center w-full h-screen flex flex-col items-center justify-center gap-4">
        <p className='text-dark font-bold'>時間割ベースの日程調整アプリ</p>
        <p className="text-dark text-9xl mb-3">UniPlanner</p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => { router.push('/new-event') }}
        >
          新しいイベントを作成
        </Button>
      </div>
    </>
  )
}

export default Page;