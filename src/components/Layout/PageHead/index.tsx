import Head from "next/head"

type PageHeadProps = {
  title: string;
  description: string;
}

const PageHead = ({ title, description }: PageHeadProps) => (
  <Head>
    <title>{title}{title && " | "}Uniplanner</title>
    <meta name="description" content={description} />
  </Head>
)

export default PageHead