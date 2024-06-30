/**
 * App Component
 * 
 * This is the main application component that sets up the overall structure of the app.
 * It includes the Header and Hero components and applies some global styling to ensure
 * a consistent appearance.
 */

import Header from "./components/Header"
import Hero from "./components/Hero"

export default function App() {
    return (
        <>
            <div className="bg-customGray pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
                <Header/>
                <Hero />
            </div>
        </>
    );
}