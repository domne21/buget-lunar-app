var transToEdit = '';

const API_URL = {
    load: function () {
        if (location.host === "domne21.github.io") {
            return `data/transactions.json`
        }
        return 'transactions'
    }
};

function load() {
    $.ajax(API_URL.load()).done(function (transactions) {
        console.info('transactions loaded', transactions);
        window.globalTransactions = transactions;
        display(transactions);
    });
}

function getNewRow() {
    return ``;
}

function save() {
    var date = document.querySelector('input[name=date]').value;
    var categories = $('input[name=categories]').val();
    var ammount = $('input[name=ammount]').val();
    var transId = new Date().getTime();
    console.debug('saving...', date, categories, ammount, transId);

    var actionUrl = transToEdit ? '/transactions/update' : '/transactions/create';

    $.post(actionUrl, {
        id: transToEdit,
        date,
        categories,
        ammount
    }).done(function(response){
        console.warn('done creating/updating transaction', response);
        transToEdit='';
        if (response.success) {
            console.info('reloading..')
            load();
        }
    });
}

function update(editButton) {
    transToEdit = editButton.getAttribute('data-id');

    var transaction = globalTransactions.find(function (transaction) {
        return transaction.id == transToEdit;
    });
    console.log('edit', transToEdit, transaction);

    document.querySelector('input[name=date]').value = transaction.date;
    $('input[name=categories]').val(transaction.categories);
    $('input[name=ammount]').val(transaction.ammount);
    $('input[name=transId]').val(transaction.transId);
}

function display(transactions) {
    var rows = transactions.map(function (transaction) {
        return `<tr>
            <td>${transaction.date}</td>
            <td>${transaction.categories}</td>
            <td>${transaction.ammount} RON </td>
            <td>
                <a href="/transactions/delete?id=${transaction.id}">&#10006;</a>
                <a href="#" class="edit" data-id="${transaction.id}">&#9998;</a>
            </td>
        </tr>`;
    });
    var actions = getNewRow();
    rows.push(actions);

    document.querySelector('tbody').innerHTML = rows.join('');
}

function initEvents() {
    // TODO use native click
    $("tbody").delegate( "a.edit", "click", function() {
        update(this);
    });
}

function doSearch() {
    var valueDate = $('input[name=dateS]').val();
    var valueCategory = $('input[name=categoriesS]').val();
    var valueAmmount = $('input[name=ammountS]').val();

    console.info('am luat valoarea', valueDate, valueCategory, valueAmmount);

    var filteredTransactions = globalTransactions.filter(function (transaction) {
        return transaction.date.includes(valueDate) &&
        transaction.categories.includes(valueCategory) &&
        transaction.ammount.includes(valueAmmount);
    });

    display(filteredTransactions);
}

initEvents();
load();