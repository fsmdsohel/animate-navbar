const section = document.querySelectorAll("section");
const bubble = document.querySelector(".bubble");
const gradients = [
  "linear-gradient(to right top, #ef473a, #cb2d3e)",
  "linear-gradient(to right top, #904e95, #e96443)",
  "linear-gradient(to right top, #e73827, #f85032)",
];
const options = {
  threshold: 0.7,
};
let observer = new IntersectionObserver(navCheck, options);

let entriesStore = [];

function navCheck(entries) {
  entries ? entriesStore = entries : '';
  entriesStore.forEach((entry) => {
    const className = entry.target.className;
    const activeAnchor = document.querySelector(`[data-page=${className}]`);
    const gradientIndex = entry.target.getAttribute("data-index");
    const coords = activeAnchor.getBoundingClientRect();
    const directions = {
      height: coords.height,
      width: coords.width,
      top: coords.top,
      left: coords.left,
    };
    if (entry.isIntersecting) {
      bubble.style.setProperty("left", `${directions.left}px`);
      bubble.style.setProperty("top", `${directions.top}px`);
      bubble.style.setProperty("width", `${directions.width}px`);
      bubble.style.setProperty("height", `${directions.height}px`);
      bubble.style.background = gradients[gradientIndex];
    }
  });
}

section.forEach((section) => {
  observer.observe(section);
});
window.addEventListener("resize",()=>{
  navCheck();
})