
const SummaryCards = ({ balance }) => {

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-NP", {
            style: "currency",
            currency: "NPR",
        }).format(amount);
    };
    return (
        <div className="summary-cards">

            {/* For Expenses */}
            <article className="summary-card expenses">
                <span>Expenses</span>
                <strong>{formatCurrency(balance.expenses)}</strong>
            </article>

            {/* For Income */}
            <article className="summary-card income">
                <span>Income</span>
                <strong>{formatCurrency(balance.income)}</strong>
            </article>

            {/* For Balance */}
            <article className="summary-card balance">
                <span>Balance</span>
                <strong>{formatCurrency(balance.balance)}</strong>
            </article>

        </div>
    )
}
export default SummaryCards;
