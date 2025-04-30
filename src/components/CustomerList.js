// src/components/CustomerList.js
import React, { useState } from 'react';
import './style/CustomerList.css';
import customersData from '../data/Customers'; // ダミーデータを外部からimport

function CustomerList({ onLogout }) {
  const [customers, setCustomers] = useState(customersData);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', order: 'asc' });

  const handleSort = (key) => {
    const order = (sortConfig.key === key && sortConfig.order === 'asc') ? 'desc' : 'asc';
    const sorted = [...customers].sort((a, b) => {
      if (key === 'registered') {
        return order === 'asc'
          ? new Date(a.registered) - new Date(b.registered)
          : new Date(b.registered) - new Date(a.registered);
      } else {
        return order === 'asc'
          ? a[key].localeCompare(b[key], 'ja')
          : b[key].localeCompare(a[key], 'ja');
      }
    });
    setCustomers(sorted);
    setSortConfig({ key, order });
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    const filtered = customersData.filter((customer) =>
      customer.name.includes(keyword)
    );
    setCustomers(filtered);
  };

  return (
    <div className="customer-list">
      <div className="customer-list-header">
        <h1 className="customer-list-title">顧客一覧</h1>
        <button onClick={onLogout} className="logout-button">
          ログアウト
        </button>
      </div>

      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="顧客名で検索"
          value={searchKeyword}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <table className="customer-table">
        <thead>
          <tr>
            <th>
              顧客名
              <button className="sort-button" onClick={() => handleSort('name')}>
                <span className={sortConfig.key === 'name' && sortConfig.order === 'asc' ? 'active-arrow' : 'arrow'}>↑</span>
                <span className={sortConfig.key === 'name' && sortConfig.order === 'desc' ? 'active-arrow' : 'arrow'}>↓</span>
              </button>
            </th>
            <th>メールアドレス</th>
            <th>電話番号</th>
            <th>
              登録日
              <button className="sort-button" onClick={() => handleSort('registered')}>
                <span className={sortConfig.key === 'registered' && sortConfig.order === 'asc' ? 'active-arrow' : 'arrow'}>↑</span>
                <span className={sortConfig.key === 'registered' && sortConfig.order === 'desc' ? 'active-arrow' : 'arrow'}>↓</span>
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.registered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
