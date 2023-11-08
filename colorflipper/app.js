const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"] 
const btn = document.getElementById('btn')
const color = document.querySelector('.color')


btn.addEventListener('click', function() {
    const randomColor = colors[getRandomNum()];
    document.body.style.backgroundColor = randomColor;
    color.textContent = randomColor;
})

function getRandomNum() {
    const randomNum = Math.floor(Math.random() * colors.length);
    return randomNum;
}

