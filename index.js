const hiddenMenu = document.querySelectorAll('.menu__box');
const body = document.getElementsByTagName('body');
const item = document.querySelectorAll('.item');
const cartButton = document.querySelectorAll('.fa-shopping-cart');
const alertElement = document.getElementById('alert');
const images = document.querySelectorAll('.img');
const brandModel = document.querySelectorAll(".brand-model");
const cartContainer = document.querySelectorAll(".cart");
let discount = document.querySelectorAll('.discountNum');
let actualPrice = document.querySelectorAll('.actual-price');
let price = document.querySelectorAll('.price');
const counter = document.getElementById('count-items');
const allProductsButton = document.getElementById('all-products');
let productsInCart = 0;
let loadedItems = 0;
let cardLimit = 27;
const loadMoreButton = document.getElementById('load-more');
const categories = document.querySelectorAll('.category');
const sortContainer = document.getElementById('sort-container');
const sortDropDown = document.querySelectorAll('.dropdown-content');
const sortDom = document.querySelectorAll('.sort');
const userProducts = document.getElementById('userProducts');

function myFunction(x) {
    x.classList.toggle("change");
    hiddenMenu.forEach(element => {
        element.classList.toggle("menuActive")
    });
    body[0].classList.toggle('stopScrolling');
  }


function filterDrop(className){
    let arrow = document.querySelectorAll('.arrow');
    if(className === ".list"){
        arrow[1].classList.toggle('down');
        arrow[1].classList.toggle('up');
    }
    else if(className ===".dropdown-content"){
        arrow[0].classList.toggle('down');
        arrow[0].classList.toggle('up');
    }
    else{
        arrow[2].classList.toggle('down');
        arrow[2].classList.toggle('up');
    }
    let element = document.querySelectorAll(className);
    element.forEach(el => {
        el.classList.toggle('hideList')
    });
}


function largeImg (el){
    if(el.childNodes[1] === undefined){
    let child = el.childNodes[0]

        child.classList.toggle('large-img')
        child.classList.toggle('img')
    }
    else{
    let child = el.childNodes[1]

    child.classList.toggle('large-img')
    child.classList.toggle('img')
    }
}

function normalImg (el){
    if(el.childNodes[1] === undefined){
        let child = el.childNodes[0]
        child.classList.toggle('img')
        child.classList.toggle('large-img')
    }
    else{
        let child = el.childNodes[1]

        child.classList.toggle('img')
        child.classList.toggle('large-img')
    }

}



function showPurchase(){
    productsInCart += 1;
    alertElement.style.display = "block";
    setTimeout(() => {
        alertElement.style.display = "none"
    }, 5000);
    userProducts.innerHTML = `${productsInCart} items <span class="userProductsCart"><i class="fa fa-shopping-cart"></i></span>`
}


const hideSort = () => {
    let arrow = document.querySelectorAll('.arrow');
    sortDropDown.forEach(x =>{
        x.classList.toggle('hideList');
        arrow[0].classList.toggle('down');
        arrow[0].classList.toggle('up');
    })
}


function reArrange(arr){

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

let allProductsCategory = false;
let watchesCategory = false;
let jewelleryCategory = false;
let isCategoryClicked = false;
let isSortClicked = false;
let az = false;
let za = false;
let ascending = false;
let descending = false;

function changeStatus(input){
    switch(input){
        case "All Products":
            allProductsCategory = true;
            watchesCategory = false;
            jewelleryCategory = false;
            break;
        case "Watches":
            allProductsCategory = false;
            watchesCategory = true;
            jewelleryCategory = false;
            break;
        case "Jewellery":
            allProductsCategory = false;
            watchesCategory = false;
            jewelleryCategory = true;
            break;
        case "a-z":
            az = true;
            za = false;
            ascending = false;
            descending = false;
            isSortClicked = true;
            break;
        case "z-a":
            az = false;
            za = true;
            ascending = false;
            descending = false;
            isSortClicked = true;
            break;
        case "ascending":
            az = false;
            za = false;
            ascending = true;
            descending = false;
            isSortClicked = true;
            break;        
        case "descending":
            az = false;
            za = false;
            ascending = false;
            descending = true;
            isSortClicked = true;
            break;

    }
}
const resetSort = () =>{
    isSortClicked = false;
    az = false;
    za = false;
    ascending = false;
    descending = false;
    isLoadMoreActive = false;
}
let isLoadMoreActive = false;
let initial = false;

async function main(){
    let fetchedData = await fetchData()
    let dataFromFile = [];
    dataFromFile.push(fetchedData.rolex);
    dataFromFile.push(fetchedData.heuer);
    dataFromFile.push(fetchedData.jewellery);
    let rolex = dataFromFile[0];
    let heuer = dataFromFile[1];
    let watches = [...rolex, ...heuer];
    let jewellery = dataFromFile[2];
    let allProducts = [...rolex, ...heuer, ...jewellery];
    let sortedArray = [];
    let sortedInitial = [];

    reArrange(allProducts);   // !!!! optional functionality !!!!


    function initialLoad(numOfProductsToLoad, itemsToLoad){
        for(let i = 0; i < numOfProductsToLoad; i++){
            createItem(itemsToLoad, i)
        }
        
    }
    initialLoad(8, allProducts)



    counter.textContent = `${loadedItems} out of ${allProducts.length} products`

    
    function showCategory(){
        const itemContainer = document.querySelectorAll('.item');
        itemContainer.forEach(item => {
            item.parentNode.removeChild(item);
        });
        loadedItems = 0;
        initial = true;
        if(allProductsCategory){
            if(isSortClicked === false){
                initialLoad(8, allProducts);
                counter.textContent = `${loadedItems} out of ${allProducts.length} products`;
                isCategoryClicked = true;
            }
            else if(isSortClicked){
                 sortItems(allProducts);
                 initialLoad(8, sortedInitial)
                 counter.textContent = `${loadedItems} out of ${allProducts.length} products`;
            }
        }
        else if(watchesCategory){
            if(isSortClicked === false){
                initialLoad(8, watches);
                counter.textContent = `${loadedItems} out of ${watches.length} products`
                isCategoryClicked = true;
            }
            else if(isSortClicked){
                sortItems(watches);
                initialLoad(8, sortedInitial);
                counter.textContent = `${loadedItems} out of ${watches.length} products`;
            }
        }
        else if(jewelleryCategory){
            if(isSortClicked === false){
                initialLoad(8, jewellery);
                counter.textContent = `${loadedItems} out of ${jewellery.length} products`
                isCategoryClicked = true;
            }
            else if(isSortClicked){
                sortItems(jewellery);
                initialLoad(8, sortedInitial);
                counter.textContent = `${loadedItems} out of ${jewellery.length} products`;
            }
        }
        else if(isCategoryClicked === false && isSortClicked){
            sortItems(allProducts);
            initialLoad(8, sortedInitial)
            counter.textContent = `${loadedItems} out of ${allProducts.length} products`;
        }

        loadMoreButton.disabled = false;
    }

    categories.forEach((el) => {
        el.addEventListener('click', showCategory);
    });

    sortDom.forEach((el) => {
        el.addEventListener('click', showCategory);
    });

    const sortItems = (array) =>{
        sortedArray = array.slice();
        if(az){
            sortedArray.sort((a, b) => a.model.localeCompare(b.model));
        }
        else if(za){
            sortedArray.sort((a, b) => b.model.localeCompare(a.model));
        }
        else if(ascending){
            sortedArray.sort((a, b) => a.price - b.price);
        }
        else if(descending){
            sortedArray.sort((a, b) => b.price - a.price);
        }

        if(initial){
            sortedInitial = sortedArray.slice(0, 8);
            sortedInitial.reverse();
        }
    }


    ///////////
    let listener = function () {
        initial = false;
        if(allProductsCategory && isCategoryClicked){
            if(isSortClicked === false){
                return loadMore(allProducts);
            }
            else if(isSortClicked){
                return loadMore(sortedArray);
            }
        }
        else if(watchesCategory && isCategoryClicked){
            if(isSortClicked === false){
                return loadMore(watches);
            }
            else if(isSortClicked){
                return loadMore(sortedArray);
            }
        }
        else if(jewelleryCategory && isCategoryClicked){
            if(isSortClicked === false){
                return loadMore(jewellery);
            }
            else if(isSortClicked){
                return loadMore(sortedArray);
            }
        }
        else{
            if(isSortClicked === false){
                return loadMore(allProducts);
            }
            else if(isSortClicked){
                console.log(sortedArray)
                return loadMore(sortedArray);
            }
        }
    }

    loadMoreButton.addEventListener('click', listener);

    function createItem(arrayToLoad, index){
        let container = document.createElement('div');
            container.className = 'item';
            
            let img = document.createElement('img');
            img.className = 'img';
            img.src = arrayToLoad[index].imgUrl;
            let imgContainer = document.createElement('div');
            imgContainer.appendChild(img);
            imgContainer.onmouseenter = function() {
                largeImg(this);
            };
            imgContainer.onmouseleave = function() {
                normalImg(this);
            };
    
    
            let brandElement = document.createElement('p');
            brandElement.className = 'brand-model';
            brandElement.innerHTML = `<span class="brand-text">${arrayToLoad[index].brand}</span> ${arrayToLoad[index].model}`
    
            let priceElement = document.createElement('p');
            let discountElement = document.createElement('p');
            priceElement.className = 'price';
            discountElement.className = 'discounted-price';
    
            let cartElement = document.createElement('p');
            cartElement.classList = 'cart';
            cartElement.textContent = "Add to cart: "
    
            let cartIconElement = document.createElement('i');
            cartIconElement.classList.add('fa', 'fa-shopping-cart');
            cartIconElement.onclick = showPurchase;
            cartElement.appendChild(cartIconElement);
    
            container.appendChild(imgContainer);
            container.appendChild(brandElement);
    
            if(arrayToLoad[index].discount !== undefined){
                priceElement.textContent = `${arrayToLoad[index].discount} EUR`;
                discountElement.textContent = `${arrayToLoad[index].price} EUR`;
                container.appendChild(discountElement);
                container.appendChild(priceElement);
             }
              else{
                 priceElement.textContent = `${arrayToLoad[index].price} EUR`; 
                 container.appendChild(priceElement);  
             }
    
             container.appendChild(cartElement);

             if(isLoadMoreActive){
                let itemFunc = document.querySelectorAll('.item');
                itemFunc[itemFunc.length - 1].insertAdjacentElement("afterend", container);
             }
             else{
                let referenceElement = document.querySelectorAll('.counter');
                referenceElement[0].insertAdjacentElement('afterend', container);
             }

    
             loadedItems += 1;
        }




    const itemsPerClick = 4;
    let indexForSort = 0;
    function loadMore(array){
        isLoadMoreActive = true;
        const batchStart = loadedItems;
        const batchEnd = Math.min(batchStart + itemsPerClick, array.length)

        for(let i = batchStart; i < batchEnd; i++ ){
            /*(if(array[i] === undefined){
                //loadMoreButton.disabled = true;
                break;
            } */
            if(isSortClicked){
                if(indexForSort > 3){
                    indexForSort = 0;
                }
                let sorted = array.slice(batchStart, batchEnd);
                //sorted.reverse();
                console.log(sorted[indexForSort])
                createItem(sorted, indexForSort);
                indexForSort++;

            }
            /////
            else{
                createItem(array, loadedItems);
            }
            if (loadedItems >= array.length) {
                loadMoreButton.disabled = true;
                isCategoryClicked = false;
                jewelleryCategory =false;
                watchesCategory = false;
                allProductsCategory = false;
                isLoadMoreActive =  false;
                indexForSort = 0;
                az = false;
                za = false;
                ascending = false;
                descending = false;
                isSortClicked = false;
                counter.textContent = `${array.length} out of ${array.length} products`;
            }
            else{
                counter.textContent = `${loadedItems} out of ${array.length} products`;
            }
        }
    }
}
main()

