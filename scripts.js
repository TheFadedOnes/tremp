document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.querySelector('.buy-button');
    const socialLinks = document.querySelectorAll('.social-link');
    const spinButton = document.getElementById('spinButton');
    const window1 = document.getElementById('window1');
    const window2 = document.getElementById('window2');
    const window3 = document.getElementById('window3');
    const result = document.getElementById('result');

    let spinCount = 0;

    function getRandomResult() {
        const symbols = ['🍒', '🍋', '🔔', '⭐', '🍉']; // Example symbols
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function spinSlotMachine() {
        spinCount++;

        if (spinCount % 20 === 0) {
            // Ensure a win every 20 spins
            window1.textContent = 'WIN';
            window2.textContent = 'WIN';
            window3.textContent = 'WIN';
            result.textContent = 'You Win!';
        } else {
            // Random results for other spins
            window1.textContent = getRandomResult();
            window2.textContent = getRandomResult();
            window3.textContent = getRandomResult();

            // Check if all windows show the same symbol
            if (window1.textContent === window2.textContent && window2.textContent === window3.textContent) {
                result.textContent = 'You Win!';
            } else {
                result.textContent = 'You Lose!';
            }
        }
    }

    spinButton.addEventListener('click', spinSlotMachine);

    const buyAudio = new Audio('audio/buy-button.mp3');
    const socialAudio = new Audio('audio/social-media.mp3');

    buyButton.addEventListener('mouseenter', () => {
        buyAudio.play().catch(error => console.error('Error playing buy audio:', error));
    });

    buyButton.addEventListener('mouseleave', () => {
        buyAudio.pause();
        buyAudio.currentTime = 0;
    });

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            socialAudio.play().catch(error => console.error('Error playing social audio:', error));
        });

        link.addEventListener('mouseleave', () => {
            socialAudio.pause();
            socialAudio.currentTime = 0;
        });
    });
});
