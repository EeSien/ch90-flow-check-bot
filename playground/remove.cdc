import EmeraldIdentity from "../contracts/EmeraldIdentity.cdc"

transaction(address: Address) {
  prepare(signer: AuthAccount) {
    let admin = signer.borrow<&EmeraldIdentity.Administrator>(from: EmeraldIdentity.AdministratorStoragePath)!
    admin.removeByAccount(account: address)
  }

  execute {

  }
}