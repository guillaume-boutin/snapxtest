import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useParams, useHistory } from 'react-router-dom';
import Transaction from '@/components/pages/Transaction/Show/Transaction'

const TransactionShow = () => {
    const { id } = useParams();
    let history = useHistory();

    useEffect(() => {
        fetchTransaction();
    }, []);

    const [transaction, setTransaction] = useState([]);

    const fetchTransaction = async () => {
        try {
            const res = await api('transaction.show', { id });
            setTransaction(res.data);
        } catch (err) {
            history.replace('/404');
        }
    }

    return (
        transaction.id || null ? 
        <Transaction transaction={transaction} /> : null
    );
};

export default TransactionShow;