import '../App.scss';
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";

function MainPage() {
    const rarities = ["Normal", "Rare", "Elite"]
    const types = ["Pifating", "Woruffing", "Radenting", "Sniffing", "Horiding", "Bawaving"]
    const [cards, setCards] = useState([])
    const [eggs, setEggs] = useState([])
    const [tab, setTab] = useState("pets")

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [items, setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);

    const [currentType, setCurrentType] = useState("")
    const [currentId, setCurrentId] = useState("")
    const [currentRarities, setCurrentRarities] = useState([])

    useEffect(() => {
        let cardsData = []
        let eggsData = []
        if (cards.length === 0) {
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

                cardsData.push({
                    rarity: rarity,
                    type: types[Math.floor(Math.random() * types.length)],
                    id: i === 0 ? Math.floor(Math.random() * 10 + 1) : cardsData[cardsData.length - 1].id + Math.floor(Math.random() * 40 + 1),
                    level: Math.floor(Math.random() * 10 + 1),
                    dollarPrice: price,
                    coin: price * 15
                })
                eggsData.push({
                    id: i === 0 ? Math.floor(Math.random() * 10 + 1) : eggsData[eggsData.length - 1].id + Math.floor(Math.random() * 40 + 1),
                    dollarPrice: Math.floor(Math.random() * 150 + 150),
                    coin: Math.floor(Math.random() * 150 + 150) * 15,
                })

                setCards(cardsData)
                setEggs(eggsData)
            }
        } else {
            cardsData = cards
            eggsData = eggs
        }

        if (tab === "eggs") {
            setItems(eggsData.slice(itemOffset, itemOffset + 8));
            setPageCount(Math.ceil(eggsData.length / 8));
            setCurrentItems(eggsData)
        } else {
            let newItems = cardsData;
            if (currentId) {
                newItems = newItems.filter(item => item.id.toString() === currentId)
            }
            if (currentType) {
                newItems = newItems.filter(item => item.type === currentType)
            }
            if (currentRarities.length > 0) {
                newItems = newItems.filter(item => currentRarities.includes(item.rarity))
            }
            setCurrentItems(newItems)
            setItems(newItems.slice(itemOffset, itemOffset + 8))
            setPageCount(Math.ceil(newItems.length / 8));
        }
    }, [itemOffset, tab, currentType, currentRarities])

    const changeTab = (tab) => {
        setTab(tab)
        if (tab === "eggs") {
            setItems(eggs.slice(0, 8))
        } else {
            setItems(cards.slice(0, 8))
        }
    }

    const handlePageClick = (event) => {
        let newOffset;
        if (currentType) {
            let newItems = cards.filter(item => item.type === currentType)
            newOffset = (event.selected * 8) % newItems.length;
        } else {
            newOffset = (event.selected * 8) % cards.length;
        }
        setItemOffset(newOffset);
    };

    const handleChangeId = (event) => {
        let newItems = cards;
        if (event.target.value) {
            newItems = newItems.filter(item => item.id.toString() === event.target.value)
        }
        if (currentType) {
            newItems = newItems.filter(item => item.type === currentType)
        }
        if (currentRarities.length > 0) {
            newItems = newItems.filter(item => currentRarities.includes(item.rarity))
        }
        setCurrentItems(newItems)
        setItems(newItems.slice(itemOffset, itemOffset + 8))
        setCurrentId(event.target.value)
    }

    const clearInput = () => {
        let newItems = cards;
        if (currentType) {
            newItems = newItems.filter(item => item.type === currentType)
        }
        if (currentRarities.length > 0) {
            newItems = newItems.filter(item => currentRarities.includes(item.rarity))
        }
        setCurrentId("")
        setCurrentItems(newItems)
        setItems(newItems.slice(itemOffset, itemOffset + 8))
    }

    const handleChangeType = (event) =>  {
        setCurrentType(event.target.value)
        let newItems = cards;
        if (currentId) {
            newItems = newItems.filter(item => item.id.toString() === currentId)
        }
        if (event.target.value) {
            newItems = newItems.filter(item => item.type === event.target.value)
        }
        if (currentRarities.length > 0) {
            newItems = newItems.filter(item => currentRarities.includes(item.rarity))
        }
        setCurrentItems(newItems)
        setItems(newItems.slice(itemOffset, itemOffset + 8))
    }

    const clearType = () => {
        setCurrentType("")
        let newItems = cards;
        if (currentId) {
            newItems = newItems.filter(item => item.id.toString() === currentId)
        }
        if (currentRarities.length > 0) {
            newItems = newItems.filter(item => currentRarities.includes(item.rarity))
        }
        setCurrentItems(newItems)
        setItems(newItems.slice(itemOffset, itemOffset + 8))
    }

    const checkRarity = (event) => {
        let newRarities = []
        if (currentRarities.includes(event.target.value)) {
            newRarities = currentRarities.filter(rarity => rarity !== event.target.value)
        } else {
            newRarities = [...currentRarities, event.target.value]
        }
        setCurrentRarities(newRarities)

        let newItems = cards;
        if (currentId) {
            newItems = newItems.filter(item => item.id.toString() === currentId)
        }
        if (currentType) {
            newItems = newItems.filter(item => item.type === currentType)
        }
        if (newRarities.length > 0) {
            newItems = newItems.filter(item => newRarities.includes(item.rarity))
        }
        setCurrentItems(newItems)
        setItems(newItems.slice(itemOffset, itemOffset + 8))
    }

    const clearRarities = () => {
        setCurrentRarities([])
        let newItems = cards;
        if (currentId) {
            newItems = newItems.filter(item => item.id.toString() === currentId)
        }
        if (currentType) {
            newItems = newItems.filter(item => item.type === currentType)
        }
        setCurrentItems(newItems)
        setItems(newItems.slice(itemOffset, itemOffset + 8))
    }

    return (
        <section className="main-page flex-col">
            <div className="tabs flex">
                <div onClick={() => changeTab("pets")} className={`tab flex " + ${tab === "pets" && "active"}`}>
                    <img src="/images/pets_white.svg" alt="pet" />
                    <p>Pets</p>
                </div>

                <div onClick={() => changeTab("eggs")} className={`tab flex " + ${tab === "eggs" && "active"}`}>
                    <img src="/images/egg_white.svg" alt="egg" />
                    <p>Eggs</p>
                </div>
            </div>

            <div className="main flex-col">
                {tab === "pets" && <div className="filter flex-col">
                    <div className="title flex">
                        <h2>Filter</h2>
                        <p onClick={clearInput}>Clear Filter</p>
                    </div>

                    <div className="token-id">
                        <input id="id-input" onChange={handleChangeId} type="text" placeholder="Token Id"
                               value={currentId}/>
                    </div>

                    <hr/>

                    <div className="type flex-col">
                        <div className="label flex">
                            <p className="flex">
                                <img src="/images/arrow_down_white.svg" alt="down"/>
                                Pet type
                            </p>

                            <p onClick={clearType} className="reset">Reset</p>
                        </div>

                        <select name="types" id="types" value={currentType} onChange={handleChangeType}>
                            <option value="">- Any -</option>
                            {types.map(type => (
                                <option key={"option" + type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <hr/>

                    <div className="rarity flex-col">
                        <div className="label flex">
                            <p className="flex">
                                <img src="/images/arrow_down_white.svg" alt="down"/>
                                Rarity
                            </p>

                            <p onClick={clearRarities} className="reset">Reset</p>
                        </div>

                        <div className="rarities flex">
                            <label className="normal flex" htmlFor="normal-type">
                                <input onClick={checkRarity} type="checkbox" id="normal-type" className="type-input"
                                       value="Normal" checked={currentRarities.includes("Normal")} onChange={() => {
                                }}/>
                                Normal
                                <input type="checkbox"/>
                            </label>

                            <label className="rare flex" htmlFor="rare-type">
                                <input onClick={checkRarity} type="checkbox" id="rare-type" className="type-input"
                                       value="Rare" checked={currentRarities.includes("Rare")} onChange={() => {
                                }}/>
                                Rare
                                <input type="checkbox"/>
                            </label>

                            <label className="elite flex" htmlFor="elite-type">
                                <input onClick={checkRarity} type="checkbox" id="elite-type" className="type-input"
                                       value="Elite" checked={currentRarities.includes("Elite")} onChange={() => {
                                }}/>
                                Elite
                                <input type="checkbox"/>
                            </label>
                        </div>
                    </div>
                </div>}

                <div className="cards-container flex-col">
                    <div className="top-bar flex">
                        <p>Total: {currentItems.length} Pets</p>

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

                    <div className="pets flex">
                        {items.map(card => {
                            return tab === "pets"
                                ? <div key={`pet${card.id}`} className="card flex-col">
                                    <div className="info flex-col">
                                        <p className={"rarity " + card.rarity?.toLowerCase()}>{card.rarity}</p>
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
                                : <div key={`egg${card.id}`} className="egg flex-col">
                                    <div className="title">
                                        <p>Gunstar Metaverse Mystery Egg #{card.id}</p>
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
                        })}
                    </div>
                </div>

                <ReactPaginate
                    previousLabel="<"
                    nextLabel=">"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="pagination"
                    activeClassName="active"
                />
            </div>
        </section>
    );
}

export default MainPage;
