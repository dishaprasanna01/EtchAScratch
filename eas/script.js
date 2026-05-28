const container = document.querySelector('#container');

let mode="black";

for (let i=0;i<256;i++){
  const square = document.createElement("div");
  square.classList.add("square");

  square.addEventListener("mouseover",()=>{
    if(mode==="black"){
      square.style.backgroundColor="black";
    }
    else if(mode==="rainbow"){
      let r=Math.round(Math.random()*255);
      let g=Math.round(Math.random()*255);
      let b=Math.round(Math.random()*255);
      square.style.backgroundColor=`rgb(${r},${g},${b})`;
    }
    else if(mode==="color"){
      square.style.backgroundColor=colorPicker.value;
    }
  })
  container.appendChild(square);
}


const clearBtn = document.querySelector("#clear");

clearBtn.addEventListener("click", () => {

  const squares = document.querySelectorAll(".square");

  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = "white";
  }

});

const blackBtn = document.querySelector("#black");
const rainbowBtn = document.querySelector("#rainbow");

blackBtn.addEventListener("click", () => {
  mode = "black";
});

rainbowBtn.addEventListener("click", () => {
  mode = "rainbow";
});

colorPicker.addEventListener("input", () => {
  mode = "color";
});
