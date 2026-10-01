import Navbar from "@/components/Navbar"; // existing Navbar, untouched
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
export default function Page() {
  return (<>
    <Cursor /><Navbar />
    <main><Hero /><About /><Skills /><Projects /><Certificates /><Contact /></main>
  </>);
}
