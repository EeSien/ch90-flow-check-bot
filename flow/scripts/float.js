const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const scriptCode = `
import FLOAT from 0xFLOAT

pub fun main(accounts: [Address], eventId: UInt64): Bool {
  for account in accounts {
    if let floatCollection = getAccount(account).getCapability(FLOAT.FLOATCollectionPublicPath).borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>() {
      let ids = floatCollection.ownedIdsFromEvent(eventId: eventId)
      if ids.length > 0 {
        return true
      }
    }
  }
  return false
}
`;

let eventIds = [
  299755001,
  314242837,
  329305134,
  331687950,
  338735737,
  339998352,
  342498796,
  342582844,
  342882438,
  342918976,
  342929879,
  343053031,
  343085997,
  343127331,
  343164416,
  343218542,
  343255795,
  343283627,
  346661632,
  354125193,
  371406853,
  380663486,
  401543962,
  414539811,
  430862616,
  449759860,
  479549490,
  514411174,
  535410161,
  546620518,
  571230302,
  595889086,
  console.log(roleId);

]


const checkOwnsFloat = async (emeraldIds) => {
let resultingArr=[];
await Promise.all(
eventIds.map(async element => {
      try {
          const result = await fcl.send([
            fcl.script(scriptCode),
            fcl.args([
              fcl.arg(emeraldIds, t.Array(t.Address)),
              fcl.arg(element, t.UInt64)
            ])
          ]).then(fcl.decode);
          if(result == true){
              resultingArr.push(element)
          }
        } catch(e) {
        }    
  }));
  return resultingArr.length;
}

async function asyncCall(emeraldIds) {
  const result = await checkOwnsFloat(emeraldIds);
  return result;
}


const scriptCode2 = `
import FLOAT from 0xFLOAT

pub fun main(host: Address, groupName: String, users: [Address]): Bool {
  let eventsCollection = getAccount(host).getCapability(FLOAT.FLOATEventsPublicPath)
                        .borrow<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>()
                        ?? panic("Could not borrow the FLOATEventsPublic from the host.")
  let group = eventsCollection.getGroup(groupName: groupName) ?? panic("This group does not exist.")
  let eventsInGroup = group.getEvents()

  for user in users {
    if let floatsCollection = getAccount(user).getCapability(FLOAT.FLOATCollectionPublicPath).borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>() {
      for eventId in eventsInGroup {
        if floatsCollection.ownedIdsFromEvent(eventId: eventId).length > 0 {
          return true
        }
      } 
    }
  }

  return false
}
`;

const checkOwnsFloatFromGroup = async (creator, groupName, emeraldIds) => {
  try {
    const result = await fcl.send([
      fcl.script(scriptCode2),
      fcl.args([
        fcl.arg(creator, t.Address),
        fcl.arg(groupName, t.String),
        fcl.arg(emeraldIds, t.Array(t.Address)),
      ])
    ]).then(fcl.decode);
    return result || {error: true, message: 'You do not own any FLOATs from this Group.'};
  } catch(e) {
    return {error: true, message: 'You do not own any FLOATs from this Group.'};
  }
}

const scriptCode3 = `
import FLOAT from 0xFLOAT

pub fun main(host: Address, groupName: String, users: [Address]): Bool {
  let eventsCollection = getAccount(host).getCapability(FLOAT.FLOATEventsPublicPath)
        .borrow<&FLOAT.FLOATEvents{FLOAT.FLOATEventsPublic}>()
        ?? panic("Could not borrow the FLOATEventsPublic from the host.")

  let group = eventsCollection.getGroup(groupName: groupName) ?? panic("This group does not exist.")
  let eventsInGroup = group.getEvents()

  let ownedEvents: [UInt64] = []

  for user in users {
    if let floatsCollection = getAccount(user).getCapability(FLOAT.FLOATCollectionPublicPath).borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>() {
      for eventId in eventsInGroup {
        if !ownedEvents.contains(eventId) && floatsCollection.ownedIdsFromEvent(eventId: eventId).length > 0 {
          ownedEvents.append(eventId)
        }
      } 
    }
  }

  return ownedEvents.length == eventsInGroup.length
}
`;

const checkOwnsAllFloatsFromGroup = async (creator, groupName, emeraldIds) => {
  try {
    const result = await fcl.send([
      fcl.script(scriptCode3),
      fcl.args([
        fcl.arg(creator, t.Address),
        fcl.arg(groupName, t.String),
        fcl.arg(emeraldIds, t.Array(t.Address)),
      ])
    ]).then(fcl.decode);
    return result || {error: true, message: 'You do not own all the FLOATs from this Group.'};
  } catch(e) {
    return {error: true, message: 'You do not own all the FLOATs from this Group.'};
  }
}

module.exports = {
  checkOwnsFloat,
  checkOwnsFloatFromGroup,
  checkOwnsAllFloatsFromGroup,
  asyncCall
}