import '../App.scss';

function MainPage() {
    return (
        <section className="main-page">
            <div className="tabs flex">
                <div className="tab flex">
                    <img src="/images/pets_white.svg" alt="pet" />
                    <p>Pets</p>
                </div>

                <div className="tab flex">
                    <img src="/images/egg_white.svg" alt="egg" />
                    <p>Eggs</p>
                </div>
            </div>

            <div className="filter">
                <div className="title">
                    <p>Filter</p>
                    <p>Clear Filter</p>
                </div>

                <input type="text" placeholder="Token Id" />

                <div className="type">
                    <div className="label">
                        <p>
                            <img src="" alt="" />
                            Pet Type
                        </p>
                        <p>Reset</p>
                    </div>

                    <select />
                </div>

                <div className="rarity">
                    <div className="label">
                        <p>
                            <img src="" alt="" />
                            Rarity
                        </p>
                        <p>Reset</p>
                    </div>

                    <div className="rarities">
                        <p>Normal</p>
                        <p>Rare</p>
                        <p>Elite</p>
                    </div>
                </div>
            </div>

            <div className="top-bar">
                <p>Total: 111 Pets</p>

                <div className="sort">
                    <label>Sort by</label>

                    <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

                <div className="recharge">
                    <img src="" alt="" />
                    <p>30s</p>
                </div>
            </div>

            <div className="cards">

            </div>
        </section>
    );
}

export default MainPage;
