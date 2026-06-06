const container = document.querySelector('#container');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.querySelector('#clear');
const blackBtn = document.querySelector('#black');
const rainbowBtn = document.querySelector('#rainbow');
const penEraserBtn = document.getElementById('penEraser');
const gridSize = document.getElementById('gridSize');
const gridSizeValue = document.getElementById('gridSizeValue');
const gridSizeValue2 = document.getElementById('gridSizeValue2');

let mode = 'black';
let tool = 'pen'; // 'pen' or 'eraser'
let mouseDown = false;

document.body.addEventListener('mousedown', () => (mouseDown = true));
document.body.addEventListener('mouseup', () => (mouseDown = false));

function paintSquare(square){
  if(tool === 'eraser'){
    square.style.backgroundColor = 'white';
    return;
  }

  if(mode === 'black'){
    square.style.backgroundColor = 'black';
  } else if(mode === 'rainbow'){
    const r = Math.round(Math.random()*255);
    const g = Math.round(Math.random()*255);
    const b = Math.round(Math.random()*255);
    square.style.backgroundColor = `rgb(${r},${g},${b})`;
  } else if(mode === 'color'){
    square.style.backgroundColor = colorPicker.value;
  }
}

function createGrid(size){
  // clear
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for(let i=0;i<size*size;i++){
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = 'white';
    // paint on click and drag
    square.addEventListener('mousedown', (e)=>{ e.preventDefault(); paintSquare(square); });
    square.addEventListener('mouseover', ()=>{ if(mouseDown) paintSquare(square); });
    container.appendChild(square);
  }
}

// initial grid
createGrid(parseInt(gridSize.value,10) || 16);

clearBtn.addEventListener('click', () => {
  const squares = document.querySelectorAll('.square');
  squares.forEach(s => s.style.backgroundColor = 'white');
});

blackBtn.addEventListener('click', () => { mode = 'black'; });
rainbowBtn.addEventListener('click', () => { mode = 'rainbow'; });
colorPicker.addEventListener('input', () => { mode = 'color'; });

// Pen / Eraser toggle
penEraserBtn.addEventListener('click', () => {
  if(tool === 'pen'){
    tool = 'eraser';
    penEraserBtn.classList.add('active');
    penEraserBtn.textContent = 'Eraser: On';
  } else {
    tool = 'pen';
    penEraserBtn.classList.remove('active');
    penEraserBtn.textContent = 'Eraser';
  }
});

// keep visual active state for color mode buttons
function setActiveColorButton(btn){
  [blackBtn, rainbowBtn].forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
}

blackBtn.addEventListener('click', () => { mode = 'black'; setActiveColorButton(blackBtn); tool='pen'; penEraserBtn.classList.remove('active'); });
rainbowBtn.addEventListener('click', () => { mode = 'rainbow'; setActiveColorButton(rainbowBtn); tool='pen'; penEraserBtn.classList.remove('active'); });
colorPicker.addEventListener('input', () => { mode = 'color'; setActiveColorButton(null); tool='pen'; penEraserBtn.classList.remove('active'); });

// initial active
setActiveColorButton(blackBtn);

gridSize.addEventListener('input', (e)=>{
  const val = parseInt(e.target.value,10);
  gridSizeValue.textContent = val;
  gridSizeValue2.textContent = val;
  createGrid(val);
});
