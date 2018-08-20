const Stellar = require('stellar-sdk')
const rp = require('request-promise')
const server = new Stellar.Server('https://horizon-testnet.stellar.org')
let pair = Stellar.Keypair.random()

Stellar.Network.useTestNetwork()

module.exports = Account = (app)=> {

	app.post( "/account", async (req,res) => {
		await rp.get({
			uri: 'https://horizon-testnet.stellar.org/friendbot',
			qs: {addr: pair.publicKey()},
			json: true
		})
		res.status(200)
		res.send({
			publicKey: pair.publicKey(),
			privateKey: pair.secret(),
			message: "Here are your access keys"
		})
	})

	app.get( "/account/:walletAddress", async (req, res) => {
		if(!req.params || !req.params.walletAddress) {
			res.status(400)
			res.send("you must enter a walletAddress")
			return
		}
		const address = req.params.walletAddress
		console.log("address", address)
		let account;
		try{
		 account = await server.loadAccount(address)
		} catch(error){
			console.log("error", error)
		}
		console.log("my account", account)
		res.status(200)
		res.send(account)

	} )
}