const svg = document.querySelector("#svg")
const path = document.querySelector("#path")
const cGroup = document.querySelector("#circle-group")

let a = []



svg.addEventListener("click", function (e) {
  if(e.target.id==='C0') return end()
  svgwidth = svg.clientWidth;
  svgheight = svg.clientHeight;
  actualx = Math.floor((e.x / svgwidth) * 100 - 1);
  actualy = Math.floor((e.y / svgheight) * 100 - 1);
  let point = { x: actualx, y: actualy }
  a.push(point);
  // console.log(a)
  drawsvg();
});

function drawsvg() {
  let d;
  cGroup.innerHTML = "";
  for (i = 0; i < a.length; i++) {
    if (i == 0) {
      d = `M ${a[i].x} ${a[i].y}`
    } else {
      d += `L ${a[i].x} ${a[i].y}`
    }

    drawCircle(a[i], i === a.length - 1,i)
  }

  path.setAttribute("d", d)
}

function drawCircle(point, isLast, i) {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle")

  c.classList.add("circle")
  c.setAttribute("r", 1)
  c.setAttribute("cx", point.x)
  c.setAttribute("cy", point.y)
  c.setAttribute("fill", "white")
  if (isLast) c.setAttribute("fill", "red") 
  c.setAttribute("id", `C${i}`)

  cGroup.appendChild(c);
}

function undo(){
  a.pop();
  drawsvg();
}

function reset(){
  a=[""]
  drawsvg()
  location.reload()
}

function end(){
  let d = path.getAttribute('d')
  d+='Z'
  path.setAttribute('d', d)
}
