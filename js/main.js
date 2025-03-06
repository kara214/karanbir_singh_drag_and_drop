let theThumbnails = document.querySelectorAll('#buttonHolder img'),
    gameBoard = document.querySelector('.puzzle-board'),
    pzlPieces = document.querySelectorAll('.puzzle-pieces img'),
    dropZones = document.querySelectorAll('.drop-zone'),
    resetPieces = document.querySelector('.reset-pieces');

function changeImageSet() {
    console.log('Changing puzzle image set');

    gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgref}.jpg)`;

    pzlPieces.forEach((piece, index) => {
        piece.src = `images/${piece.id}${this.dataset.bgref}.jpg`;
    });
}

function allowDrag(event) {
    console.log(`Started dragging: ${this.id}`);

    event.dataTransfer.setData('draggedEl', this.id);
}

function allowDragOver(event) {
    event.preventDefault();
    console.log('Dragging over a drop zone');
}

function allowDrop(event) {
    event.preventDefault();

    let droppedElId = event.dataTransfer.getData('draggedEl');
    let droppedEl = document.querySelector(`#${droppedElId}`);

    if (this.children.length === 0) {
        if (this.classList.contains(droppedElId)) {
            this.appendChild(droppedEl);
            console.log(`Placed ${droppedElId} correctly!`);
        } else {
            console.log(`Wrong spot! ${droppedElId} doesn't belong here.`);
        }
    } else {
        console.log('Drop zone is already occupied!');
    }
}

theThumbnails.forEach(thumbnail => thumbnail.addEventListener('click', changeImageSet));
pzlPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

dropZones.forEach(zone => {
    zone.addEventListener('dragover', allowDragOver);
    zone.addEventListener('drop', allowDrop);
});

