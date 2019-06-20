var mass = [];
var way = 4;
var n = 30;
var gameover = false;
var eat = false;
var move = false;
var score = 0;

var canvas = document.getElementById('canvas');


window.onload = function () {
    main();
}


function main() {
    for (var i = 0; i < n; i++) {
        mass[i] = [];
        for (var j = 0; j < n; j++) {
            mass[i][j] = 0;
        }
    }

    mass[14][13] = 1;
    mass[14][12] = 2;
    mass[14][11] = 3;


    way = 4;
    n = 30;
    gameover = false;
    eat = false;
    move = false;
    score = 0;

    generate_eat();
    paint();
}


function rand_int(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}


function generate_eat() {
    x = rand_int(0, n - 1);
    y = rand_int(0, n - 1);
    if (mass[x][y] == 0) {
        mass[x][y] = -1;
    } else {
        console.log('tic2');
        generate_eat();
    }
}


onkeydown = function (e) {
    var key = e.keyCode;
    if (key == 38 && way != 2 && !move) { way = 1; move = true; }
    if (key == 40 && way != 1 && !move) { way = 2; move = true; }
    if (key == 37 && way != 4 && !move) { way = 3; move = true; }
    if (key == 39 && way != 3 && !move) { way = 4; move = true; }


};


function add_head() {
    for (var i = 0; i < n; i++)
        for (var j = 0; j < n; j++) {
            if (mass[i][j] == 1) {
                switch (way) {
                    case 1://верх 
                        if (i != 0) {
                            if (mass[i - 1][j] > 0) {
                                gameover = true;
                                return;
                            } else if (mass[i - 1][j] == -1) {
                                eat = true;
                                mass[i - 1][j] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[i - 1][j] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        } else {
                            if (mass[n - 1][j] > 0) {
                                gameover = true;
                                return;
                            } else if (mass[n - 1][j] == -1) {
                                eat = true;
                                mass[n - 1][j] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[n - 1][j] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        }
                        break;
                    case 2://низ
                        if (i != n - 1) {
                            if (mass[i + 1][j] > 0) {
                                gameover = true;
                                return;
                            } else if (mass[i + 1][j] == -1) {
                                eat = true;
                                mass[i + 1][j] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[i + 1][j] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        } else {
                            if (mass[0][j] > 0) {
                                gameover = true;
                                return;
                            } else if (mass[0][j] == -1) {
                                eat = true;
                                mass[0][j] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[0][j] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        }
                        break;
                    case 3://лево
                        if (j != 0) {
                            if (mass[i][j - 1] > 0) {
                                gameover = true;
                                return;
                            } else if (mass[i][j - 1] == -1) {
                                eat = true;
                                mass[i][j - 1] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[i][j - 1] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        } else {
                            if (mass[i][n - 1] > 0) {
                                gameover = true;
                                return;
                            } else if (mass[i][n - 1] == -1) {
                                eat = true;
                                mass[i][n - 1] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[i][n - 1] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        }
                        break;
                    case 4://право

                        if (j != n - 1) {
                            if (mass[i][j + 1] > 0) {
                                gameover = true;
                                return;
                            } else if (mass[i][j + 1] == -1) {
                                eat = true;
                                mass[i][j + 1] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[i][j + 1] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        } else {
                            if (mass[i][0] > 0) {
                                return;
                            } else if (mass[i][0] == -1) {
                                eat = true;
                                mass[i][0] = 1;
                                mass[i][j] = 2;
                                return;
                            } else {
                                eat = false;
                                mass[i][0] = 1;
                                mass[i][j] = 2;
                                return;
                            }
                        }
                        break;
                }
            }
        }
}


function del_tail() {
    var max = 0;
    var ii, jj;

    for (var i = 0; i < n; i++)
        for (var j = 0; j < n; j++) {
            if (mass[i][j] > max) {
                max = mass[i][j];
                ii = i;
                jj = j;
            }
            if (i == n - 1 && j == n - 1) {
                mass[ii][jj] = 0;
            }
        }
}


function move_body() {
    move = false;
    for (var i = 0; i < n; i++)
        for (var j = 0; j < n; j++) {
            if (mass[i][j] > 1) mass[i][j]++;
        }
}


async function game() {
    await move_body();
    await add_head();
    if (!gameover) {
        if (!eat) {
            await del_tail();
        } else {
            score++;
            await generate_eat();
        }
    }
    paint();
}


function paint() {
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        for (var i = 0; i < n; i++)
            for (var j = 0; j < n; j++) {
                switch (mass[i][j]) {
                    case -1: ctx.fillStyle = "red"; break;
                    case 0: ctx.fillStyle = "black"; break;
                    case 1: ctx.fillStyle = "yellow"; break;
                    default:
                        ctx.fillStyle = "green"; break;
                        break;
                }
                ctx.fillRect(j * 20, i * 20, 20, 20);
            }
    }
}


document.getElementById('start').onmouseup = function () {
    document.getElementById('start').disabled = true;
    main();
    var timer_id = setInterval(function () {
        if (!gameover) {
            document.getElementById('score').innerHTML = score;
            game();
        } else {
            document.getElementById('start').disabled = false;
            clearInterval(timer_id);
            alert('Вы проиграли, ваш счет: ' + score);
        }
    }, 100);
}