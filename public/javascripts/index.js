function load() {
    $.ajax('data/transactions.json').done(function(transactions){
        console.info('transactions loaded', transactions);
        window.globalTransactions = transactions;
        display(transactions);
    });
}

function getNewRow() {
    return `<tr>
            <td><input type="date" name="date" placeholder="Date"/></td>
            <td><input type="text" list="categories" name="categories" placeholder="Categories"/></td>
            <td><input type="number" step="0.01" name="ammount" placeholder="Ammount"/></td>
        </tr>`;
}

function display(transactions) {
    var rows = transactions.map(function(transaction) {
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