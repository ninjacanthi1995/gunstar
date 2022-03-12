import '../App.scss';
import {useEffect, useState} from "react";

function MainPage() {
    const rarities = ["Normal", "Rare", "Elite"]
    const types = ["Pifating", "Woruffing", "Radenting", "Sniffing", "Horiding", "Bawaving"]
    const [cards, setCards] = useState([{
        rarity: '',
        type: '',
        id: 0,
        level: 0,
        dollarPrice: 0,
        coin: 0
    }])
    const [tab, setTab] = useState("pets")

    useEffect(() => {
        let data = []
        for (let i = 0; i < 80; i++) {
            let rarity = rarities[Math.floor(Math.random() * rarities.length)]
            let price;
            switch (rarity) {
                case "Normal":
                    price = Math.floor(Math.random() * 300 + 40)
                    break
                case "Rare":
                    price = Math.floor(Math.random() * 500 + 130)
                    break
                default:
                    price = Math.floor(Math.random() * 400 + 500)
                    break
            }

            data.push({
                rarity: rarity,
                type: types[Math.floor(Math.random() * types.length)],
                id: i === 0 ? Math.floor(Math.random() * 10 + 1) : cards[cards.length - 1].id + Math.floor(Math.random() * 40 + 1),
                level: Math.floor(Math.random() * 10 + 1),
                dollarPrice: price,
                coin: price * 15
            })

            setCards(data)
        }
    }, [])

    return (
        <section className="main-page flex-col">
            <div className="tabs flex">
                <div onClick={() => setTab("pets")} className={`tab flex " + ${tab === "pets" && "active"}`}>
                    <img src="/images/pets_white.svg" alt="pet" />
                    <p>Pets</p>
                </div>

                <div onClick={() => setTab("eggs")} className={`tab flex " + ${tab === "eggs" && "active"}`}>
                    <img src="/images/egg_white.svg" alt="egg" />
                    <p>Eggs</p>
                </div>
            </div>

            <div className="main flex-col">
                <div className="filter flex-col">
                    <div className="title flex">
                        <h2>Filter</h2>
                        <p>Clear Filter</p>
                    </div>

                    <div className="token-id">
                        <input type="text" placeholder="Token Id" />
                    </div>

                    <hr />

                    <div className="type flex-col">
                        <div className="label flex">
                            <p className="flex">
                                <img src="/images/arrow_down_white.svg" alt="down" />
                                Pet type
                            </p>

                            <p className="reset">Reset</p>
                        </div>

                        <select name="cars" id="cars">
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="mercedes">Mercedes</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>

                    <hr />

                    <div className="rarity flex-col">
                        <div className="label flex">
                            <p className="flex">
                                <img src="/images/arrow_down_white.svg" alt="down" />
                                Rarity
                            </p>

                            <p className="reset">Reset</p>
                        </div>

                        <div className="rarities flex">
                            <p className="normal">Normal</p>
                            <p className="rare">Rare</p>
                            <p className="elite">Elite</p>
                        </div>
                    </div>
                </div>

                <div className="cards-container flex-col">
                    <div className="top-bar flex">
                        <p>Total: 111 Pets</p>

                        <div className="sort flex-col">
                            <label>Sort by</label>

                            <select name="cars" id="cars">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>

                        <div className="recharge flex">
                            <img src="/images/autorenew_white.svg" alt="renew" />
                            <p>30s</p>
                        </div>
                    </div>

                    <div className="cards flex">
                        {cards.map((card, index) => (
                            <div key={`card${index}`} className="card flex-col">
                                <div className="info flex-col">
                                    <p className={"rarity " + card.rarity.toLowerCase()}>{card.rarity}</p>
                                    <p className="type-id">{card.type}#{card.id}</p>
                                    <p className="level">Level: {card.level}</p>
                                </div>

                                <img className="pet-img" src="/images/pet.png" alt="pet"/>

                                <div className="prices flex-col">
                                    <p className="dollar">${card.dollarPrice}</p>

                                    <p className="flex coin">
                                        <img src="/images/coin.png" alt="coin" />
                                        {card.coin}
                                    </p>

                                    <button className="flex">
                                        <img src="/images/search.svg" alt="search"/>
                                        <p>View</p>
                                        <span />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainPage;
