const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const scriptCode = `
// import AllDay from "./AllDay.cdc"
import AllDay from 0xe4cf4bdc1751c65d

pub fun main(account: Address, setName: String): Result {
  let setData: AllDay.SetData = AllDay.getSetDataByName(name: setName)
  let setPlaysInEditions: [UInt64] = setData.setPlaysInEditions.keys

  let collection = getAccount(account).getCapability(AllDay.CollectionPublicPath)
                      .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                      ?? panic("This account does not have an NFL All Day Collection set up.")
  let ids = collection.getIDs()
  let moments: [MomentData] = []
  let editionIds: [UInt64] = []
  for id in ids {
    let moment = collection.borrowMomentNFT(id: id)!
    let editionID = moment.editionID
    if setPlaysInEditions.contains(editionID) && !editionIds.contains(editionID) {
      let play: AllDay.PlayData = AllDay.getPlayData(id: editionID)
      let momentData = MomentData(_serialNumber: moment.serialNumber, _player: play.metadata["playerFirstName"]!.concat(" ").concat(play.metadata["playerLastName"]!), _team: play.metadata["teamName"]!, _date: play.metadata["gameDate"]!, _playType: play.metadata["playType"]!, _setName: setName)
      moments.append(momentData)
      editionIds.append(editionID)
    }
  }
  return Result(_owner: account, _setData: setData, _moments: moments)       
}

pub struct Result {
  pub let owner: Address
  pub let setData: AllDay.SetData
  pub let moments: [MomentData]

  init(_owner: Address, _setData: AllDay.SetData, _moments: [MomentData]) {
    self.owner = _owner
    self.setData = _setData
    self.moments = _moments
  }
}

pub struct MomentData {
  pub let serialNumber: UInt64
  pub let player: String
  pub let team: String
  pub let date: String
  pub let playType: String
  pub let setName: String

  init(_serialNumber: UInt64, _player: String, _team: String, _date: String, _playType: String, _setName: String) {
    self.serialNumber = _serialNumber
    self.player = _player
    self.team = _team
    self.date = _date
    self.playType = _playType
    self.setName = _setName
  }
}
`;

const getMomentsInSet = async (account, setName) => {
  try {
    const result = await fcl.send([
      fcl.script(scriptCode),
      fcl.args([
        fcl.arg(account, t.Address),
        fcl.arg(setName, t.String)
      ])
    ]).then(fcl.decode);

    return result;
  } catch (e) {
    console.log(e);
    return { error: true, message: 'The account does not have NFL All Day moments or the set doesnt exist.' };
  }
}

const scriptCode2 = `
// import AllDay from "./AllDay.cdc"
import AllDay from 0xe4cf4bdc1751c65d

pub fun main(account: Address, setName: String): Bool {
  let setData: AllDay.SetData = AllDay.getSetDataByName(name: setName)
  let setPlaysInEditions: [UInt64] = setData.setPlaysInEditions.keys
  let neededLength = setPlaysInEditions.length
  
  let collection = getAccount(account).getCapability(AllDay.CollectionPublicPath)
                      .borrow<&{AllDay.MomentNFTCollectionPublic}>()
                      ?? panic("This account does not have an NFL All Day Collection set up.")
  
  let ids = collection.getIDs()
  let editionIds: [UInt64] = []
  for id in ids {
    let moment = collection.borrowMomentNFT(id: id)!
    let editionID = moment.editionID
    if setPlaysInEditions.contains(editionID) && !editionIds.contains(editionID) {
      editionIds.append(editionID)
    }
  }
  return editionIds.length == neededLength
}
`;

const ownsAllInSet = async (account, setName) => {
  if (!account) return { error: true, message: 'You do not have a Dapper EmeraldID. Please get one at https://id.ecdao.org/.' };
  try {
    const result = await fcl.send([
      fcl.script(scriptCode2),
      fcl.args([
        fcl.arg(account, t.Address),
        fcl.arg(setName, t.String)
      ])
    ]).then(fcl.decode);

    return result || { error: true, message: `You do not have all the moments from the ${setName} set.` };
  } catch (e) {
    console.log(e);
    return { error: true, message: 'The account does not have NFL All Day moments or the set doesnt exist.' };
  }
}

module.exports = {
  getMomentsInSet,
  ownsAllInSet
}