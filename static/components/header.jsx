import Logo from "./component-style/logo";
function Header({numOfGuesses}) {

    return(
        <div className="border-b border-gray-500 max-w-xl mx-auto flex items-center justify-between">
            <h1 className="h3 mx-2 text-black mb-2 tracking-tighter pt-5 pb-5 font">
                {/* CastDle */}
                <Logo />
                {/* // show here the guesses left */}
                <span style={{paddingTop: "50vh"}}>{numOfGuesses} Guesses Left</span>

            </h1>
            
        </div>

    )


  }

export default Header;