import React, { useEffect, useState } from 'react';
import api from '@/lib/api';

const Transactions = () => {
    useEffect(() => {
        fetchTransactions();
    }, []);

    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const response = await api('transaction.index');
        console.log(response.data);
        setTransactions(response.data);
    }

    return (
        <div>
            <h1>Transactions Page</h1>

            {transactions.map(t => (
                <h3 key={t.id}>{t.id}</h3>
            ))}
        </div>
    );
};

export default Transactions;