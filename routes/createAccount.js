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
			res.send({error: "you must set a public-key in params"})
			return
		}
		const address = req.params.walletAddress
		let account;
		try{
		 account = await server.loadAccount(address)
		 	res.status(200)
			res.send(account)
		} catch(error){
			res.status(404)
			res.send({ error: error, message: "the public key doesn't match any address"})
		}



	} )
}