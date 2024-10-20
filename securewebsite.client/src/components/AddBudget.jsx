import React, { useState } from 'react';

function AddBudget() {
  const [budgetName, setBudgetName] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [email, setEmail] = useState('testman1@mail.com');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetData = {
      Budget: budgetName,
      BudgetAmount: parseFloat(budgetAmount),
    };

    try {
      const response = await fetch(`/api/SecureWebsite/addBudget/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetData),
      });

      if (!response.ok) {
        throw new Error('Failed to add budget');
      }

      const result = await response.json();
      setMessage(result.message); // Display success message
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong, please try again.');
    }
  };

  return (
    <div>
      <h1>Add Budget</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Budget Name:
          <input
            type="text"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Budget Amount:
          <input
            type="number"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>	
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBudget;
