import FLOAT from "./FLOAT.cdc"

  pub fun main(users: [Address], roleIds: [String]): {Address: [String]} {
    let answer: {Address: [String]} = {}

    for user in users {
      var earnedRoles: [String] = []

      if let floatCollection = getAccount(user).getCapability(FLOAT.FLOATCollectionPublicPath).borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>() {
        if floatCollection.ownedIdsFromEvent(eventId: UInt64(482557017)).length > 0 {
          earnedRoles.append(roleIds[0])
        }
        if floatCollection.ownedIdsFromEvent(eventId: UInt64(557504388)).length > 0 {
          earnedRoles.append(roleIds[1])
        }

      }
      answer[user] = earnedRoles
    }

    return answer
  }
 