const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0; // Contador de pares encontrados

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    if (isMatch) {
        disableCards();
        matchedPairs++; // Incrementa o contador de pares encontrados
        if (matchedPairs === cards.length / 2) {
            setTimeout(resetGame, 1000); // Reinicia o jogo após 1 segundo se todos os pares forem encontrados
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    matchedPairs = 0; // Reinicia o contador de pares
    cards.forEach(card => {
        card.classList.remove('flip'); // Desvira todas as cartas
        card.addEventListener('click', flipCard); // Adiciona novamente o event listener
    });
    shuffle(); // Embaralha as cartas novamente
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 10);
        card.style.order = randomPos;
    });
}

(function initializeGame() {
    shuffle(); // Embaralha as cartas na inicialização
    cards.forEach(card => card.addEventListener('click', flipCard)); // Adiciona o evento de clique
})();
