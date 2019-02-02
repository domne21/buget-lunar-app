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
    console.debug('saving...', date, categories, ammount);
    
    $.post('/transactions/create', {
        date,
        categories,
        ammount
    }).done(function(response){
        console.warn('done creating transaction', response);
    });
}

function display(transactions) {
    var rows = transactions.map(function (transaction) {
        return `<tr>
            <td>${transaction.date}</td>
            <td>${transaction.categories}</td>
            <td>${transaction.ammount} RON </td>
        </tr>`;
    });
    var actions = getNewRow();
    rows.push(actions);

    document.querySelector('tbody').innerHTML = rows.join('');
}

load();
