# Stellar-Wallet-Exchange-API
A simple node.js REST API connected to the Stellar blockChain
The API enables Wallet creation, Balance checking and peer to peer Lumens transfer (XML aka the underlying coin in the Stellar Ecosystem)

## Disclaimer 
This API is for learning purposes only and must not be used in production

## Dependencies
this project uses [request-promise](https://www.npmjs.com/package/request-promise) to interact with Stellar through Horizon API
and [stellar-sdk](https://www.npmjs.com/package/stellar-sdk)

# Quickstart
Clone the repo & run this command
```
 cd Stellar-Wallet-Exchange-API && npm install && node index.js
 ```
 
 # Calls
 By using the API As Is, the Stellar instance will be running on the testnet.
 
#### Create Wallet 
Create a new Stellar wallet. 
The call will return the public and the private keys of this newly created wallet.
In the testnet, the wallet will be automatically credited with 10000 Lumens.

* **URL**
/account

* **Method:**
 |`POST`|

* **Success Response:**
* **Code:** 200
* **Content:** `{
			publicKey: XXXXXXXXXXX,
			privateKey: XXXXXXXXXX,
			message: "Here are your access keys"
		}`

------

#### Check Balance 
Return all the details of a specific Wallet
* **URL**
/account/:walletAddress

* **Method:**
 |`GET`|
 
*  **URL Params**
* **Required:**
 the wallet public address must be provided in the params
  
   
* **Success Response:**
* **Code:** 200
    **Content:** 
    all the assets in the wallet plus Meta data
* **Error Response:**
  * **Code:** 400
    **Content:** `{error: "you must set a public-key in params"}`
    
  * **Code:** 404
    **Content:** `{ error: error, message: "the public key doesn't match any address"}`
 
 ------
 
 #### Create a transaction
Create a transaction between two accounts. 
* **URL**
/transaction

* **Method:**
 |`POST`|
 
*  **body Params**
* **Required:**
call must provides a receiver public-key, the sender public-address, the sender private-key (to confirm the transaction) and the amount to be transfered
```
{
  	"sender":"GCWZ5CDZQSTASBFG7RIFIAWVCJ4FTCGBUFR5ACPSU4HB5WF5AY5TOL2Q",
	"receiver":"GCNLQBJXTRCDI4F2XAV7FIF44MQGH7KGKQU4O7PUDVNU6QDDODHCPPDU",
	"amount":"100.50",
	"secret":"SDOVBV6H6WTCGO5D7PRD6T37S7UGMKX43EAT6SJO3T2MIXNGTCHFCKKH"
}
```
   
* **Success Response:**
* **Code:** 200
    **Content:** 
    "Transaction successful!"
* **Error Response:**
  * **Code:** 400
    **Content:** `{error: "missing key params"}`
    
  * **Code:** 404
    **Content:** `{
		    	error: error,
		    	message: "Transaction failed"
		    }`


 
