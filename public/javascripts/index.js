function loadExpenses() {
    $.ajax('data/expenses.json').done(function(expenses){
        console.info('contacts loaded', expenses);
        window.globalExpenses = expenses;
        displayContacts(expenses);
    });
}