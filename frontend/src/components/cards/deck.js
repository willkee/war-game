export const values = {
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 10,
	J: 11,
	Q: 12,
	K: 13,
	A: 14,
};

export const deck = [
	["♦️", 2],
	["♦️", 3],
	["♦️", 4],
	["♦️", 5],
	["♦️", 6],
	["♦️", 7],
	["♦️", 8],
	["♦️", 9],
	["♦️", 10],
	["♦️", "J"],
	["♦️", "Q"],
	["♦️", "K"],
	["♦️", "A"],
	["♣️", 2],
	["♣️", 3],
	["♣️", 4],
	["♣️", 5],
	["♣️", 6],
	["♣️", 7],
	["♣️", 8],
	["♣️", 9],
	["♣️", 10],
	["♣️", "J"],
	["♣️", "Q"],
	["♣️", "K"],
	["♣️", "A"],
	["♥️", 2],
	["♥️", 3],
	["♥️", 4],
	["♥️", 5],
	["♥️", 6],
	["♥️", 7],
	["♥️", 8],
	["♥️", 9],
	["♥️", 10],
	["♥️", "J"],
	["♥️", "Q"],
	["♥️", "K"],
	["♥️", "A"],
	["♠️", 2],
	["♠️", 3],
	["♠️", 4],
	["♠️", 5],
	["♠️", 6],
	["♠️", 7],
	["♠️", 8],
	["♠️", 9],
	["♠️", 10],
	["♠️", "J"],
	["♠️", "Q"],
	["♠️", "K"],
	["♠️", "A"],
];

export const shuffleDeck = (deck) => {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = deck[i];
		deck[i] = deck[j];
		deck[j] = temp;
	}
};

shuffleDeck(deck); // mutates directly? or not

// const opponent = deck.slice(0, deck.length / 2)
// const self = deck.slice(deck.length / 2)
