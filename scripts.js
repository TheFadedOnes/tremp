document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.querySelector('.buy-button');
    const socialLinks = document.querySelectorAll('.social-link');

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

    // Pong game script
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');

    canvas.width = 500;
    canvas.height = 500;

    let ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        width: 40,
        height: 40,
        speedX: 2,
        speedY: 2,
        image: new Image()
    };

    ball.image.src = 'images/ball.png';

    let paddle = {
        x: 10,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        speedY: 0
    };

    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    let playerName = '';
    let score = 0;

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw ball
        context.drawImage(ball.image, ball.x, ball.y, ball.width, ball.height);

        // Draw paddle
        context.fillStyle = '#fff';
        context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

        // Draw score
        context.font = '20px Arial';
        context.fillText(`Score: ${score}`, canvas.width - 100, 30);
    }

    function update() {
        ball.x += ball.speedX;
        ball.y += ball.speedY;

        if (ball.y + ball.height > canvas.height || ball.y < 0) {
            ball.speedY = -ball.speedY;
        }

        if (ball.x + ball.width > canvas.width) {
            ball.speedX = -ball.speedX;
        }

        if (ball.x < paddle.x + paddle.width && ball.y > paddle.y && ball.y < paddle.y + paddle.height) {
            ball.speedX = -ball.speedX;
            score++;
        }

        if (ball.x < 0) {
            gameOver();
        }

        paddle.y += paddle.speedY;

        if (paddle.y < 0) {
            paddle.y = 0;
        } else if (paddle.y + paddle.height > canvas.height) {
            paddle.y = canvas.height - paddle.height;
        }
    }

    function gameLoop() {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            paddle.speedY = -5;
        } else if (event.key === 'ArrowDown') {
            paddle.speedY = 5;
        }
    });

    document.addEventListener('keyup', () => {
        paddle.speedY = 0;
    });

    ball.image.onload = function() {
        gameLoop();
    };

    function gameOver() {
        cancelAnimationFrame(gameLoop);
        document.getElementById('nameInputContainer').style.display = 'block';
    }

    function submitHighScore() {
        playerName = document.getElementById('playerName').value;
        highScores.push({ name: playerName, score: score });
        highScores.sort((a, b) => b.score - a.score);
        highScores = highScores.slice(0, 10);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        displayHighScores();
        resetGame();
    }

    function displayHighScores() {
        const highScoresList = document.getElementById('highScores');
        highScoresList.innerHTML = '';
        highScores.forEach((score) => {
            const li = document.createElement('li');
            li.textContent = `${score.name}: ${score.score}`;
            highScoresList.appendChild(li);
        });
    }

    function resetGame() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = 2;
        ball.speedY = 2;
        score = 0;
        document.getElementById('nameInputContainer').style.display = 'none';
        gameLoop();
    }

    window.onload = displayHighScores;
});
