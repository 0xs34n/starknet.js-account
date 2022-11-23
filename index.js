import { ec, stark, hash, number, Account, defaultProvider } from "starknet";

const genPrivateKey = stark.randomAddress();

const starkKeyPair = ec.genKeyPair(genPrivateKey);
const starkKeyPublic = ec.getStarkKey(starkKeyPair);

const addressSalt = starkKeyPublic;

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

// console.log("accountToBeDeployed", accountToBeDeployed);
// console.log("privateKey", genPrivateKey);

// ==================================================================

const contractAddress = accountToBeDeployed;

// WARNING: Do not do this in production.
const privateKey = genPrivateKey;

const account = new Account(
  defaultProvider,
  contractAddress,
  ec.getKeyPair(privateKey)
);

const { transaction_hash, contract_address } = await account.deployAccount({
  classHash: argentProxyClassHash,
  constructorCalldata: stark.compileCalldata(constructorCallData),
  contractAddress: contractAddress,
  addressSalt: addressSalt,
});

console.log(
  "deployAccountTx",
  transaction_hash,
  "contract address",
  contract_address
);
