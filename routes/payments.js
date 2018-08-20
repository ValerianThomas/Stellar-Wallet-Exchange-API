const Stellar = require('stellar-sdk')
const rp = require('request-promise')
const server = new Stellar.Server('https://horizon-testnet.stellar.org')

module.exports = (app) => {
	app.post('/transaction', async (req, res) => {
		if(!req.body || !req.body.sender || !req.body.receiver || !req.body.amount || !req.body.secret){
			res.status(400)
			res.send({
				error: "missing key params"
			})
			 return
			}
		const senderWallet = req.body.sender
		const receiverWallet = req.body.receiver
		const amount = req.body.amount
		const accountA = await server.loadAccount(senderWallet)
		const transaction = new Stellar.TransactionBuilder(accountA)
		.addOperation(Stellar.Operation.payment({
			destination: receiverWallet,
			asset: Stellar.Asset.native(),
			amount: amount
		}))
		.build()
		var key = Stellar.Keypair.fromSecret(req.body.secret)
		transaction.sign(key)

		try{
			const transactionResult = await server.submitTransaction(transaction)
			console.log('\n\nSuccess! View the transaction at: ')
		    console.log(transactionResult._links.transaction.href)
		    console.log(JSON.stringify(transactionResult, null, 2))
		    res.status(200)
	    	res.send("Transaction successful!")
		}
		catch(error){
		    res.status(404)
		    res.send({
		    	error: error,
		    	message: "Transaction failed"
		    })
		}
	})

}