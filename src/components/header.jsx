import Logo from "./component-style/logo";
function Header() {

    return(
        <div className="border-b border-gray-500 max-w-xl mx-auto flex items-center justify-between">
            <h1 className="h3 fw-bold mx-2 fw-bold text-black mb-2 tracking-tighter pt-5 pb-5">
                CastDle
                <Logo />
            </h1>
            
        </div>

    )


  }

export default Header;