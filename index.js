import { ec, stark, hash, number, Account, defaultProvider } from "starknet";

const genPrivateKey = stark.randomAddress();

const starkKeyPair = ec.genKeyPair(genPrivateKey);
const starkKeyPublic = ec.getStarkKey(starkKeyPair);

// Argent Class Hash on Testnet
// https://testnet.starkscan.co/address-book
const accountClassHash =
  "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";
const argentProxyClassHash =
  "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";

const constructorCallDataPre = stark.compileCalldata({
  implementation: accountClassHash,
  selector: hash.getSelectorFromName("initialize"),
  calldata: stark.compileCalldata({ signer: starkKeyPublic, guardian: "0" }),
});

// to be deployed account contract address
const accountToBeDeployed = hash.calculateContractAddressFromHash(
  starkKeyPublic, // salt
  argentProxyClassHash,
  constructorCallDataPre,
  0
);

// Log these values to console and copy it to the variables below
console.log("privateKey", genPrivateKey);
console.log("publicKey", starkKeyPublic);
console.log("accountToBeDeployed", accountToBeDeployed);
console.log("callData", constructorCallDataPre);

// ==================================================================

// // WARNING: Do not do this in production.
const privateKey =
  "0x01b9352cf42746fe5776dbf104b20632c563d6a1d9cd1d7e5855e242b515c76d";
const publicKey =
  "0x073d53e7e31c66c8b894ccffbf1846391a4d157f57edc35082c77b639a1fa77d";
const contractAddress =
  "0x63ecac301a6d2b78f7090a700e185893c722fb988260ce667390e593c60d7f1";
const constructorCallData = [
  "1449178161945088530446351771646113898511736767359683664273252560520029776866",
  "215307247182100370520050591091822763712463273430149262739280891880522753123",
  "2",
  "3274546707646383799600510394057987552042180904849357647877980067971301615485",
  "0",
];

const keyPair = ec.getKeyPair(privateKey);

const account = new Account(defaultProvider, contractAddress, keyPair);

const deployAccountPayload = {
  classHash: argentProxyClassHash,
  constructorCalldata: constructorCallData,
  contractAddress: contractAddress,
  addressSalt: publicKey,
};

const calculatedAccountAddress = hash.calculateContractAddressFromHash(
  deployAccountPayload.addressSalt,
  deployAccountPayload.classHash,
  deployAccountPayload.constructorCalldata,
  0
);

console.log(
  "is the calculated address the same as the deployed address?",
  number.hexToDecimalString(calculatedAccountAddress) ===
    number.hexToDecimalString(contractAddress)
);

const { transaction_hash, contract_address } = await account.deployAccount(
  deployAccountPayload
);

console.log(
  "deployAccountTx",
  transaction_hash,
  "contract address",
  contract_address
);
