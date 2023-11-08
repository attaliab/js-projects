const btn = document.getElementById('btn')
const color = document.querySelector('.color')
const hexValues = ['A', 'B', 'C', 'D', 'E', 'F', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]



btn.addEventListener('click', function(){

    let newHex = '#';
    while (newHex.length < 7) {
        const randomValue = Math.floor(Math.random() * hexValues.length);
        newHex += hexValues[randomValue];
    }
    document.body.style.backgroundColor = newHex;
    color.textContent = newHex;
})