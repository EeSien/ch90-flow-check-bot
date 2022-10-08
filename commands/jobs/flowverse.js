const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const execute = async (guild) => {
  const sockRoleId = '923082559812935731';
  const sockRole = guild.roles.cache.find(role => role.id === sockRoleId);
  if (!sockRole) {
    console.log('[JOB: REMOVAL] Could not find the Sock role.')
    return;
  }

  // Get all the members with the Sock role
  await guild.members.fetch();
  const usersWithRole = sockRole.members.map(member => (
    member.user.id
  ))

  const chunkSize = 200;
  let noLongerHold = [];
  for (let i = 0; i < usersWithRole.length; i += chunkSize) {
    const chunk = usersWithRole.slice(i, i + chunkSize);
    const chunkRemoval = await toRemove(chunk);
    if (chunkRemoval.error) {
      console.log("[JOB: REMOVAL] Script error:", chunkRemoval.message);
      return;
    }
    noLongerHold = noLongerHold.concat(chunkRemoval);
  }

  console.log("[JOB: REMOVAL] (Flowverse Socks) noLongerHold:", noLongerHold);
  for (var i = 0; i < noLongerHold.length; i++) {
    const member = await guild.members.fetch(noLongerHold[i]);
    member.roles.remove(sockRoleId).catch((e) => console.log(e));
  }
}

async function toRemove(discordIds) {
  try {
    const result = await fcl.send([
      fcl.script`
      import EmeraldIdentity from 0xEmeraldIdentity
      import RaribleNFT from 0x01ab36aaf654a13e 
      import NonFungibleToken from 0x1d7e57aa55817448
      import FlowverseSocks from 0xce4c02539d1fabe8
    
      pub fun main(discordIds: [String]): [String] {
        var toRemove: [String] = []

        for discordId in discordIds {
          var found: Bool = false
          if let emeraldId = EmeraldIdentity.getAccountFromDiscord(discordID: discordId) {
            if let collection = getAccount(emeraldId).getCapability(RaribleNFT.collectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() {
              let arrayOfSocks: [UInt64] = [15029, 15027, 15026, 15025, 15024, 15023, 15021, 15020, 15019, 15017, 15016, 15015, 15013, 15010, 15009, 15008, 15007, 15006, 15005, 15004, 15002, 15000, 14998, 14996, 14993, 14992, 14991, 14990, 14988, 14986, 14985, 14979, 14977, 14974, 14973, 14972, 14970, 14969, 14966, 14962, 14961, 14960, 14959, 14957, 14955, 14953, 14950, 14948, 14947, 14946, 14939, 14899, 14898, 14897, 14894, 14892, 14889, 14886, 14883, 14881, 14878, 14876, 14875, 14873, 14869, 14867, 14863, 14862, 14857, 14856, 14855, 14850, 14849, 14847, 14844, 14843, 14840, 14838, 14837, 14835, 14833, 14830, 14826, 14824, 14822, 14819, 14818, 14817, 14816, 14815, 14814, 14813, 14812, 14810, 14808, 14805, 14803, 14802, 14801, 14800, 14799, 14798, 14797, 14796, 14795, 14792, 14791, 14790, 14789, 14787, 14786]
              let ids: [UInt64] = collection.getIDs()
              for sock in arrayOfSocks {
                if ids.contains(sock) {
                  found = true
                  break
                }
              }
            }
            if let collection = getAccount(emeraldId).getCapability(FlowverseSocks.CollectionPublicPath).borrow<&FlowverseSocks.Collection{NonFungibleToken.CollectionPublic}>() {
              if collection.getIDs().length > 0 {
                found = true
              }
            }
          }
          if !found {
            toRemove.append(discordId)
          }
        }
    
        return toRemove
      }
      `,
      fcl.args([
        fcl.arg(discordIds, t.Array(t.String))
      ])
    ]).then(fcl.decode);
    return result;
  } catch (e) {
    return { error: true, message: e };
  }
}

module.exports = {
  name: 'jobs-flowverse',
  description: 'automatically remove roles from people with a role',
  execute
}