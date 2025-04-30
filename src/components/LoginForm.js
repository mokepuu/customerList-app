import React, { useState } from 'react';
import './style/LoginForm.css';

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ userId: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = formData;

    if (!userId || !password) {
      setError('ユーザーIDとパスワードを入力してください。');
      return;
    }

    if (userId === 'admin' && password === 'pass') {
      setError('');
      onLogin(); // ログイン成功時の処理
    } else {
      setError('ユーザーIDまたはパスワードが正しくありません。');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>ログイン</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          name="userId"
          placeholder="ユーザーID"
          value={formData.userId}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default LoginForm;
