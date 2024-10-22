import React, { useState } from "react"

function AddBudget() {
	const [collectionName, setCollectionName] = useState("")
	const [email, setEmail] = useState("testman1@mail.com")
	const [message, setMessage] = useState("")

	const handleTransaction = async (e) => {
		e.preventDefault()

		const transactionData = {
			CollectionName: collectionName,
		}

		try {
			const response = await fetch(
				`/api/SecureWebsite/addTransaction/${email}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(transactionData),
				}
			)

			if (!response.ok) {
				throw new Error("Failed to add transaction")
			}

			const result = await response.json()
			setMessage(result.message) // Display success message
		} catch (error) {
			console.error("Error:", error)
			setMessage("Something went wrong, please try again.")
		}
	}

	return (
		<div>
			<h1>Add Transaction</h1>
			<form onSubmit={handleTransaction}>
				<label>
					Collection Name:
					<input
						type="text"
						value={collectionName}
						onChange={(e) => setCollectionName(e.target.value)}
						required
					/>
				</label>
				<br />
				<button type="submit">Submit</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	)
}

export default AddBudget
