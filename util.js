import {hash} from "starknet"


function signDeployAccountTx({
  privateKey,
  publicKey,
  classHash,
  salt,
  maxFee,
  version,
  chainId,
  nonce = 0,
  contractAddress
}) {

  const hashValue =

  // private_key: Optional[int],
  // public_key: int,
  // class_hash: int,
  // salt: int,
  // max_fee: int,
  // version: int,
  // chain_id: int,
  // nonce: int = 0
  // contract_address = calculate_contract_address_from_hash(
  //     salt=salt,
  //     class_hash=class_hash,
  //     constructor_calldata=[public_key],
  //     deployer_address=0,
  // )
  // hash_value = calculate_deploy_account_transaction_hash(
  //     contract_address=contract_address,
  //     class_hash=class_hash,
  //     constructor_calldata=[public_key],
  //     salt=salt,
  //     max_fee=max_fee,
  //     version=version,
  //     chain_id=chain_id,
  //     nonce=nonce,
  // )
  // return contract_address, DeployAccount(
  //     class_hash=class_hash,
  //     constructor_calldata=[public_key],
  //     contract_address_salt=salt,
  //     max_fee=max_fee,
  //     nonce=nonce,
  //     signature=(
  //         [] if private_key is None else list(sign(msg_hash=hash_value, priv_key=private_key))
  //     ),
  //     version=version,
  // )
}
