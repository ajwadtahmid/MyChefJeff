import brand from '../assets/brand.svg';

const Header = () => {
    return (
        <div
            className="bg-customGray fixed top-0 w-full md:z-50 md:w-auto lg:bg-n-8/90 lg:backdrop-blue-sm sm:">
            <div
                className="flex items-center justify-between lg:justify-start px-4 sm:px-5 lg:px-7.5 xl:px-10 py-2 sm:py-4">
                <a className="block w-40 sm:w-[20rem] xl:mr-8 p-2 sm:p-4 overflow-visible">
                    <img src={brand} className="floating-3d" alt="Brand logo"/>
                </a>
            </div>
        </div>
    );
};

export default Header;
