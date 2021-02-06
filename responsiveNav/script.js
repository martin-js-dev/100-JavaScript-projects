let navbar = document.querySelector(".navbar")
let ham = document.querySelector(".ham")


function toggleHam(){
  navbar.classList.toggle("showNav")
  ham.classList.toggle("showClose")
}

ham.addEventListener("click", toggleHam)


let links = document.querySelectorAll(".link")
links.forEach( 
  function(link) { 
    link.addEventListener("click", toggleHam) 
  }
)
