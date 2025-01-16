function toggleCheckbox(checkboxId) {
    let checkbox = document.getElementById(checkboxId);
    checkbox.checked = !checkbox.checked;
}
function proveraIgraj() {
    let praznoblok = 0;
    let praznonivo = true;
    let blokovi = document.getElementsByClassName("blok");
    console.log(blokovi);
    for (let i = 0; i < blokovi.length; i++) {
        let checkbox = blokovi[i].getElementsByTagName("input")
        if (checkbox[0].checked) {
            praznoblok++;
        }
    }
    let nivoi = document.getElementsByClassName("nivoblok")
    for (let i = 0; i < nivoi.length; i++) {
        let radio = nivoi[i].getElementsByTagName("input")
        console.log(radio[0].checked);
        if (radio[0].checked) {
            praznonivo = false;
            localStorage.setItem("nivo", i);
            break;
        }
    }
    console.log(praznoblok);
    if (praznoblok<3) {
        alert("Niste izabrali bar 3 tipa blokova koji ce se prikazivati u igri")
        return;
    }

    if (praznonivo) {
        alert("Niste izabrali nivo")
        return;
    }

    const checkboxes = document.querySelectorAll('.blok input[type="checkbox"]');
    selectedBlocks = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedBlocks.push(checkbox);
        }        
    });
    console.log(selectedBlocks);

    for (let i = 0; i < selectedBlocks.length; i++) {
        selectedBlocks[i] = selectedBlocks[i].name;
    }
    console.log(selectedBlocks);
    localStorage.setItem("selectedBlocks", JSON.stringify(selectedBlocks));

    window.location.href="tetris-igra.html";    
}