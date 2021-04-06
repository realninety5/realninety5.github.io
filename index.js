var make = () => {
    window.slots = [null, null, null];
    box.value = '0';
    window.last = null;
    window.signs = ['+', '*', '-', '/', '=']
    window.set = false;
}
var white = '#ffccdd';



var box = document.querySelector('.box');
document.addEventListener('DOMContentLoaded', () => {
    var box = document.querySelector('.box');
    make()
})


var trims = (val) => val.toString().slice(0, 13);

var clear = (e) => {
    document.querySelectorAll('td').forEach((e) => e.style.background = '')
    e.target.style.background = white;
}

var edit = (e, num) => {
    if (box.value === 'Error'){
        make();
    }
    if (box.value === '0'){
        box.value = num;
    }else if (window.set && box.value.length < 13) {
        box.value += num;
    }else if (window.signs.indexOf(window.last) >= 0){
        box.value = num;
        window.set = true;
    }else if (box.value.length < 13){
        box.value += num;
    }
    clear(e);
}

var add = () => box.value = trims(+window.slots[0] + +window.slots[2]);
var div = () => box.value = trims(window.slots[0] / +window.slots[2]);
var mul = () => box.value = trims(window.slots[0] * +window.slots[2]);
var min = () => box.value = trims(window.slots[0] - +window.slots[2]);

var calc = (action) => {
    if (window.slots[0] == null){
        window.slots[0] = box.value;
        window.slots[1] = action;
        console.log('above');
        window.last = action;
        return;
    }
    window.slots[2] = box.value;

    if (window.slots[1] === '+'){
        add();
    }if (window.slots[1] === '-'){
        min();
    }if (window.slots[1] === '*'){
        mul();
    }if (window.slots[1] == '/' && box.value == 0){
            box.value = 'Error';
        return;
    }if (window.slots[1] == '/'){
        div();
    }

    if (action === '='){
         if (window.slots[1] === '+'){
            add();
        }if (window.slots[1] === '-'){
            min();
        }if (window.slots[1] === '*'){
            mul();
        }if (window.slots[1] == '/'){
            div();
        }
    }
    //window.last = null;
    window.slots = [box.value, action, null]
    window.set = false;

    return;
}


document.querySelector('.one').addEventListener('click', (e) => edit(e, '1'));
document.querySelector('.two').addEventListener('click', (e) => edit(e, '2'));
document.querySelector('.three').addEventListener('click', (e) => edit(e, '3'));
document.querySelector('.four').addEventListener('click', (e) => edit(e, '4'));
document.querySelector('.five').addEventListener('click', (e) => edit(e, '5'));
document.querySelector('.six').addEventListener('click', (e) => edit(e, '6'));
document.querySelector('.seven').addEventListener('click', (e) => edit(e, '7'));
document.querySelector('.eight').addEventListener('click', (e) => edit(e, '8'));
document.querySelector('.nine').addEventListener('click', (e) => edit(e, '9'));
document.querySelector('.zero').addEventListener('click', (e) => {
    if(box.value){
        edit(e, '0')
    }
});

document.querySelector('.plus').addEventListener('click', (e) => {calc('+'); clear(e);});
document.querySelector('.minus').addEventListener('click', (e) => {calc('-'); clear(e);});
document.querySelector('.equal').addEventListener('click', (e) => {calc('='); clear(e)});

document.querySelector('.dot').addEventListener('click', (e) => {
    if (box.value.length < 13 && box.value.indexOf('.') < 0){
            box.value += '.'; 
    }
    clear(e);
})

document.querySelector('.divide').addEventListener('click', (e) => {calc('/'); clear(e);});
document.querySelector('.times').addEventListener('click', (e) => {calc('*'); clear(e);});


document.querySelector('.c').addEventListener('click', (e) => {
    make()
    clear(e);
})

document.querySelector('.del').addEventListener('click', (e) => {
    if(box.value == 0 || box.value.length == 1 || box.value === 'Error'){
        make();
    }else{
        box.value = box.value.slice(0, -1);
    }clear(e);
})
