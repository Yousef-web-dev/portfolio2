import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";
const f = Bricolage_Grotesque({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-main" });
export const metadata = { title: "Yousef Mohamed — Frontend Developer" };
export default function RootLayout({ children }) {
  return <html lang="en" className={f.variable}><body>{children}</body></html>;
}