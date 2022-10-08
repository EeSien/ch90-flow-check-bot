pub contract EmeraldBotVerifiers {

  pub resource Verifier {
    // Maps to the Cadence codeId to what role it should assign elsewhere
    pub let codeIdToRoleId: {UInt64: String}
    pub let image: String
    pub let title: String
    pub let message: String
    pub let extra: {String: AnyStruct}

    init(codeIdToRoleId: {UInt64: String}, image: String, title: String, message: String, extra: {String: AnyStruct}) {
      self.codeIdToRoleId = codeIdToRoleId
      self.image = image
      self.title = title
      self.message = message
      self.extra = extra
    }
  }

  pub resource interface VerifierCollectionPublic {
    pub fun getVerifiers(): [UInt64]
    pub fun getVerifierInfo(verifierId: UInt64): &Verifier?
  }

  pub resource VerifierCollection: VerifierCollectionPublic {
    pub let verifiers: @{UInt64: Verifier}

    pub fun addVerifier(codeIdToRoleId: {UInt64: String}, image: String, title: String, message: String, extra: {String: AnyStruct}) {
      let verifier <- create Verifier(codeIdToRoleId: codeIdToRoleId, image: image, title: title, message: message, extra: extra)
      self.verifiers[verifier.uuid] <-! verifier
    }

    pub fun deleteVerifier(verifierId: UInt64) {
      destroy self.verifiers.remove(key: verifierId)
    }

    pub fun getVerifiers(): [UInt64] {
      return self.verifiers.keys
    }

    pub fun getVerifierInfo(verifierId: UInt64): &Verifier? {
      return &self.verifiers[verifierId] as &Verifier?
    }

    init() {
      self.verifiers <- {}
    }

    destroy() {
      destroy self.verifiers
    }
  }
}
 