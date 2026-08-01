import { useState } from "react";
import "../styles/Home.css";
import { useTransactions } from "../hooks/useTransaction";
import SummaryCards from "../components/SummaryCards";
import TransactionTypeSwitch from "../components/TransactionTypeSwitch";
import TransactionForm from "../components/TransactionForm";
import TransactionHistory from "../components/TransactionHistory";
import Navbar from "../components/Navbar"
import Footer from  "../components/Footer"


function Home() {
  const [transactionType, setTransactionType] = useState("expenses")
  const {
    transactions,
    balance,
    addTransaction,
    loading,
    error
  } = useTransactions();

  return (
    <div className="home-page">
      <Navbar activePage="home" />

      <section className="dashboard">
        {error && (
          <div className="error-message" role="alert">
            Error: {error}
          </div>
        )}

        {loading && (
          <div className="loading">
            Loading...
          </div>
        )}

        <SummaryCards balance={balance} />

        <TransactionTypeSwitch
          type={transactionType}
          onTypeChange={setTransactionType}
        />

        <div className="dashboard-content">

          <TransactionForm
            key={transactionType}
            type={transactionType}
            onAddTransaction={addTransaction}
          />

          <TransactionHistory transactions={transactions} />

        </div>
      </section>

      <Footer />
    </div>
  )
}
export default Home;
