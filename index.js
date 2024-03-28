const categories = document.querySelector("#categories");
const content = document.querySelector("#content");
const nbCards = document.querySelector("#nbCards");

const ROWS = 3;
const COLS = 4;

function shuffle(arr) {
    var i = arr.length,
        j,
        temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
}

const zip = (arr) => (arr.length ? arr[0].map((_, i) => arr.map((row) => row[i])) : []);

function CSVToArray(strData, strDelimiter) {
    strDelimiter = strDelimiter || ",";
    var objPattern = new RegExp(
        "(\\" +
            strDelimiter +
            "|\\r?\\n|\\r|^)" +
            '(?:"([^"]*(?:""[^"]*)*)"|' +
            '([^"\\' +
            strDelimiter +
            "\\r\\n]*))",
        "gi"
    );
    var arrData = [[]];
    var arrMatches = null;
    while ((arrMatches = objPattern.exec(strData))) {
        var strMatchedDelimiter = arrMatches[1];
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
            arrData.push([]);
        }
        var strMatchedValue;
        if (arrMatches[2]) {
            strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
        } else {
            strMatchedValue = arrMatches[3];
        }
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    return arrData;
}

categories.addEventListener("change", async (e) => {
    const categories = CSVToArray(await e.target.files[0].text());
    content.innerHTML = "";
    const elemsToPick = ROWS * COLS;
    for (let i = 0; i < +nbCards.value; i++) {
        for (const cat of categories) {
            shuffle(cat);
        }
        const grid = zip(categories).flat().slice(0, elemsToPick);
        shuffle(grid);
        const container = document.createElement("div");
        const title = document.createElement("h2");
        title.textContent = "BINGO DGESVR";
        container.append(title);
        const subtitle = document.createElement("h4");
        subtitle.textContent = "Trouvez un ou une collègue qui...";
        container.append(subtitle);
        const table = document.createElement("table");
        for (let i = 0; i < ROWS; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < COLS; j++) {
                const cell = document.createElement("td");
                cell.textContent = grid.pop();
                row.append(cell);
            }
            table.append(row);
        }
        container.append(table);
        content.append(container);
        content?.append(document.createElement("br"));
    }
});
