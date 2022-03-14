import '../App.scss';

function TopMenu() {
    return (
        <div className="top-menu flex">
            <div className="gst flex">
                <img src="/images/logo.png" alt="logo" />
                <p>Adding GST</p>
            </div>

            <div className="wallet flex">
                <img src="/images/wallet.svg" alt="wallet" />
                <p>Connect Wallet</p>
            </div>
        </div>
    );
}

export default TopMenu;
