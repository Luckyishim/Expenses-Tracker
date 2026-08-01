const TransactionTypeSwitch = ({ type, onTypeChange }) => {
    const isIncome = type === "income";
    return (
        <div className="entry-switch">

            {/* Expenses Button */}
            <button
                className={!isIncome ? "selected" : ""}
                type="button"
                onClick={() => onTypeChange("expenses")}
            >
                Expense
            </button>

            {/* Income Button  */}
            <button
                className={isIncome ? "selected is-income" : ""}
                type="button"
                onClick={() => onTypeChange("income")}
            >
                Income
            </button>

        </div>
    )
}
export default TransactionTypeSwitch
