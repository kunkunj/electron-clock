(function () {
  function insertAnimate(left, top) {
    let svg = `<svg t="1680598961126" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"  style=“fill:currentColor;”><path d="M890.2 208.2c-91.8-91.9-242.1-91.9-334 0L544.4 220c-18.2 18.2-47.6 18.2-65.8 0l-11.8-11.8c-91.9-91.9-242.1-91.9-334 0C41 300 24.7 533.9 203.6 722.1 304 827.8 412.4 882.3 470 905.9c26.6 10.9 56.5 10.9 83 0 57.6-23.6 166-78.1 266.4-183.8 178.9-188.2 162.6-422 70.8-513.9z" p-id="10135"></path></svg>`;
    let odiv = document.createElement("div");
    odiv.className = "my_click_animate";
    odiv.innerHTML = svg;
    odiv.style.left = left - 25 + "px";
    odiv.style.top = top - 25 + "px";
    document.body.appendChild(odiv);
    setTimeout(() => {
        document.body.removeChild(odiv);
    }, 600);
  }
  window.addEventListener("click", (e) => {
    insertAnimate(e.clientX, e.clientY);
  });
})();
