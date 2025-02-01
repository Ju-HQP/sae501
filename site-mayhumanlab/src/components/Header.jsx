import Nav from "./Nav";

function Header() {

    return (
        <>
        <header className="px-8 py-4 flex justify-between shadow-lg sticky top-0 z-50 bg-white font-roboto">
            <Nav/>
        </header>   
        </>)
};

export default Header;