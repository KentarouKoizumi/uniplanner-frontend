import { AppProps } from "next/app";
import { Noto_Sans_JP } from "next/font/google";
import "@/shared/styles/globals.css";
import { GlobalLayout } from "@/components/Layout/GlobalLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const notojp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={notojp.className}>
      <QueryClientProvider client={queryClient}>
        <GlobalLayout>
          <Component {...pageProps} />
        </GlobalLayout>
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
