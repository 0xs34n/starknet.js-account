# Starknet.js Account Tutorial

This tutorial will walk you through the process of creating a StarkNet account throught Starknet.js.

## What's new?

Deploying accounts now **require fees** as of StarkNet v0.10.2.

Therefore, the process of creating an account is as follows:

1. Calculate the account contract address before hand.
2. Send some funds to the account contract address.
3. Deploy the funded account contract.

## How to run this code on testnet-1

Use a modern version of Node.js (>= 16.0.0) and run the following commands:

```bash
node index.js
```

It will print the account contract address and wait for you to send some funds to it on `testnet-1`.

Once that's done you can deploy the account contract!

## References

- [PDF Slides](https://github.com/0xs34n/starknet.js-account/blob/main/Starknet.js%20Updated%20for%20v0.10.2.pdf)
- [Starknet.js](https://github.com/0xs34n/starknet.js)
- [Old Starknet.js Tutorial](https://github.com/0xs34n/starknet.js-workshop)
- [Argent X](https://github.com/argentlabs/argent-x)

Refer to the pdf slides for more information on Starknet.js and StarkNet.

## Improvements

- Deploy other types of contracts like the openZepplin account contract.
- Deploy on other networks like `testnet-2` and `mainnet`.
- Check for the account balance and deploy if it's funded.
