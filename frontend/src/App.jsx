import Header from "./components/Header"
import Hero from "./components/Hero"

export default function App() {
    return (
        <>
            <div className="bg-customGray pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header/>
                <Hero />

                {/* <div className="p-4 rounded">
                    <h1 className="text-h1 text-gradient">Testing With Chef Jeff</h1>
                    <h4 className="text-h4">Secondary Color</h4>
                </div>
                <h2 className="text-h2 text-primary-500 mt-4 text-gradient">Header with Primary Color</h2>
                <button className="bg-accent-500 text-white p-2 rounded mt-4">Button with Accent Color</button>
                <p className="text-text-500 mt-4">This is a paragraph with the text color.</p> */}
            </div>
        </>
    );
}