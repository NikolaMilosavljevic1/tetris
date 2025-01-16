//----------TODO----------
//Random generisanje nekog bloka DONE
//Random generisanje neke boje DONE
//Korektno rotiranje blokova DONE
//Padanje blokova po odredjenom intervalu  DONE
//Sudar sa blokovima DONE
//Bug: Vidi se druga boja dok se reaguje na dogadjaje od tastature  DONE
//Brisanje celog reda kad se popune blokovi u tom redu  DONE
    //Za rotiranje pitati chat gpt da izgenerise prosledjujuci mu ovaj fajl ceo
    //Obezbediti da se pojavljuju samo blokovi selektovani sa pocetne strane, vrv preko localStorage 
    //Obezbediti kraj igre, kad blokovi stignu do vrha

//eventovi za strelice: DOWN(40), UP(38), LEFT(37), RIGHT(39)

$(document).ready(function() {
    var rows = 25;
    var cols = 10;
    var boje = 4;
    var shapes = 7;
    var handler;
    var lck = 0;
    var sem = 0;
    var row;
    var col;
    var currentBlock;
    var smer = 0;
    var shape;
    var slika;
    var interval;
    var numOfBlocks = 0;
    var score = 0;
    var lines = 0;
    var nextImg = 0;
    var rotationState = 0;
    var allBlocks;
    setNivo();
    drawTable();
    initBlocks();
    drawFigure(1);

    function setNivo() {
        let nivo = localStorage.getItem("nivo");
        nivo = parseInt(nivo)+1;
        document.getElementById("level").innerText = nivo;
        switch(nivo) {
            case 1:
                interval = 1000;
                break;
            case 2:
                interval = 500;
                break;
            case 3:
                interval = 200;
                break;
        }
    }
    function drawTable() {
        let tableRows = document.getElementsByTagName("tr");
        for (let i = 0; i < tableRows.length; i++) {
            tableRows[i].id="tr"+i;     
            let rowData = tableRows[i].getElementsByTagName("td");
            console.log(rowData.length);
            for (let j = 0; j < rowData.length; j++) {
                rowData[j].id="td"+j;
                rowData[j].innerHTML = "1";
            }
        }
    }
    function initBlocks() {
        allBlocks = JSON.parse(localStorage.getItem('selectedBlocks'));
        console.log("BROJ BLOKOVA JE: %d", numOfBlocks);
        shapes = allBlocks.length;
    }
    function next_img() {
        nextImg = allBlocks[Math.floor(Math.random() * shapes)];
        console.log(nextImg);
        switch (nextImg) {
            case 'I-block':
                nextImg = 0;
                document.getElementById("next-block").src = 'tetris-dodatno/blokovi/I-block.png';
                break;
            case 'J-block':
                nextImg = 1;
                document.getElementById("next-block").src = 'tetris-dodatno/blokovi/J-block.png';
                break;        
            case 'L-block':
                nextImg = 2;
                document.getElementById("next-block").src = 'tetris-dodatno/blokovi/L-block.png';
                break; 
            case 'O-block':
                nextImg = 3;
                document.getElementById("next-block").src = 'tetris-dodatno/blokovi/O-block.png';
                break; 
            case 'S-block':
                nextImg = 4;
                document.getElementById("next-block").src = 'tetris-dodatno/blokovi/S-block.png';
                break; 
            case 'T-block':
                nextImg = 5;
                document.getElementById("next-block").src = 'tetris-dodatno/blokovi/T-block.png';
                break; 
            case 'Z-block':
                nextImg = 6;
                document.getElementById("next-block").src = 'tetris-dodatno/blokovi/Z-block.png';
                break; 
        }
    }
    function updateScore(newLine) {
        if (newLine) score += 100;
        score += 10;
        document.getElementById("score").innerHTML = score;
    }
    function updateInterval() {
        console.log("UPDATE INTERVAL");
        numOfBlocks++;
        console.log(numOfBlocks);
        if (numOfBlocks % 5 == 0) {
            if (interval > 50) interval -= 30; //kako tece igra, blokovi sve brze i brze padaju
        }
    }
    function drawFigure() {
        updateInterval();
        updateScore(0);
        rotationState = 0; //kada se pravi nova figura uvek se krece od regularnog oblika
        currentBlock = []
        console.log("Krecem sa generisanjem novog bloka");
        completed = 0;
        row = -1;
        col = 4;
        boja = Math.floor(Math.random() * boje);
        if (numOfBlocks == 1) {
            shape = allBlocks[Math.floor(Math.random() * shapes)];
            switch (shape) {
                case 'I-block':
                    shape = 0;
                    break;
                case 'J-block':
                    shape = 1;
                    break;        
                case 'L-block':
                    shape = 2;
                    break; 
                case 'O-block':
                    shape = 3;
                    break; 
                case 'S-block':
                    shape = 4;
                    break; 
                case 'T-block':
                    shape = 5;
                    break; 
                case 'Z-block':
                    shape = 6;
                    break; 
            }
        }
        else {
            shape = nextImg;
        }
        //displaying next block on right window
        next_img();
        console.log("interval je: %d", interval);
        switch (boja) {
            case 0:
                handler = setInterval(function() {
                    slika = 'tetris-dodatno/boje/blue.png';
                    smer = 1;
                    drawBlock(++row, col, slika, shape);
                }, interval);
                break;
            case 1:
                handler = setInterval(function() {
                    slika = 'tetris-dodatno/boje/green.png'
                    smer = 1;
                    drawBlock(++row, col, slika, shape);
                }, interval);
                break;
            case 2:
                handler = setInterval(function() {
                    slika = 'tetris-dodatno/boje/orange.png'
                    smer = 1;
                    drawBlock(++row, col, slika, shape);
                }, interval);
                $(document).keydown(function(event) {
                    if (!lck) {
                        lck = 1
                        handleKeyEvents(event, slika, shape);
                    }
                });
                $(document).keyup(function(event) {
                    lck = 0;
                })
                break;
            case 3:
                handler = setInterval(function() {
                    slika = 'tetris-dodatno/boje/yellow.png'
                    smer = 1;
                    drawBlock(++row, col, slika, shape);
                }, interval);
                $(document).keydown(function(event) {
                    if (!lck) {
                        lck = 1
                        handleKeyEvents(event, slika, shape);
                    }
                });
                $(document).keyup(function(event) {
                    lck = 0;
                })
                break;
        }
        $(document).keydown(function(event) {
            if (!lck) {
                lck = 1
                handleKeyEvents(event, slika, shape);
            }
        });
        $(document).keyup(function(event) {
            lck = 0;
        })
    }

    function handleKeyEvents(event, slika, shape) {
        //eventovi za strelice: DOWN(40), UP(38), LEFT(37), RIGHT(39)
        //if (sem) {
            console.log("Key pressed", event.which);
            if (event.which == 40 && row < rows - 1 && row > -1) {
                //clearBlock()
                smer = 1;
                drawBlock(++row, col, slika, shape);
            }
            if (event.which == 37 && row < rows-1 && row > -1) {
                //clearBlock();
                smer = 0;
                drawBlock(row, --col, slika, shape);
            } 
            if (event.which == 39 && row < rows-1 && row > -1) {
                //clearBlock()
                smer = 2;
                drawBlock(row, ++col, slika, shape);
            };
            if (event.which == 38 && row > -1) {
                rotationState++;
                smer = 3;
                drawBlock(row, col, slika, shape);
            }
            if (event.which == 81) { //slovo q, za zaustavljanje igre
                  obradaKraj();
            }
        //}
    }

    function drawBlock(row, col, slika, s) {
        sem = 0;
        let stop;
        let check = checkIfStop(shape);
        if (check == 1) {
            console.log("check == 1");
            //clearInterval(handler);
            clearTimeout(handler);
            checkIfRowFull();
            drawFigure();
            return;
        }
        clearBlock();   
        switch(shape) {
            case 0: // I - BLOCK
                stop = drawIblock(row, col, slika);
                break;
            case 1: // J - BLOCK
                stop = drawJblock(row, col, slika);
                break;
            case 2: // L - BLOCK
                stop = drawLblock(row, col, slika);
                break;
            case 3: // O - BLOCK
                stop = drawOblock(row, col, slika);
                break;
            case 4: // S - BLOCK
                stop = drawSblock(row, col, slika);
                break;
            case 5: // T - BLOCK
                stop = drawTblock(row, col, slika);
                break;
            case 6: // Z - BLOCK
                stop = drawZblock(row, col, slika);
                break;
        }
        if (stop == 1) {  //treba prekinuti interval i treba krenuti sa iscrtavanjem nove figure
            console.log("Clear zato sto su smer i stop = 1");
            //clearInterval(handler);
            clearTimeout(handler);
            checkIfRowFull();
            drawFigure();
            return;
        }
        sem = 1;
    }

    function checkIfStop(shape) {
        let data;
        let datar;
        if (row == rows-1 && shape != 0) {
            datar = document.getElementById("tr"+(row-1));
            for (let i = 0; i < cols; i++) {
                data = datar.children[i];
                if (data.style.backgroundImage != "") {
                    data.innerHTML = "2";
                }
            }
            return 1;
        }
        else if (row == rows) {
            datar = document.getElementById("tr"+(row-1));
            for (let i = 0; i < cols; i++) {
                let data = datar.children[i];
                if (data.style.backgroundImage != "") {
                    data.innerHTML = "2";
                }
            }
            return 1;
        }
        return 0;
    }

    function checkIfRowFull() {
        let tableRows = document.getElementsByTagName("tr");
        
        for (let i = 0; i < tableRows.length; i++) {
            let rowData = tableRows[i].getElementsByTagName("td");
            let isRowFull = true;
    
            // Check if the row is full
            for (let j = 0; j < rowData.length; j++) {
                if (rowData[j].style.backgroundImage == "") {
                    isRowFull = false;
                    break;
                }
            }
    
            // If the row is full, clear the row and shift rows down
            if (isRowFull) {
                //Updating the score and lines in HTML
                lines++;
                document.getElementById("lines").innerText = lines;
                updateScore(1);
                clearRow(i);
                shiftRowsDown(i);
                i--; // Recheck the same row index as it now contains the above row data
            }
        }
    }
    
    function clearRow(rowIndex) {
        let row = document.getElementById("tr" + rowIndex);
        let rowData = row.getElementsByTagName("td");
        for (let j = 0; j < rowData.length; j++) {
            rowData[j].style.backgroundImage = "";
        }
    }
    
    function shiftRowsDown(fromIndex) {
        for (let i = fromIndex; i > 0; i--) {
            let currentRow = document.getElementById("tr" + i);
            let aboveRow = document.getElementById("tr" + (i - 1));
            let currentRowData = currentRow.getElementsByTagName("td");
            let aboveRowData = aboveRow.getElementsByTagName("td");
    
            for (let j = 0; j < currentRowData.length; j++) {
                currentRowData[j].style.backgroundImage = aboveRowData[j].style.backgroundImage;
            }
        }
    
        // Clear the top row as it has moved down
        let topRow = document.getElementById("tr0");
        let topRowData = topRow.getElementsByTagName("td");
        for (let j = 0; j < topRowData.length; j++) {
            topRowData[j].style.backgroundImage = "";
        }
    }
    

    function drawIblock(row, c, slika) {
        col = c;
        if (rotationState % 2 == 1 && row < rows-3) {
            return I1rotation();
        }
        if (c < 0) col = 0;
        if (c >= 6) col = 6;
        console.log(smer);
        let children = [];
        console.log("Iblock");
        for (let i = 0; i < 4; i++) {
            let trow = document.getElementById("tr"+row);
            let child = trow.children[col+i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        //clearBlock();
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);
        return 0;
        // else {
        //     for (let i = 0; i < 4; i++) {
        //         let trow = document.getElementById("tr"+row);
        //         let child = trow.children[col-i];
        //         child.style.backgroundImage = "url("+slika+")";
        //         children.push(child);
        //     }
        // }
    }

    function I1rotation() {
        console.log("Iblock 1 rotation")
        if (col < 0) col = 0;
        if (col > 9) col = 9;
        let children = [];
        for (let i = 0; i < 4; i++) {
            let trow = document.getElementById("tr"+(row+i));
            let child = trow.children[col];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        //clearBlock();
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);
        if (row == rows-4) {
            row = 24;
            return 1;
        } 
        return 0;
    }

    function drawJblock(row, c, slika) {
        col = c;
        if (rotationState % 4 == 1) {
            return J1rotation();
        }
        if (rotationState % 4 == 2) {
            return J2rotation();
        }
        if (rotationState % 4 == 3) {
            return J3rotation();
        }
        if (c < 2) col = 2;
        if (c >= 9) col = 9;
        let children = [];
        console.log("Jblock");
        if (row == rows-1) row = rows-2;
        let trow = document.getElementById("tr"+row);
        let child = trow.children[col];
        children.push(child);
        if (child.style.backgroundImage != "") {
            return checkIfCollides();
        }
        trow = document.getElementById("tr"+(row+1));
        for (let i = 0; i < 3; i++) {
            let child = trow.children[col - i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        //clearBlock();
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
        // else {
        //     drawLblock(row, col, slika);
        // }   
    }
    
    function J1rotation() {
        if (col > 9) col = 9;
        if (col < 1) col = 1;
        if (row < 1) row = 1;

        let children = [];
        console.log("Jblock 1 rotation");
        //if (row == rows-1) row = rows-2;
        let trow = document.getElementById("tr"+(row - 1));
        let child = trow.children[col-1];
        children.push(child);
        trow = document.getElementById("tr"+(row));
        child = trow.children[col-1];
        children.push(child);
        trow = document.getElementById("tr"+(row + 1));
        child = trow.children[col-1];
        children.push(child);
        trow = document.getElementById("tr"+(row + 1));
        child = trow.children[col];
        children.push(child);

        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        //clearBlock();
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }
    function J2rotation() {
        if (col > 8) col = 8;
        if (col < 1) col = 1;
        let children = [];
        console.log("Jblock 2 rotation");
        let trow = document.getElementById("tr"+(row+1));
        let child = trow.children[col-1];
        children.push(child);
        trow = document.getElementById("tr"+row);
        for (let i = 0; i < 3; i++) {
            child = trow.children[col-1+i];
            children.push(child);
        }
        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }
    function J3rotation() {
        if (col > 9) col = 9;
        if (row < 1) row = 1;
        if (col < 1) col = 1;
        let children = [];
        console.log("Jblock 3 rotation");
        let trow = document.getElementById("tr"+(row-1));
        let child = trow.children[col-1];
        children.push(child);
        for (let i = 0; i < 3; i++) {
            trow = document.getElementById("tr"+(row-1+i));
            child = trow.children[col];
            children.push(child);
        }
        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }

    function drawLblock(row, c, slika) {
        col = c;
        if (rotationState % 4 == 1) {
            return L1rotation();
        }
        if (rotationState % 4 == 2) {
            return L2rotation();
        }
        if (rotationState % 4 == 3) {
            return L3rotation();
        }
        if (c < 0) col = 0;
        if (c >= 7) col = 7;
        let children = [];
        console.log("Lblock");

        let trow = document.getElementById("tr"+row);
        let child = trow.children[col];
        children.push(child);

        if (child.style.backgroundImage != "") {
            return checkIfCollides();
        }

        trow = document.getElementById("tr"+(row+1));
        for (let i = 0; i < 3; i++) {
            let child = trow.children[col+i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
        // }
        // else {
        //     drawJblock(row, col, slika);
        // }
    }
    function L1rotation() {
        let children = [];
        console.log("Lblock 1 rotation");
        if (col < 0) col = 0;
        if (col > 8) col = 8;
        if (row < 1) row = 1;
        let trow = document.getElementById("tr"+(row-1));
        let child = trow.children[col+1];
        children.push(child);
        for (let i = 0; i < 3; i++) {
            trow = document.getElementById("tr"+(row-1+i));
            child = trow.children[col];
            children.push(child);
        }
        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }
    function L2rotation() {
        let children = [];
        console.log("Lblock 2 rotation");
        if (col < 1) col = 1;
        if (col > 8) col = 8;
        let trow = document.getElementById("tr"+row);
        let child;
        for (let i = 0; i < 3; i++) {
            child = trow.children[col-1+i];
            children.push(child);
        }
        trow = document.getElementById("tr"+(row+1));
        child = trow.children[col+1];        
        children.push(child);
        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }
    function L3rotation() {
        let children = [];
        console.log("Lblock 3 rotation");
        if (row < 1) row = 1;
        if (col < 1) col = 1;
        if (col > 9) col = 9;
        
        let trow = document.getElementById("tr"+(row+1));
        let child = trow.children[col];
        children.push(child);
        for (let i = 0; i < 3; i++) {
            trow = document.getElementById("tr"+(row+1-i));
            child = trow.children[col-1];
            children.push(child);
        }
        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }

    function drawOblock(row, c, slika) {
        col = c;
        if (c < 0) col = 0;
        if (c >= 8) col = 8; 
        console.log("Oblock");
        let children = []
        let trow = document.getElementById("tr"+row);
        for (let i = 0; i < 2; i++) {
            let child = trow.children[col+i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }

        }
        trow = document.getElementById("tr"+(row+1));
        for (let i = 0; i < 2; i++) {
            let child = trow.children[col+i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }

        }
        // else {
        //     let trow = document.getElementById("tr"+row);
        //     children.push(trow.children[col]);
        //     children.push(trow.children[col-1]);
        //     trow = document.getElementById("tr"+(row+1));
        //     children.push(trow.children[col]);
        //     children.push(trow.children[col-1]);
        // }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }


    function drawSblock(row, c, slika) {
        if (rotationState % 2 == 1 && row < rows-2) {
            return S1rotation();
        }
        col = c;
        if (c < 2) col = 2;
        if (c >= 9) col = 9;
        console.log("Sblock");
        let children = [];
        let trow = document.getElementById("tr"+row);
        for (let i = 0; i < 2; i++) {
            let child = trow.children[col-i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        trow = document.getElementById("tr"+(row+1));
        for (let i = 1; i < 3; i++) {
            let child = trow.children[col-i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
        // else {
        //     drawZblock(row, col, slika);
        // }
    }
    function S1rotation() {
        let children = [];
        console.log("Sblock 1 rotation");
        if (col < 1) col = 1;
        if (col > 9) col = 9;
        if (row > rows-3) row = rows-3;
        let trow
        let child;
        for (let i = 0; i < 2; i++) {
            trow = document.getElementById("tr"+(row+i));
            child = trow.children[col-1];
            children.push(child);
        }
        for (let i = 1; i < 3; i++) {
            trow = document.getElementById("tr"+(row+i));
            child = trow.children[col];
            children.push(child);
        }

        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        if (row == rows - 3) {
            return 1;
        }
        return 0;
        // else {
        //     drawZblock(row, col, slika);
        // }
    }


    function drawTblock(row, c, slika) {
        col = c;
        if (rotationState % 4 == 1) {
            return T1rotation();
        }
        if (rotationState % 4 == 2) {
            return T2rotation();
        }
        if (rotationState % 4 == 3) {
            return T3rotation();
        }
        if (col < 1) col = 1;
        if (col >= 8) col = 8;
        let children = [];
        console.log("Tblock");

        let trow = document.getElementById("tr"+row);
        let child = trow.children[col];
        children.push(child);
        if (child.style.backgroundImage != "") {
            return checkIfCollides();
        }

        trow = document.getElementById("tr"+(row+1));
        child = trow.children[col];
        children.push(child);
        if (child.style.backgroundImage != "") {
            return checkIfCollides();
        }
        child = trow.children[col-1];
        children.push(child);
        if (child.style.backgroundImage != "") {
            return checkIfCollides();
        }
        child = trow.children[col+1];
        children.push(child);
        if (child.style.backgroundImage != "") {
            return checkIfCollides();
        }

        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
    }
    function T1rotation() {
        children = [];
        console.log("Tblock 1 rotation");

        if (col < 0) col = 0;
        if (col > 8) col = 8;
        if (row > rows-3) row = rows-3;

        let trow = document.getElementById("tr"+row);
        let child = trow.children[col];
        children.push(child);
        trow = document.getElementById("tr"+(row+1));
        child = trow.children[col];
        children.push(child);
        child = trow.children[col+1];
        children.push(child);
        trow = document.getElementById("tr"+(row+2));
        child = trow.children[col];
        children.push(child);

        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        if (row == rows-3) return 1;
        return 0;
    }
    function T2rotation() {
        children = [];
        console.log("Tblock 2 rotation");
        if (col < 1) col = 1;
        if (col > 8) col = 8;
        if (row > rows-2) row = rows-2;

        let trow = document.getElementById("tr"+row);
        let child;
        for (let i = 0; i < 3; i++) {
            child = trow.children[col-1+i];
            children.push(child);
        }
        trow = document.getElementById("tr"+(row+1));
        child = trow.children[col];
        children.push(child);

        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        if (row == rows-2) return 1;
        return 0;
    }
    function T3rotation() {
        children = [];
        console.log("Tblock 3 rotation");

        if (col < 1) col = 1;
        if (col > 9) col = 9;
        if (row > rows-3) row = rows-3;

        let trow = document.getElementById("tr"+row);
        let child = trow.children[col];
        children.push(child);
        trow = document.getElementById("tr"+(row+1));
        child = trow.children[col];
        children.push(child);
        child = trow.children[col-1];
        children.push(child);
        trow = document.getElementById("tr"+(row+2));
        child = trow.children[col];
        children.push(child);

        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        if (row == rows-3) return 1;
        return 0;
    }

    function drawZblock(row, c, slika) {
        col = c;
        if (rotationState % 2 == 1 && row < rows-2) {
            return Z1rotation();
        }
        if (c < 0) col = 0;
        if (c >= 7) col = 7;
        let children = [];
        console.log("Zblock");
        let trow = document.getElementById("tr"+row);
        for (let i = 0; i < 2; i++) {
            let child = trow.children[col+i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        trow = document.getElementById("tr"+(row+1));
        for (let i = 1; i < 3; i++) {
            let child = trow.children[col+i];
            children.push(child);
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }

        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        return 0;
        // else {
        //     drawSblock(row, col, slika);
        // }
    }
    function Z1rotation() {
        children = [];
        console.log("Zblock 1 rotation");
        if (col < 0) col = 0;
        if (col > 8) col = 8;
        if (row > rows-3) row = rows - 3;

        let trow;
        let child;
        for (let i = 0; i < 2; i++) {
            trow = document.getElementById("tr"+(row+i));
            child = trow.children[col+1];
            children.push(child);
        }
        for (let i = 1; i < 3; i++) {
            trow = document.getElementById("tr"+(row+i));
            child = trow.children[col];
            children.push(child);
        }
        for (let i = 0; i < 4; i++) {
            child = children[i];
            if (child.style.backgroundImage != "") {
                return checkIfCollides();
            }
        }
        children.forEach(child => {
            child.style.backgroundImage = "url("+slika+")"
        });
        currentBlock = children;
        currentBlock.push(row);
        console.log("Row position: %d", row);

        if (row == rows - 3) {
            return 1;
        }
        return 0;

    }

    function checkIfCollides() {
        if (smer == 2) {
            col--;
        }
        else if (smer == 0) {
            col++;
        }
        for (let i = 0; i < currentBlock.length-1; i++) {
            currentBlock[i].style.backgroundImage = "url("+slika+")";
        }

        switch(shape) {
            case 0:  //IBLOCK
                console.log("Usao sam u I checkifCollides");
                if (currentBlock[currentBlock.length-1] != row) {
                    console.log("currBlock length je isto sto i row");
                    if (row == 0) {
                        completed = 1;
                        obradaKraj();
                    }
                    return 1;
                }
                else {
                    if (smer == 3) {
                        rotationState--;
                    }
                    console.log("Sudaram se sa blokom pored")
                    return 0;
                }
            case 1:  //JBLOCK
                console.log("Usao sam u J checkifCollides");
                if (rotationState%4 == 0 || rotationState%4 == 2) {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
                else {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1 && currentBlock[currentBlock.length-1] != row+2) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
            case 2:  //LBLOCK
                console.log("Usao sam u L checkifCollides");

                if (rotationState%4 == 0 || rotationState%4 == 2) {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
                else {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1 && currentBlock[currentBlock.length-1] != row+2) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
            case 3: //OBLOCK
                console.log("Usao sam u O checkifCollides");
                if (rotationState%4 == 0 || rotationState%4 == 2) {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
            case 4: //SBLOCK
                console.log("Usao sam u S checkifCollides");

                if (rotationState%2 == 1) {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1 && currentBlock[currentBlock.length-1] != row+2) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
                else {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
            case 5: //TBLOCK
                console.log("Usao sam u T checkifCollides");
                if (rotationState%4 == 0 || rotationState%4 == 2) {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
                else {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1 && currentBlock[currentBlock.length-1] != row+2) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 0) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
            case 6: //ZBLOCK
                console.log("Usao sam u Z checkifCollides");

                if (rotationState%2 == 1) {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1 && currentBlock[currentBlock.length-1] != row+2) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 1) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }
                else {
                    if (currentBlock[currentBlock.length-1] != row && currentBlock[currentBlock.length-1] != row+1) {
                        console.log("currBlock length je isto sto i row")
                        if (row == 1) {
                            completed = 1;
                            obradaKraj();
                        }
                        return 1;
                    }
                    else {
                        if (smer == 3) {
                            rotationState--;
                        }
                        console.log("Sudaram se sa blokom pored")
                        return 0;
                    }
                }

        }
    }

    function clearBlock() {
        console.log(currentBlock);
        for (let i = 0; i < currentBlock.length-1; i++) {
            currentBlock[i].style.backgroundImage = "";
        }
    }

    function obradaKraj() {
        let endGame;
        if (completed == 0) {
            endGame = confirm("Da li stvarno zelite da zavrsite sa igrom?")
            if (!endGame) return;
        }        
        alert("Igra zavrsena");
        //clearInterval(handler);
        completed = 1;
        clearTimeout(handler);
        // for (let i = 0; i < rows-1; i++) {
        //     trow = document.getElementById("tr"+i);
        //     for (let j = 0; j < cols-1; j++) {
        //         child = trow.children[j];
        //         child.style.backgroundImage = "";
        //     }
        // }
        let name = prompt("Unesite svoje ime: ");
        let rezultati = JSON.parse(localStorage.getItem("rezultati")) || {};
        rezultati[name] = score;
        localStorage.setItem("rezultati", JSON.stringify(rezultati));
        let mostrecent = name + " - " + score;
        localStorage.setItem("mostRecent", JSON.stringify(mostrecent));
        window.location.href = "tetris-rezultati.html"
    }
})