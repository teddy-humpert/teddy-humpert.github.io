

document.addEventListener('DOMContentLoaded', () => {

    let optionButtons = document.querySelectorAll('li');

    console.log(optionButtons);

    optionButtons.forEach((option) => {
        option.addEventListener('click', () => {
            if (!option.classList.contains('selected')) {
                clearAllSelected();
                option.classList.add('selected');
                // option.querySelector('i').classList.remove('selected');
            }
        });
    })

    function clearAllSelected() {
        optionButtons.forEach((option) => {
            option.classList.remove('selected');
        })
    }

   

    const startButton = document.getElementById('btnStart');
    startButton.addEventListener('click', () => {
        let selection = document.querySelector('li.selected');
        console.log('you hit start')
        console.log(selection);
        console.log(selection.innerText);
        if (selection.innerText == 'ADDITION') {
            window.location = "add.html";
        } if (selection.innerText == 'SUBTRACTION') {
            window.location = "sub.html";
        } if (selection.innerText == 'MULTIPLICATION') {
            window.location = "multi.html";
        } if (selection.innerText == 'DIVISION') {
            window.location = "div.html";
        }
    })




});