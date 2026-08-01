const TransactionHistory = ({ transactions }) => {

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NP", {
            style: "currency",
            currency: "NPR",
        }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const recentTransactions = transactions.slice(0, 5);
    return (
        <section className="history-panel">
            {recentTransactions.length === 0 ? (
                <div className="empty-history">
                    No Recent Transactions
                </div>
            ) : (
                <>
                    <h2 className="recent-history-title">Recent 5 Transactions</h2>
                    <div className="transaction-list">
                        {recentTransactions.map(transaction => (
                            <div key={transaction._id} className="transaction-item">

                                <div className="transaction-info">
                                    <span className="transaction-category">
                                        {transaction.category}
                                    </span>
                                    <span className="transaction-data">
                                        {formatDate(transaction.date)}
                                    </span>
                                    {transaction.notes && (
                                        <span className="transaction-notes">
                                            {transaction.notes}
                                        </span>
                                    )}
                                </div>

                                <span className={`transaction-amount ${transaction.type}`}>
                                    {transaction.type === 'income' ? '+' : '-'}
                                    {formatCurrency(transaction.amount)}
                                </span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}
export default TransactionHistory;
