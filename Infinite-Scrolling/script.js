var listElement = document.querySelector('#infinite-list');


var nextItem = 1;
// load more items
var loadMore = function () {
    for (var i = 0; i < 20; i++) {
        var item = document.createElement('li');
        item.innerText = 'Item ' + nextItem++;
        listElement.appendChild(item);
    }
}

// load more on scroll
listElement.addEventListener('scroll', function () {
    if (listElement.scrollTop + listElement.clientHeight >= listElement.scrollHeight) {
        loadMore();
    }
});

loadMore();
