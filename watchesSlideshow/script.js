const productWrapper = document.querySelector('.product-wrapper')
const descriptionP = document.querySelector('.description')
const watchImage = document.querySelector('.watch-image')
const wName = document.querySelector('.w-name')
const priceW = document.querySelector('.price')

const watches = [

    {
        name: 'Luxury Watch AW1428-53X',
        price: '$479.99 USD',
        img: 'img/watch-2.jpg',
        description:

            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis recusandae illum provident numquam exercitationem explicabo aspernatur cupiditate, minima maxime facere, architecto aperiam molestias dicta ad asperiores eius voluptatem ipsa alias."
    },
    {
        name: ' Laguna 40 Leather Sand Navy',
        price: '$779.99 USD',
        img: 'img/watch-4.jpg',
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis recusandae illum provident numquam exercitationem explicabo aspernatur cupiditate.",
    },
    {
        name: ' Premium Watch AW1428-53X',
        price: '$179.99 USD',
        img: 'img/watch-5.jpg',
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis recusandae illum provident numquam exercitationem .",
    },
    {
        name: ' Citizen Endeavour Watch AW1428-53X',
        price: '$259.99 USD',
        img: 'img/watch-6.jpg',
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis recusandae illum provident numquam exercitationem explicabo aspernatur cupiditate, minima maxime facere, architecto aperiam molestias dicta ad asperiores eius voluptatem ipsa alias.",
    },

]

let slide = 1

function upadateWatch() {
    const { name, price, img, description } = watches[slide]

    descriptionP.innerHTML = description
    watchImage.src = img
    wName.innerHTML = name
    priceW.innerHTML = price

    slide++

    if (slide > watches.length - 1) {
        slide = 0
    }
}

setInterval(upadateWatch, 10000)
