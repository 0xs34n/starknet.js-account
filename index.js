import { ec, stark, hash, number, Account, defaultProvider } from "starknet";

const genPrivateKey = stark.randomAddress();

const starkKeyPair = ec.genKeyPair(genPrivateKey);
const starkKeyPublic = ec.getStarkKey(starkKeyPair);

// Argent Class Hash on Testnet
// https://testnet.starkscan.co/address-book
const accountClassHash =
  "0x03e327de1c40540b98d05cbcb13552008e36f0ec8d61d46956d2f9752c294328"; // this might be wrong try calculating with code
const argentProxyClassHash =
  "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";

const constructorCallData = stark.compileCalldata({
  implementation: accountClassHash,
  selector: hash.getSelectorFromName("initialize"),
  calldata: stark.compileCalldata({ signer: starkKeyPublic, guardian: "0" }),
});

// to be deployed account contract address
const accountToBeDeployed = hash.calculateContractAddressFromHash(
  starkKeyPublic, // salt
  argentProxyClassHash,
  constructorCallData,
  0
);

// Log these values to console and copy it to the variables below
// console.log("accountToBeDeployed", accountToBeDeployed);
// console.log("privateKey", genPrivateKey);
// console.log("publicKey", starkKeyPublic);

// ==================================================================

// // WARNING: Do not do this in production.
const privateKey =
  "0x0509199998039a7cc58a4bb751754cbd1b990ac812d820040b64faae85122b8a";
const publicKey =
  "0x06bb7fd397c9ce5251347a7f6fa5b2f0876c51bc6ef33d321741440a58a055be";
const contractAddress =
  "0x484cc3866fcff0d05c35c79b9e0709cc6db197a4318691f24827afd1f7e2f8e";

const constructorCallDataDeployed = stark.compileCalldata({
  implementation: accountClassHash,
  selector: hash.getSelectorFromName("initialize"),
  calldata: stark.compileCalldata({ signer: publicKey, guardian: "0" }),
});

const account = new Account(
  defaultProvider,
  contractAddress,
  ec.getKeyPair(privateKey)
);

const { transaction_hash, contract_address } = await account.deployAccount({
  classHash: argentProxyClassHash,
  constructorCalldata: constructorCallDataDeployed,
  contractAddress: contractAddress,
  addressSalt: publicKey,
});

console.log(
  "deployAccountTx",
  transaction_hash,
  "contract address",
  contract_address
);
