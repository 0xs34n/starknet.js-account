import { ec, stark, hash, Account, Provider } from "starknet";
import readline from "readline";

const starkKeyPair = ec.genKeyPair();
const starkKeyPublic = ec.getStarkKey(starkKeyPair);

// Argent Class Hash on Testnet
// https://testnet.starkscan.co/address-book
const accountClassHash =
  "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";
const argentProxyClassHash =
  "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";

const constructorCallData = stark.compileCalldata({
  implementation: accountClassHash,
  selector: hash.getSelectorFromName("initialize"),
  calldata: stark.compileCalldata({ signer: starkKeyPublic, guardian: "0" }),
});

// to be deployed account contract address
const contractAddress = hash.calculateContractAddressFromHash(
  starkKeyPublic, // salt
  argentProxyClassHash,
  constructorCallData,
  0
);

console.log(
  `\nPre-calculated account contract address:\n\n${contractAddress}\n`
);

// User input to check if the account contract is funded
const userInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isFunded = false;

while (!isFunded) {
  await new Promise((resolve) => {
    userInput.question(
      `StarkNet requires a fee to deploy accounts. \nPlease send nominal funds to the to the pre-calculated account contract above. \nIs the account contract funded? (y/n)`,
      (isFundedInput) => {
        if (isFundedInput === "y") {
          isFunded = true;
          userInput.close();
          resolve();
        } else {
          console.log(
            "Please send funds to the account contract and try again."
          );
          resolve();
        }
      }
    );
  });
}

// use testnet-1 provider
const testnetOneProvider = new Provider({
  sequencer: {
    baseUrl: "https://alpha4.starknet.io",
    feederGatewayUrl: "feeder_gateway",
    gatewayUrl: "gateway",
  },
});

const account = new Account(testnetOneProvider, contractAddress, starkKeyPair);

const deployAccountPayload = {
  classHash: argentProxyClassHash,
  constructorCalldata: constructorCallData,
  contractAddress: contractAddress,
  addressSalt: starkKeyPublic,
};

const { transaction_hash, contract_address } = await account.deployAccount(
  deployAccountPayload
);

console.log(`\nAccount contract deployment in progress...\n`);
console.log(
  `Check deployment transaction status at \n\nhttps://testnet.starkscan.co/tx/${transaction_hash}\n`
);
console.log(
  `Once the transaction is confirmed. The account is deployed at \n\nhttps://testnet.starkscan.co/tx/${contract_address}\n`
);
