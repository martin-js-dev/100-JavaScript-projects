const slider = [
    {
      id: 1,
      title: "Nike All Star",
      img:
        "https://images.unsplash.com/photo-1597248881519-db089d3744a5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      title: "Nike Sport",
      img:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      title: "Fila off-white",
      img:
        "https://images.unsplash.com/photo-1550399865-ec7d23b18e8e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=340&q=80",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      title: "Converse All Star",
      img:
        "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=708&q=80",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
    {
      id: 5,
      title: "New Balance ",
      img:
        "https://images.unsplash.com/photo-1465453869711-7e174808ace9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    },
];


const img = document.getElementById("brand-img");
const brand = document.getElementById("brand");
const info = document.getElementById("info");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");



  let currentItem = 0;
  

  window.addEventListener("DOMContentLoaded", function () {
    const item = slider[currentItem];
    img.src = item.img;
    brand.textContent = item.title;
    info.textContent = item.text;
  });
  

  function showBrand(sneakers) {
    const item = slider[sneakers];
    img.src = item.img;
    brand.textContent = item.title;
    info.textContent = item.text;
  }

  nextBtn.addEventListener("click", function () {
    currentItem++;
    if (currentItem > slider.length - 1) {
      currentItem = 0;
    }
    showBrand(currentItem);
  });

  prevBtn.addEventListener("click", function () {
    currentItem--;
    if (currentItem < 0) {
      currentItem = slider.length - 1;
    }
    showBrand(currentItem);
  });
  
