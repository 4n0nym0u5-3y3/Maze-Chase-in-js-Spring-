/*
Capture the flag before the other player does!

@title: Maze Chase
@author: Armaanpreet Singh
@tags: ['two-player', 'maze', 'capture']
@addedOn: 2024-07-09
*/

const player1 = "a";
const player2 = "b";
const wall = "w";
const flag = "f";
const gameover = "g";

const player1Bitmap = bitmap`
................
................
.......3........
.....88888......
.....80808......
.....88388......
.....C000C......
....C..0..C.....
......0.0.......
................
................
................
................
................
................
................`;

const player2Bitmap = bitmap`
................
................
................
................
.......C........
.....77277......
.....20202......
.....72C27......
.....H000H......
....H..0..H.....
......0.0.......
................
................
................
................
................`;

const wallBitmap = bitmap`
FFLLLLLLLLLLLLFF
FFFLLLLLLLLLLFFF
LLFLLLLLLLLLLFLL
LLLFLLLLLLLLFLLL
LLLLFFLLLLFFLLLL
LLLLLFLLLLFLLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLL333333LLLLL
LLLLFLLLLLLFLLLL
LLFFLLLLLLLLFFFL
FFLLLLLLLLLLLLFF
FFLLLLLLLLLLLLFF`;

const flagBitmap = bitmap`
................
................
................
................
................
................
.......33.......
.......033......
.......03.......
.......0........
................
................
................
................
................
................`;

const gameoverBitmap = bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`;



setLegend(
  [player1, player1Bitmap],
  [player2, player2Bitmap],
  [wall, wallBitmap],
  [flag, flagBitmap],
  [gameover, gameoverBitmap]
);

setSolids([player1, player2, wall]);

// Level 0 to 3 are the game levels, level 4 is the end screen
let level = 0;
const levels = [
  map`
a.....w..b
..ww....ww
w.w..ww.w.
..w.w...w.
.ww.w.www.
......w...
.w.wwww...
.......f..`,
  map`
wwwwww.www
.........w
..www.ww.w
....a.w..w
.ww...w..w
w....bw.ww
..wwwwwfww
..w.....ww`,
  map`
a.wwwwwwww
w........w
w.wwwww..w
w.wwwww..w
w...f....w
..wwwww..w
.........w
wwwwwwww.b`,
  map`
wwwwwwwwwwwwww
a............w
.www.w.www...w
.............w
wwww.wfw.ww.ww
www..www.....w
www......www.w
wwwwwwwwwwww.b`,
  map`
g`
];

setMap(levels[level]);

function checkWin() {
  const winMusic = tune`
283.0188679245283: E5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: A5~283.0188679245283,
283.0188679245283: A5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: D5~283.0188679245283 + A4-283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: F5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: G5~283.0188679245283,
283.0188679245283: F5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283 + F4/283.0188679245283,
283.0188679245283: C5~283.0188679245283 + A4-283.0188679245283 + F4/283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: E5~283.0188679245283,
283.0188679245283: D5~283.0188679245283 + A4^283.0188679245283,
283.0188679245283: C5~283.0188679245283 + G4^283.0188679245283,
1132.0754716981132`;

  try {
    if (getFirst(player1).x == getFirst(flag).x && getFirst(player1).y == getFirst(flag).y) {
      playTune(winMusic);

      setMap(levels[4]); // Show the end screen
      addText("PLAYER 1 WINS", { x: 0, y: 0, color: color`7` });
      addText("ANY KEY TO CONTINUE", { x: 0, y: 2, color: color`7` });
    } else if (getFirst(player2).x == getFirst(flag).x && getFirst(player2).y == getFirst(flag).y) {
      playTune(winMusic);

      setMap(levels[4]); // Show the end screen
      addText("PLAYER 2 WINS", { x: 0, y: 0, color: color`3` });
      addText("ANY KEY TO CONTINUE", { x: 0, y: 2, color: color`3` });
    }
  } catch (e) {}
}

// Player 1 controls
onInput("w", () => {
  if (level < 4) {
    getFirst(player1).y -= 1;
    checkWin();
  }
});

onInput("s", () => {
  if (level < 4) {
    getFirst(player1).y += 1;
    checkWin();
  }
});

onInput("a", () => {
  if (level < 4) {
    getFirst(player1).x -= 1;
    checkWin();
  }
});

onInput("d", () => {
  if (level < 4) {
    getFirst(player1).x += 1;
    checkWin();
  }
});

// Player 2 controls
onInput("i", () => {
  if (level < 4) {
    getFirst(player2).y -= 1;
    checkWin();
  }
});

onInput("k", () => {
  if (level < 4) {
    getFirst(player2).y += 1;
    checkWin();
  }
});

onInput("j", () => {
  if (level < 4) {
    getFirst(player2).x -= 1;
    checkWin();
  }
});

onInput("l", () => {
  if (level < 4) {
    getFirst(player2).x += 1;
    checkWin();
  }
});

// Restart the game and move to the next level if the level is different
afterInput(() => {
  if (level == 4) {
    clearText();
    level = (level + 1) % 4; // Move to the next level
    setMap(levels[level]);
  }
});
