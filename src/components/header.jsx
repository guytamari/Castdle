import Logo from "./component-style/logo";

function Header({ numOfGuesses }) {
    return (
        <div className="border-bottom border-gray-500">
            <div className="container-fluid py-3">
                <div className="row align-items-center">
                    <div className="col">
                        <Logo />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
