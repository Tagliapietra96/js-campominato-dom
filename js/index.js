// FUNZIONI ****************************************************************

/**
 * Funzione uguale a document.querySelector() ma riassunta in meno caratteri
 * @param {string} querySelector Indica un selettore css valido
 * @returns 
 */
function el(querySelector) {
    let domElement;
    if (querySelector === ':root' || querySelector === 'root') {
        domElement = document.documentElement;
    } else {
        domElement = document.querySelector(querySelector);
    };
    return domElement;
};

/**
 * Genera un numero random compreso o uguale a min e max, 
 * se i valori non vengono specificati il generatore darà come output o 1 o 0
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function randomNum(min, max) {
    if (min === undefined && max === undefined) {
        min = 0;
        max = 1;
    };
    if (min < max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * (min - max + 1)) + max;
    };
};

/**
 * Funzione che genera una lista lunga 'listLenght' di valori numerici 
 * random diversi compresi tra 'rangeNumMin' e 'rangeNumMax'
 * @param {number} rangeNumMin 
 * @param {number} rangeNumMax 
 * @param {number} listLenght 
 * @returns {Array}
 */
function getRandomList(rangeNumMin, rangeNumMax, listLenght) {
    const randomList = [];
    while (randomList.length < listLenght) {
        const item = randomNum(rangeNumMin, rangeNumMax);
        if (!randomList.includes(item)) {
            randomList.push(item);
        };
    };
    return randomList;
};

/**
 * funzione che in automatico aggiunge la classe active all'elemento indicato 
 * tramite selettore css
 * @param {string} querySelector inserisci un selettore css valido
 */
function addActive(querySelector) {
    const domElement = document.querySelector(querySelector);
    domElement.classList.remove('active');
    domElement.classList.add('active');
};

/**
 * funzione che in automatico rimuove la classe active all'elemento indicato 
 * tramite selettore css
 * @param {string} querySelector inserisci un selettore css valido
 */
function removeActive(querySelector) {
    const domElement = document.querySelector(querySelector);
    domElement.classList.remove('active');
};

function createGrid(domElement, numOfCols) {
    const bombList = getRandomList(1, (Math.pow(numOfCols, 2)), 16);

    for (let i = 1; i <= (Math.pow(numOfCols, 2)); i++) {
        let newCell = document.createElement('div');
        newCell.classList.add('my-cell');
        newCell.dataset.numCell = i;

        if (bombList.includes(i)) {
            newCell.classList.add('bomb');
            let bomb = document.createElement('img');
            bomb.src = 'img/bomb.svg';
            newCell.append(bomb);
            newCell.addEventListener('click', function () {
                const allBombsEl = document.querySelectorAll('.bomb');
                const allActive = document.querySelectorAll('.cell-container .active:not(.bomb)');
                let score = allActive.length;
                const allCells = document.querySelectorAll('.my-cell');

                for (x = 0; x < allBombsEl.length; x++) {
                    allBombsEl[x].classList.add('active');
                };

                alert(`BOOM!! Hai perso, il tuo punteggio è di: ${score}`);
                for (a = 0; a < allCells.length; a++) {
                    allCells[a].classList.add('my-end');
                };
            });
        }

        newCell.addEventListener('click', function () {
            this.classList.add('active');
        });

        domElement.append(newCell);
    };
}

// COSTANTI ****************************************************************

const myBtnEl = el('button.my-play');
const exitBtnEl = el('button.my-exit');
const cellContainerEl = el('.cell-container');
const rootEl = el(':root');

// EVENTI ******************************************************************

myBtnEl.addEventListener('click', function () {
    let difficulty = parseInt(el('select').value);
    rootEl.style.setProperty('--js-cell-number', difficulty);

    addActive('header');
    addActive('main .container');
    addActive('button.my-exit');

    cellContainerEl.innerHTML = '';
    createGrid(cellContainerEl, difficulty);
    this.innerHTML = 'Reset';
});

exitBtnEl.addEventListener('click', function () {
    removeActive('header');
    removeActive('main .container');
    removeActive('button.my-exit');
    myBtnEl.innerHTML = 'Play';
});



