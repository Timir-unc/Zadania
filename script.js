function generaterandomnumber() {
    let number = '';
    for (let i = 0; i < 4; i++) {
        let digit = Math.floor(Math.random() * 10);
        number += digit;
    }
    return number; 
}
function bullscows(guess, target) {
    let bulls = 0;
    let cows = 0;
    let targetArray = target.split('');
    let guessArray = guess.split('');
    for (let i = 0; i < 4; i++) {
        if (guessArray[i] === targetArray[i]) {
            bulls++;
            targetArray[i] = null;
            guessArray[i] = null;
        }
    }
    for (let i = 0; i < 4; i++) {
        if (guessArray[i] !== null && targetArray.includes(guessArray[i])) {
            cows++;
            targetArray[targetArray.indexOf(guessArray[i])] = null;
        }
    }
    return { bulls, cows };
}
function playGame() {
    const targetNumber = generaterandomnumber();
    let tray = 0;
    console.log("Компьютер загадал четырёхзначное число. Угадай его!");
    while (true) {
        const guess = prompt("Введите четырёхзначное число:");
        tray++;
        if (guess.length !== 4 || isNaN(guess)) {
            console.log("Ошибка! Введите четырёхзначное число.");
            continue;
        }
        const result = bullscows(guess, targetNumber);
        console.log(`Попытка ${tray}: ${guess}`);
        console.log(`${result.bulls} быков, ${result.cows} коров`);
        if (result.bulls === 4) {
            console.log(`Правильно! Вы угадали число за ${tray} попыток.`);
            break;
        }
    }
}

playGame();
