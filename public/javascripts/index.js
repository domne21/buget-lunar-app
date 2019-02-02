function load() {
    $.ajax('data/transactions.json').done(function (transactions) {
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
    
    $.post('/transactions/create', {
        date,
        categories,
        ammount,
        transId
    }).done(function(response){
        console.warn('done creating transaction', response);
        if (response.success) {
            console.info('reloading..')
            load();
        }
    });
}

function display(transactions) {
    var rows = transactions.map(function (transaction) {
        return `<tr>
            <td>${transaction.date}</td>
            <td>${transaction.categories}</td>
            <td>${transaction.ammount} RON </td>
            <td>
                <a href="/transactions/delete?transId=${transaction.transId}">&#10006;</a>
                <a href="#" class="edit" data-id="${transaction.transId}">&#9998;</a>
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
        transToEdit = this.getAttribute('data-id');

        var transaction = globalTransactions.find(function(transaction){
            return transaction.transId == transToEdit;
        });
        console.log('edit', transToEdit, transaction);
        
        document.querySelector('input[name=date]').value = transaction.date;
        $('input[name=categories]').val(contact.categories);
        $('input[name=ammount]').val(contact.ammount);
        $('input[name=transId]').val(contact.transId);

    });
}

initEvents();
load();