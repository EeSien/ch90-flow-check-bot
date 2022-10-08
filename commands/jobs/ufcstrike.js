const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

const execute = async (guild) => {
  const championsClubRoleId = '979886293091766302';
  const championsClubRole = guild.roles.cache.find(role => role.id === championsClubRoleId);
  if (!championsClubRole) {
    console.log('[JOB: REMOVAL] Could not find the Champions Club role.')
    return;
  }

  // Get all the members with the Champions Club role
  await guild.members.fetch();
  const usersWithRole = championsClubRole.members.map(member => (
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

  console.log("[JOB: REMOVAL] (UFC Strike Champions Club) noLongerHold:", noLongerHold);
  for (var i = 0; i < noLongerHold.length; i++) {
    const member = await guild.members.fetch(noLongerHold[i]);
    member.roles.remove(championsClubRoleId).catch((e) => console.log(e));
  }
}

async function toRemove(discordIds) {
  try {
    const result = await fcl.send([
      fcl.script`
      import EmeraldIdentityDapper from 0xEmeraldIdentity
      import UFC_NFT from 0x329feb3ab062d289 
    
      pub fun main(discordIds: [String]): [String] {
        var toRemove: [String] = []

        for discordId in discordIds {
          var found: Bool = false
          if let emeraldId = EmeraldIdentityDapper.getAccountFromDiscord(discordID: discordId) {
            if let collection = getAccount(emeraldId).getCapability(UFC_NFT.CollectionPublicPath).borrow<&UFC_NFT.Collection{UFC_NFT.UFC_NFTCollectionPublic}>() {
              let ids = collection.getIDs()
              for id in ids {
                let moment = collection.borrowUFC_NFT(id: id)!
                let metadata = UFC_NFT.getSetMetadata(setId: moment.setId)!
                if (metadata["TIER"]?.toLower() == "champion") {
                  found = true
                  break
                }
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
  name: 'jobs-ufcstrike',
  description: 'automatically remove roles from people with a role',
  execute
}