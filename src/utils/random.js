export const firstNames = [
    "Jane",
    "Sally",
    "Mary",
    "Barbara",
    "John",
    "Bob",
    "Rob",
    "Sam",
    "Saul",
    "Walter",
    "Jesse",
];
export const lastNames = [
    "Smith",
    "Ross",
    "Doe",
    "Goodman",
    "McGill",
    "White",
    "Pinkman",
];
export const professions = [
    "Singer",
    "Love Guru",
    "Painter",
    "Criminal Lawyer",
    "Chemical Engineer",
];

const getRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)];
};

const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

let currentId = 0;

export const getId = () => {
    currentId++;
    return currentId;
}

export const makeRow = (columns) => {
    const row = {};

    columns.forEach((col) => {
        switch (col) {
            case columns[0]:
                row[col] = getId();
                break;
            case columns[1]:
                row[col] = `${getRandom(firstNames)} ${getRandom(lastNames)}`;
                break;
            case columns[2]:
                const day = randomNumber(1, 27);
                const month = randomNumber(1, 12);
                const year = randomNumber(1980, 2042);

                row[col] = new Date(`${month}-${day}-${year}`).toLocaleDateString();
                break;
            case columns[3]:
                row[col] = getRandom(professions);
                break;
            case columns[4]:
                row[col] = Math.random() >= 0.2;
                break;
        }
    });

    return row;
};

export const genRows = (columns, amount) => {
    const rows = [];
    while (rows.length < amount) {
        rows.push(makeRow(columns));
    }
    return rows;
};
