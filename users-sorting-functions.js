let sortOrder = 1;
let sortedBy = null;
let sort = null;

function updateSortOrder(clickedColumn) {
    sort = clickedColumn.data('sort');
    if (sortedBy) {
        $(`.custom-sort-column[data-sort=${sortedBy}]`).css("background-color", "");
    }

    if (sort !== sortedBy) {
        sortOrder = 1;
        clickedColumn.css("background-color", "blue");
    } else {
        if (sortOrder === 1) {
            sortOrder = -1;
            clickedColumn.css("background-color", "red");
        } else {
            sortOrder = 1;
            clickedColumn.css("background-color", "blue");
        }
    }
}

function sortUsers() {
    // @todo: load users with different get params
    users.sort(function (a, b) {
        if (a[sort] < b[sort]) {
            return -1 * sortOrder;
        }
        if (a[sort] > b[sort]) {
            return sortOrder;
        }
        return 0;
    });
    sortedBy = sort;
}
