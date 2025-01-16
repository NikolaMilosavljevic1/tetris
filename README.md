# Tetris Game
Tetris game made using *HTML*, *CSS*, *Bootstrap*, *JavaScript*, and *jQuery*.  
Blocks are made in Paint.

---

### tetris-uputstvo
- **The starting page of the application**:
  - The user is given instructions on how to move blocks and how to exit the game (key **Q**).
  - Below, the user can pick which blocks will appear in the game (at least 3 blocks must be selected).
  - The user picks the level of the game: **Easy**, **Medium**, or **Hard**.
  - The user can click two buttons to:
    - Show results.
    - Start the game.

---

### tetris-igra
- **The main page of the application**:
  - The user plays the game.
  - The game ends when:
    - The user presses the **Q** key to exit.
    - Blocks stack to the top of the screen.
  - When the game ends:
    - The user is prompted to enter a name for their score, which will be displayed on the results page.

---

### tetris-rezultati
- **The results page of the application**:
  - Displays the top 5 best results achieved in the game (stored in local storage).
  - Shows the user's last result.
  - Allows the user to return to the starting page.