import Logo from "./component-style/logo";

function Header({ numOfGuesses }) {
    return (
        <div className="border-bottom border-gray-500">
            <div className="container-fluid py-3">
                <div className="row align-items-center">
                    <div className="col">
                        <Logo />
                    </div>
                    <div className="col">
                        <span className="fw-bold" style={{backgroundColor: "antiquewhite"}}>{numOfGuesses} Guesses Left</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
