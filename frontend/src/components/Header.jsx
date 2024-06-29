import brand from '../assets/brand.svg'

const Header = () => {
    return (
        <div
            className="bg-customGray fixed top-0 z-50 lg:bg-n-8/90
            lg:backdrop-blue-sm w-full">
            <div
                className="flex items-center justify-between lg:justify-start px-5 lg:px-7.5 xl:px-10 py-4"></div>
            <a className='block w-[20rem] xl:mr-8 p-4'>
                <img src={brand} className="floating-3d" alt=""/>
            </a>
        </div>
    )
}

export default Header
