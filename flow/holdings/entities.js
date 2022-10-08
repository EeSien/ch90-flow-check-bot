function UFC() {
  return `
  import UFC_NFT from 0x329feb3ab062d289

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // This checks for at least 3 UFC Moments
    if let collection = getAccount(user).getCapability(UFC_NFT.CollectionPublicPath).borrow<&UFC_NFT.Collection{UFC_NFT.UFC_NFTCollectionPublic}>() {
      let ids = collection.getIDs()
      if ids.length >= 3 {
        earnedRoles.append(roleIds[0])
      }

      var countForJoshEmmett: Int = 0

      for id in ids {
        let moment = collection.borrowUFC_NFT(id: id)!
        let setId: UInt32 = moment.setId
        let metadata = UFC_NFT.getSetMetadata(setId: setId)!
        if (!earnedRoles.contains(roleIds[1]) && metadata["TIER"]?.toLower() == "champion") {
          earnedRoles.append(roleIds[1])
        }
        if setId == 199 {
          countForJoshEmmett = countForJoshEmmett + 1
        }
      }

      if countForJoshEmmett >= 3 {
        earnedRoles.append(roleIds[2])
      }
    }

    return earnedRoles
  }
  `;
}

function NFL() {
  return `
  import AllDay from 0xe4cf4bdc1751c65d

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // This checks for at least 3 NFL Moments
    if let collection = getAccount(user).getCapability(AllDay.CollectionPublicPath).borrow<&AllDay.Collection{AllDay.MomentNFTCollectionPublic}>() {
      let ids = collection.getIDs()
      if ids.length >= 3 {
        earnedRoles.append(roleIds[0])
      }
    }

    return earnedRoles
  }
  `;
}

function EAD() {
  return `
  import AllDay from 0xe4cf4bdc1751c65d

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // This checks for at least 3 NFL Moments
    if let collection = getAccount(user).getCapability(AllDay.CollectionPublicPath).borrow<&AllDay.Collection{AllDay.MomentNFTCollectionPublic}>() {
      let ids = collection.getIDs()
      if ids.length >= 500 {
        earnedRoles.append(roleIds[4])
      } else if ids.length >= 250 {
        earnedRoles.append(roleIds[3])
      } else if ids.length >= 100 {
        earnedRoles.append(roleIds[2])
      } else if ids.length >= 25 {
        earnedRoles.append(roleIds[1])
      }
      
      if ids.length >= 1 {
        earnedRoles.append(roleIds[0])
      }
    }

    return earnedRoles
  }
  `;
}

function Flunks() {
  return `
  import Flunks from 0x807c3d470888cc48

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    if let collection = getAccount(user).getCapability(Flunks.CollectionPublicPath).borrow<&Flunks.Collection{Flunks.FlunksCollectionPublic}>() {
      let ids = collection.getIDs()

      // This checks for at least 1 Flunk
      if ids.length > 0 {
        earnedRoles.append(roleIds[0])
      }

      // This checks for at least 8 Flunks
      if ids.length >= 8 {
        earnedRoles.append(roleIds[1])
      }
    }

    return earnedRoles
  }
  `;
}

function InceptionAnimals() {
  return `
  import InceptionAvatar from 0x83ed64a1d4f3833f
  import InceptionBlackBox from 0x83ed64a1d4f3833f

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    if let collection = getAccount(user).getCapability(InceptionAvatar.CollectionPublicPath).borrow<&InceptionAvatar.Collection{InceptionAvatar.InceptionAvatarCollectionPublic}>() {
      let ids = collection.getIDs()

      // This checks for at least 1
      if ids.length >= 1 {
        earnedRoles.append(roleIds[0])
      } 
      if ids.length >= 10 {
        earnedRoles.append(roleIds[1])
      }
    }

    if let collection = getAccount(user).getCapability(InceptionBlackBox.CollectionPublicPath).borrow<&InceptionBlackBox.Collection{InceptionBlackBox.InceptionBlackBoxCollectionPublic}>() {
      let ids = collection.getIDs()

      // This checks for at least 1
      if ids.length >= 1 {
        earnedRoles.append(roleIds[2])
      }
    }

    return earnedRoles
  }
  `;
}

function IXLabs() {
  return `
  import TopShot from 0x0b2a3299cc857e29

  // Returns the total # of moments the user has from Cool Cats
  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    if let collection = getAccount(user).getCapability(/public/MomentCollection).borrow<&{TopShot.MomentCollectionPublic}>() {
      let ids = collection.getIDs()
      var answer: UInt64 = 0
      var coveredPlays: [UInt32] = []
      for id in ids {
        let moment = collection.borrowMoment(id: id)!
        // If it is a cool cat
        if moment.data.setID == 32 {
          answer = answer + 1
          if !coveredPlays.contains(moment.data.playID) {
            coveredPlays.append(moment.data.playID)
          }
        }
      }
      // If the user has 3 or more Cool Cat Moments
      if answer >= 3 {
        earnedRoles.append(roleIds[0])
      }
      // If the user has all 30 unique Cool Cat Moments
      if coveredPlays.length == 30 {
        earnedRoles.append(roleIds[1])
      }
    }

    return earnedRoles
  }
  `;
}

function Driverz() {
  return `
  import DriverzNFT from 0xa039bd7d55a96c0c

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // This checks for Driverz moments
    if let collection = getAccount(user).getCapability(DriverzNFT.CollectionPublicPath).borrow<&{DriverzNFT.CollectionPublic}>() {
      let ids = collection.getIDs()
      if ids.length >= 1 {
        earnedRoles.append(roleIds[0])
      }
      if ids.length >= 6 {
        earnedRoles.append(roleIds[1])
      }
      if ids.length >= 13 {
        earnedRoles.append(roleIds[2])
      }
      if ids.length >= 25 {
        earnedRoles.append(roleIds[3])
      }

      let captainIds: [UInt64] = [2317, 1219, 975, 1302, 2254, 1113, 3012, 1841, 1683, 1093, 3672, 1889, 3802, 1420, 2535, 569, 2552, 788, 2630, 3681, 43, 874, 177]
      for id in ids {
        if captainIds.contains(id) {
          earnedRoles.append(roleIds[4])
          break
        }
      }
    }

    return earnedRoles
  }
  `;
}

function Genies() {
  return `
  import Genies from 0x12450e4bb3b7666e

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = [];

    // This checks for Genies NFTs
    if let collection = getAccount(user).getCapability(Genies.CollectionPublicPath).borrow<&Genies.Collection{Genies.GeniesNFTCollectionPublic}>() {
      let ids: [UInt64] = collection.getIDs();
      var collections: [UInt32] = [];
      var editions: [UInt32] = [];

      // Gather all Collections & Editions the User is holding
      for id in ids {
        let nft = collection!.borrowGeniesNFT(id: id)!;

        let editionID: UInt32 = nft.editionID;
        if ! editions.contains(editionID) {
          editions.append(editionID);
        }

        let collectionID: UInt32 = Genies.getEditionData(id: editionID).collectionID;
        if ! collections.contains(collectionID) {
          collections.append(collectionID);
        }
      }

      // Check if User holds a Lucid Tokyo Wearable
      if collections.contains(1) {
        earnedRoles.append(roleIds[0]);
      }
    }

    return earnedRoles;
  }
  `;
}

function NFW() {
  return `
  import NonFungibleToken from 0x1d7e57aa55817448
  import DriverzNFT from 0xa039bd7d55a96c0c
  import Flunks from 0x807c3d470888cc48 
  import FIND from 0x097bafa4e0b48eef
  import Bl0x from 0x7620acf6d7f2468a
  import GooberXContract from 0x34f2bf4a80bb0f69 
  import EmeraldIdentity from 0xEmeraldIdentity
  import EmeraldIdentityDapper from 0xEmeraldIdentity
  import CryptoPiggo from 0xd3df824bf81910a4
  import ArleeScene from 0x47cbd3edd044cb5d
  import EnemyMetal from 0xa38d9dda1d06fdea
  import Epix from 0xcc838e3f0213008f
  import SNKRHUDNFT from 0x80af1db15aa6535a
  import Flovatar from 0x921ea449dffec68a
  import GoatedGoats from 0x2068315349bdfce5
  import Momentables from 0x9d21537544d9123d
  import Gaia from 0x8b148183c28ff88f
  import MetaPanda from 0xf2af175e411dfff8
  import SomePlaceCollectible from 0x667a16294a089ef8
  import BarterYardClubWerewolf from 0x28abb9f291cadaf2

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // Driverz
    if let collection = getAccount(user).getCapability(DriverzNFT.CollectionPublicPath).borrow<&{DriverzNFT.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[0])
      }
    }

    // Flunks
    if let collection = getAccount(user).getCapability(Flunks.CollectionPublicPath).borrow<&Flunks.Collection{Flunks.FlunksCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[1])
      }
    }

    // .find
    let name = FIND.reverseLookup(user)
    if name != nil {
      earnedRoles.append(roleIds[2])
    }

    // bl0x
    if let collection = getAccount(user).getCapability(Bl0x.CollectionPublicPath).borrow<&Bl0x.Collection{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[3])
      }
    }

    // GOOBz
    if let collection = getAccount(user).getCapability(GooberXContract.CollectionPublicPath).borrow<&{GooberXContract.GooberCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[4])
      }
    } 

    // EmeraldID
    if EmeraldIdentity.getDiscordFromAccount(account: user) != nil || EmeraldIdentityDapper.getDiscordFromAccount(account: user) != nil {
      earnedRoles.append(roleIds[5])
    }

    // Piggos
    if let collection = getAccount(user).getCapability(CryptoPiggo.CollectionPublicPath).borrow<&{CryptoPiggo.CryptoPiggoCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[6])
      }
    } 

    // Crypto Pharaohs
    if let collection = getAccount(user).getCapability(Momentables.CollectionPublicPath).borrow<&{Momentables.MomentablesCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[7])
      }
    } 

    // Arlequin
    if let collection = getAccount(user).getCapability(ArleeScene.CollectionPublicPath).borrow<&{ArleeScene.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[8])
      }
    } 

    // Epix
    if let collection = getAccount(user).getCapability(Epix.CollectionPublicPath).borrow<&{Epix.EpixCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[9])
      }
    } 

    // Enemy Metal
    if let collection = getAccount(user).getCapability(EnemyMetal.CollectionPublicPath).borrow<&{EnemyMetal.EnemyMetalCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[10])
      }
    } 

    // SNKRHUD
    if let collection = getAccount(user).getCapability(SNKRHUDNFT.CollectionPublicPath).borrow<&{SNKRHUDNFT.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[11])
      }
    } 

    // Flovatar
    if let collection = getAccount(user).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[12])
      }
    } 

    // Goated Goats
    if let collection = getAccount(user).getCapability(GoatedGoats.CollectionPublicPath).borrow<&{GoatedGoats.GoatCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[13])
      }
    } 

    // Ballerz
    if let collection = getAccount(user).getCapability(Gaia.CollectionPublicPath).borrow<&{Gaia.CollectionPublic}>() {
      for id in collection.getIDs() {
        let nft = collection.borrowGaiaNFT(id: id)!
        let info = Gaia.getSetInfo(setID: nft.data.setID)
        if info != nil && info!.name == "Ballerz" {
          earnedRoles.append(roleIds[14])
          continue
        }
      }
    } 

    // MetaPandas
    if let collection = getAccount(user).getCapability(MetaPanda.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[15])
      }
    } 

    // some.place
    if let collection = getAccount(user).getCapability(SomePlaceCollectible.CollectionPublicPath).borrow<&{SomePlaceCollectible.CollectibleCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[16])
      }
    } 

    // Barter Yard Club
    if let collection = getAccount(user).getCapability(BarterYardClubWerewolf.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[17])
      }
    } 

    return earnedRoles
  } 
  `;
}

function WIT() {
  return `
  import NonFungibleToken from 0x1d7e57aa55817448
  import GooberXContract from 0x34f2bf4a80bb0f69 
  import CryptoPiggo from 0xd3df824bf81910a4
  import Flovatar from 0x921ea449dffec68a
  import Gaia from 0x8b148183c28ff88f
  import Flunks from 0x807c3d470888cc48

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // Ballerz
    if let collection = getAccount(user).getCapability(Gaia.CollectionPublicPath).borrow<&{Gaia.CollectionPublic}>() {
      for id in collection.getIDs() {
        let nft = collection.borrowGaiaNFT(id: id)!
        let info = Gaia.getSetInfo(setID: nft.data.setID)
        if info != nil && info!.name == "Ballerz" {
          earnedRoles.append(roleIds[0])
          continue
        }
      }
    } 

    // Piggos
    if let collection = getAccount(user).getCapability(CryptoPiggo.CollectionPublicPath).borrow<&{CryptoPiggo.CryptoPiggoCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[1])
      }
    } 

    // GOOBz
    if let collection = getAccount(user).getCapability(GooberXContract.CollectionPublicPath).borrow<&{GooberXContract.GooberCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[2])
      }
    } 

    // Flovatar
    if let collection = getAccount(user).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[3])
      }
    } 

    // Flunks
    if let collection = getAccount(user).getCapability(Flunks.CollectionPublicPath).borrow<&Flunks.Collection{Flunks.FlunksCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[4])
      }
    }

    return earnedRoles
  } 
  `;
}

function Flovatar() {
  return `
  import Flovatar from 0x921ea449dffec68a

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    let flovatarsData: [Flovatar.FlovatarData] = Flovatar.getFlovatars(address: user)

    // This checks for at least 1 Flovatar
    if flovatarsData.length > 0 {
      earnedRoles.append(roleIds[0])
    }
              
    for flovatar in flovatarsData {
      // ape
      if (flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B35H"){
        earnedRoles.append(roleIds[1])
      }

      // devil
      if (flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B39H"){
        earnedRoles.append(roleIds[2])
      }

      // flotrotter
      var str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(3), upTo: flovatar.metadata.combination.length)
      if (str == "C84" || str == "C85" || str == "C86"){
        earnedRoles.append(roleIds[3])
      }

      // droid
      str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
      if (str == "B37H" || str == "B57H" || str == "B58H"){
        earnedRoles.append(roleIds[4])
      }

      // racer
      str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if(str == "C133" || str == "C134" || str == "C135" || str == "C136" || str == "C137"){
        earnedRoles.append(roleIds[5])
      }

      // cat
      if (flovatar.metadata.combination.slice(from: 0, upTo: 4) == "B36H"){
        earnedRoles.append(roleIds[6])
      }

      // naked
      str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if(str == "C121"){
        earnedRoles.append(roleIds[7])
      }

      // undead
      str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
      if(str == "B40H" || str == "B41H" || str == "B42H" || str == "B72H"){
        earnedRoles.append(roleIds[8])
      }

      // power
      str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if(str == "C127" || str == "C128" || str == "C129" || str == "C130" || str == "C131" || str == "C132"){
        earnedRoles.append(roleIds[9])
      }

      // starbattle
      str = flovatar.metadata.combination.slice(from: 0, upTo: 4)
      var str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if(str == "B66H" || str2 == "C166" || str2 == "C167" || str2 == "C168"){
        earnedRoles.append(roleIds[10])
      }

      // suit
      str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(3), upTo: flovatar.metadata.combination.length)
      str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if (str == "C90" || str2 == "C173" || str2 == "C174" || str2 == "C175" || str2 == "C176" || str2 == "C177" || str2 == "C178" || str2 == "C179" || str2 == "C180"){
        earnedRoles.append(roleIds[11])
      }

      /*
      // girlpower
      str = flovatar.metadata.combination.slice(from: 3, upTo: 7)
      str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if (
          (str2 == "C100" || str2 == "C101" || str2 == "C145" || str2 == "C115" || str2 == "C116" || str2 == "C204" || str2 == "C189")
          &&
          (str == "H295" || str == "H296" || str == "H297" || str == "H298" || str == "H299" || str == "H300" || str == "H334" || str == "H335" || str == "H336" || str == "H337" || str == "H338" || str == "H339" || str == "H371" || str == "H372" || str == "H373" || str == "H331" || str == "H332" || str == "H333" || str == "H356" || str == "H357" || str == "H358" || str == "H383" || str == "H384" || str == "H385" || str == "H386")
          ) {
        earnedRoles.append(roleIds[12])
      }
      */

      // stoner
      let accessoryId: UInt64 = flovatar.accessoryId ?? 0
      str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(8), upTo: flovatar.metadata.combination.length - Int(4))
      str2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(7), upTo: flovatar.metadata.combination.length - Int(3))
      if (str == "M444" || str2 == "M444" || str == "M443" || str2 == "M443" || accessoryId == UInt64(15)){
        earnedRoles.append(roleIds[13])
      }

      // mustache
      str = flovatar.metadata.combination.slice(from: 7, upTo: 9)
      if(str != "Fx"){
        earnedRoles.append(roleIds[14])
      }

      // first100
      if (flovatar.id <= UInt64(100)){
        earnedRoles.append(roleIds[15])
      }

      // astronaut
      str = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if(str == "C158" || str == "C159" || str == "C160" || str == "C161" || str == "C162" || str == "C163" || str == "C164" || str == "C165"){
        earnedRoles.append(roleIds[16])
      }

      // legendary
      if(flovatar.metadata.legendaryCount > UInt8(0)){
        earnedRoles.append(roleIds[17])
      }

      /*
      // gray
      var strB = flovatar.metadata.combination.slice(from: 0, upTo: 3)
      var strH = flovatar.metadata.combination.slice(from: 3, upTo: 7)
      var strC = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(3), upTo: flovatar.metadata.combination.length)
      var strC2 = flovatar.metadata.combination.slice(from: flovatar.metadata.combination.length - Int(4), upTo: flovatar.metadata.combination.length)
      if (
          (strB == "B47" || strB == "B67" || strB == "B36" || strB == "B71" || str == "B58")
          &&
          (strC == "C81" || strC == "C83" || strC == "C92" || strC == "C93" || strC == "C95" || strC == "C76" || strC == "C78" || strC2 == "C101" || strC2 == "C151" || strC2 == "C207" || strC2 == "C211" || strC2 == "C102" || strC2 == "C115" || strC2 == "C138" || strC2 == "C155" || strC2 == "C171" || strC2 == "C197" || strC2 == "C121" || strC2 == "C122" || strC2 == "C124" || strC2 == "C127" || strC2 == "C167" || strC2 == "C181")
          &&
          (strH == "H288" || strH == "H289" || strH == "H295" || strH == "H296" || strH == "H301" || strH == "H303" || strH == "H307" || strH == "H313" || strH == "H316" || strH == "H319" || strH == "H334" || strH == "H359" || strH == "H367" || strH == "H371" || strH == "H381" || strH == "H291" || strH == "H293" || strH == "H323" || strH == "H348" || strH == "H352" || strH == "H384" || strH == "H290" || strH == "H327" || strH == "H329" || strH == "H340" || strH == "H341")
          ) {
        earnedRoles.append(roleIds[18])
      }
      */
    }

    return earnedRoles
  }
  `;
}

function SNKRHUD() {
  return `
  import SNKRHUDNFT from 0x80af1db15aa6535a
  import NonFungibleToken from 0x1d7e57aa55817448

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // This checks for NFT asset count
    if let collection = getAccount(user).getCapability(SNKRHUDNFT.CollectionPublicPath).borrow<&{SNKRHUDNFT.CollectionPublic}>() {
      let ids = collection.getIDs()

      if ids.length >= 10 {
        earnedRoles.append(roleIds[1])
      } else if ids.length >= 1 {
        earnedRoles.append(roleIds[0])
      }
    }

    return earnedRoles
  }
  `;
}

function TheFabricant() {
  return `
  import ItemNFT from 0xfc91de5e6566cc7c
  import TheFabricantS1ItemNFT from 0x09e03b1f871b3513
  import TheFabricantS2ItemNFT from 0x7752ea736384322f
  import TheFabricantAccessPass from 0x7752ea736384322f

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    if let collection = getAccount(user).getCapability(ItemNFT.CollectionPublicPath).borrow<&{ItemNFT.ItemCollectionPublic}>() {
      if collection.getIDs().length > 0 {
        earnedRoles.append(roleIds[0])
      }
    }
    if let collection = getAccount(user).getCapability(TheFabricantS1ItemNFT.CollectionPublicPath).borrow<&{TheFabricantS1ItemNFT.ItemCollectionPublic}>() {
      if collection.getIDs().length > 0 {
        earnedRoles.append(roleIds[1])
      }
    } 
    if let collection = getAccount(user).getCapability(TheFabricantS2ItemNFT.CollectionPublicPath).borrow<&{TheFabricantS2ItemNFT.ItemCollectionPublic}>() {
      if collection.getIDs().length > 0 {
        earnedRoles.append(roleIds[2])
      }
    } 
    if let collection = getAccount(user).getCapability(TheFabricantAccessPass.TheFabricantAccessPassCollectionPublicPath).borrow<&{TheFabricantAccessPass.TheFabricantAccessPassCollectionPublic}>() {
      if collection.getIDs().length > 0 {
        earnedRoles.append(roleIds[3])
      }
    }

    return earnedRoles
  }
  `;
}

function Bl0x() {
  return `
  import Bl0x from 0x7620acf6d7f2468a
  import NonFungibleToken from 0x1d7e57aa55817448
  import Bl0xPack from 0x7620acf6d7f2468a
  import MetadataViews from 0x1d7e57aa55817448

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = [];

    if let collection = getAccount(user).getCapability(Bl0x.CollectionPublicPath).borrow<&Bl0x.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>() {
      let ids = collection.getIDs()
      if ids.length >= 25 {
        earnedRoles.append(roleIds[3])
      } else if ids.length >= 15 {
        earnedRoles.append(roleIds[2])
      } else if ids.length >= 5 {
        earnedRoles.append(roleIds[1])
      } else if ids.length >= 1 {
        earnedRoles.append(roleIds[0])
      }

      for id in ids {
        let nft = collection.borrowViewResolver(id: id)!
        let view = nft.resolveView(Type<Bl0x.Data>())! as! Bl0x.Data
    
        if view.traits.keys.contains("Module") {
          earnedRoles.append(roleIds[5])
        }
        // if view.traits.keys.contains("Artifact") {
        //   earnedRoles.append(roleIds[6])
        // }
      }
    }

    if let collection = getAccount(user).getCapability(Bl0xPack.CollectionPublicPath).borrow<&Bl0xPack.Collection{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length > 0 {
        earnedRoles.append(roleIds[4])
      }
    }

    return earnedRoles
  }
  `;
}

function Flowscore() {
  return `
  import NonFungibleToken from 0x1d7e57aa55817448
  import SNKRHUDNFT from 0x80af1db15aa6535a
  import Bl0x from 0x7620acf6d7f2468a

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // SNKRHUD
    if let collection = getAccount(user).getCapability(SNKRHUDNFT.CollectionPublicPath).borrow<&{SNKRHUDNFT.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[0])
      }
    }

    // bl0x
    if let collection = getAccount(user).getCapability(Bl0x.CollectionPublicPath).borrow<&Bl0x.Collection{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[1])
      }
    }
  }
  `;
}

function MotoGP() {
  return `
  import NonFungibleToken from 0x1d7e57aa55817448
  import MotoGPCard from 0xa49cc0ee46c54bfb

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // 5 of them
    if let collection = getAccount(user).getCapability(/public/motogpCardCollection).borrow<&MotoGPCard.Collection{MotoGPCard.ICardCollectionPublic}>() {
      if collection.getIDs().length >= 5 {
        earnedRoles.append(roleIds[0])
      }
    }
  }
  `;
}

function CNN() {
  return `
  import CNN_NFT from 0x329feb3ab062d289

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    if let collection = getAccount(user).getCapability(CNN_NFT.CollectionPublicPath).borrow<&{CNN_NFT.CNN_NFTCollectionPublic}>() {
      let ids = collection.getIDs()
      
      // This checks for at least 1 CNN Moment
      if ids.length >= 1 {
        // This assigns the Vault Collector role
        earnedRoles.append(roleIds[0])
      }
      for id in ids {
        let moment = collection.borrowCNN_NFT(id: id)!
        let metadata = CNN_NFT.getSetMetadata(setId: moment.setId)!
        
        // This checks for the First Collector Coin
        if (metadata["name"] == "First Collector Coin") {

          // This assigns the First Collector role
          earnedRoles.append(roleIds[1])
        }
        
        // This checks for the Purveyor of the Arts Coin
        if (metadata["name"] == "Purveyor of the Arts Coin") {

          // This assigns the Purveyor of the Arts role
          earnedRoles.append(roleIds[2])
        }

        // This checks for the Mandela moment
        if (metadata["name"] == "Nelson Mandela Released from Prison") {

          // This assigns the Vault Mandela role
          earnedRoles.append(roleIds[3])
        }
      }
    }
    return earnedRoles
  }
  `;
}

function TSE() {
  return `
  import TopShot from 0x0b2a3299cc857e29

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []
    
    if let collection = getAccount(user).getCapability(/public/MomentCollection).borrow<&{TopShot.MomentCollectionPublic}>() {
      let setID: UInt32 = 65

      // We -1 here because there was a burned moment
      let neededLength = TopShot.getPlaysInSet(setID: setID)!.length - 1
      
      let ids = collection.getIDs()
      let playIds: [UInt32] = []
      for id in ids {
        let moment = collection.borrowMoment(id: id)!
        let playID = moment.data.playID
        if moment.data.setID == setID && !playIds.contains(playID) {
          playIds.append(playID)
        }
      }
      if playIds.length == neededLength {
        earnedRoles.append(roleIds[0])
      }
    }

    return earnedRoles
  }
  `;
}

function Momentables() {
  return `
  import Momentables from 0x9d21537544d9123d

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = [];
    var cryptoPharoahCount: UInt64 = 0;
    var pharoahCatsCount: UInt64 = 0;

    let collection = getAccount(user).getCapability(Momentables.CollectionPublicPath).borrow<&{Momentables.MomentablesCollectionPublic}>()!;

    for id in collection.getIDs() {
        let item = collection.borrowMomentables(id: id)
        let momentableCollectionDetails = item!.getMomentableCollectionDetails();

        if(momentableCollectionDetails["Collection Name"]!=nil){
            let name = momentableCollectionDetails["Collection Name"]!;
            if(name == "Crypto Pharaohs"){
                cryptoPharoahCount = cryptoPharoahCount + 1;
            }else if(name == "Pharaoh Cats"){
                pharoahCatsCount = pharoahCatsCount + 1;
            }
            
        }else if(momentableCollectionDetails["name"]!=nil){
            let name = momentableCollectionDetails["name"]!;
            if(name == "Crypto Pharaohs"){
                cryptoPharoahCount = cryptoPharoahCount + 1;
            }else if(name == "Pharaoh Cats"){
                pharoahCatsCount = pharoahCatsCount + 1;
            }
        }
        else{
            earnedRoles.append(roleIds[0]);
        }
         
     }

    // Crypto Pharaohs Roles
    if (cryptoPharoahCount>0 && cryptoPharoahCount < 3){
        earnedRoles.append(roleIds[0]);
    }else if(cryptoPharoahCount>=3 && cryptoPharoahCount < 6){
        earnedRoles.append(roleIds[1]);
    }else if(cryptoPharoahCount>=6 && cryptoPharoahCount < 9){
        earnedRoles.append(roleIds[2]);
    }else if(cryptoPharoahCount>=9){
        earnedRoles.append(roleIds[3]);
    }

    // Pharaoh Cats Roles

    if (pharoahCatsCount>0 && pharoahCatsCount < 3){
        earnedRoles.append(roleIds[4]);
    }else if(pharoahCatsCount>=3 && pharoahCatsCount < 6){
        earnedRoles.append(roleIds[5]);
    }else if(pharoahCatsCount>=6 && pharoahCatsCount < 9){
        earnedRoles.append(roleIds[6]);
    }else if(pharoahCatsCount>=9){
        earnedRoles.append(roleIds[7]);
    }
    
    return earnedRoles
  }
  `;
}

function Gaia() {
  return `
  import NonFungibleToken from 0x1d7e57aa55817448
  import DriverzNFT from 0xa039bd7d55a96c0c
  import Flunks from 0x807c3d470888cc48 
  import SNKRHUDNFT from 0x80af1db15aa6535a
  import Gaia from 0x8b148183c28ff88f
  import MetaPanda from 0xf2af175e411dfff8
  import BarterYardClubWerewolf from 0x28abb9f291cadaf2
  import UFC_NFT from 0x329feb3ab062d289
  import TopShot from 0x0b2a3299cc857e29
  import AllDay from 0xe4cf4bdc1751c65d
  import DimensionX from 0xe3ad6030cbaff1c2
  
  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // Ballerz
    if let collection = getAccount(user).getCapability(Gaia.CollectionPublicPath).borrow<&{Gaia.CollectionPublic}>() {
      for id in collection.getIDs() {
        let nft = collection.borrowGaiaNFT(id: id)!
        let info = Gaia.getSetInfo(setID: nft.data.setID)
        if info != nil && info!.name == "Ballerz" {
          earnedRoles.append(roleIds[0])
          continue
        }
      }
    }

    // Sneakerz
    if let collection = getAccount(user).getCapability(Gaia.CollectionPublicPath).borrow<&{Gaia.CollectionPublic}>() {
      for id in collection.getIDs() {
        let nft = collection.borrowGaiaNFT(id: id)!
        let info = Gaia.getSetInfo(setID: nft.data.setID)
        if info != nil && info!.name == "Sneakerz" {
          earnedRoles.append(roleIds[1])
          continue
        }
      }
    }
    
    // Driverz
    if let collection = getAccount(user).getCapability(DriverzNFT.CollectionPublicPath).borrow<&{DriverzNFT.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[2])
      }
    }

    // Flunks
    if let collection = getAccount(user).getCapability(Flunks.CollectionPublicPath).borrow<&Flunks.Collection{Flunks.FlunksCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[3])
      }
    }

    // SNKRHUD
    if let collection = getAccount(user).getCapability(SNKRHUDNFT.CollectionPublicPath).borrow<&{SNKRHUDNFT.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[4])
      }
    }

    // MetaPandas
    if let collection = getAccount(user).getCapability(MetaPanda.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[5])
      }
    }
    
    // Barter Yard Club
    if let collection = getAccount(user).getCapability(BarterYardClubWerewolf.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[6])
      }
    }

    // Cool Cats
    if let collection = getAccount(user).getCapability(/public/MomentCollection).borrow<&{TopShot.MomentCollectionPublic}>() {
      let ids = collection.getIDs()
      var answer: UInt64 = 0
      var coveredPlays: [UInt32] = []
      for id in ids {
        let moment = collection.borrowMoment(id: id)!
        // If it is a cool cat
        if moment.data.setID == 32 {
          answer = answer + 1
          if !coveredPlays.contains(moment.data.playID) {
            coveredPlays.append(moment.data.playID)
          }
        }
      }
      // If the user has 3 or more Cool Cat Moments
      if answer >= 3 {
        earnedRoles.append(roleIds[11])
      }
      // If the user has all 30 unique Cool Cat Moments
      if coveredPlays.length == 30 {
        earnedRoles.append(roleIds[12])
      }
    }

    // Dimension X
    if let collection = getAccount(user).getCapability(DimensionX.CollectionPublicPath).borrow<&{DimensionX.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[15])
      }
    }
    
    return earnedRoles
  } 
  `;
}

function ABD() {
  return `
  import ABD from 0x67af7ecf76556cd3

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    
    if let collection = getAccount(user).getCapability(/public/ABDMomentCollection).borrow<&{ABD.MomentCollectionPublic}>() {
      let ids = collection.getIDs()

      if ids.length > 0 {
        earnedRoles.append(roleIds[0])
      }
      
      for id in ids {
        if !earnedRoles.contains(roleIds[1]) && (id >= 10748 && id <= 11047) {
          earnedRoles.append(roleIds[1])
        }
  
        if !earnedRoles.contains(roleIds[2]) && ((id >= 10548 && id <= 10747) || (id >= 1 && id <= 99) || (id >= 10498 && id <= 10547) || id == 55657) {
          earnedRoles.append(roleIds[2])
        }

        let abd69Ids: [UInt64] = [1, 69, 100, 168, 480, 548, 860, 928, 1240, 1308, 1478, 1546, 1858, 1926, 2238, 2306, 2618, 2686, 2998, 3066, 3236, 3304, 3616, 3684, 3996, 4064, 4376, 4444, 4756, 4824, 5136, 5204, 5516, 5584, 5896, 5964, 6133, 6201, 6370, 6438, 6750, 6818, 7130, 7198, 7510, 7578, 7747, 7815, 8127, 8195, 8364, 8432, 8601, 8669, 8838, 8906, 9075, 9143, 9312, 9380, 9549, 9617, 9786, 9854, 10023, 10091, 10261, 10329, 10548, 10616, 10748, 10816, 11048, 11116, 15344, 15412, 17161, 17229, 21457, 21525, 23274, 23342, 27570, 27638, 29387, 29455, 33683, 33751, 35500, 35568, 39796, 39864, 41613, 41681, 45909, 45977, 47726, 47794, 52022, 52090, 53839, 53907]
        if !earnedRoles.contains(roleIds[3]) && abd69Ids.contains(id) {
          earnedRoles.append(roleIds[3])
        }

        let abd420Ids: [UInt64] = [11467, 15763, 17580, 21876, 23693, 27989, 29806, 34102, 35919, 40215, 42032, 46328, 48145, 52441, 54258]
        if !earnedRoles.contains(roleIds[4]) && abd420Ids.contains(id) {
          earnedRoles.append(roleIds[4])
        }
      }
    } 

    return earnedRoles
  }
  `;
}

function Flow() {
  return `
  import FLOAT from 0xFLOAT

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    if let floatCollection = getAccount(user).getCapability(FLOAT.FLOATCollectionPublicPath).borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>() {
      if floatCollection.ownedIdsFromEvent(eventId: UInt64(482557017)).length > 0 {
        earnedRoles.append(roleIds[0])
      }
      if floatCollection.ownedIdsFromEvent(eventId: UInt64(557504388)).length > 0 {
        earnedRoles.append(roleIds[1])
      }
    }

    return earnedRoles
  }
  `;
}

function Gamisodes() {
  return `
  import Gamisodes from 0x20187093790b9aef

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    let truths: {Int: Bool} = {}
    if let gamisodesCollection = getAccount(user).getCapability(Gamisodes.CollectionPublicPath).borrow<&Gamisodes.Collection{Gamisodes.GamisodesCollectionPublic}>() {
      for id in gamisodesCollection.getIDs() {
        if id >= 1 && id <= 10000 {
          truths[0] = true
        } else if id >= 10001 && id <= 15000 {
          truths[1] = true
        } else if id >= 15001 && id <= 17500 {
          truths[2] = true
        } else if id >= 17501 && id <= 56014 {
          truths[3] = true
        }
      }
    }

    if truths.keys.length == 4 {
      earnedRoles.append(roleIds[0])
    }

    return earnedRoles
  }
  `;
}

function NFTDay() {
  return `
  import NonFungibleToken from 0x1d7e57aa55817448
  import FIND from 0x097bafa4e0b48eef
  import GooberXContract from 0x34f2bf4a80bb0f69 
  import CryptoPiggo from 0xd3df824bf81910a4
  import Flovatar from 0x921ea449dffec68a
  import Momentables from 0x9d21537544d9123d
  import Gaia from 0x8b148183c28ff88f
  import BarterYardClubWerewolf from 0x28abb9f291cadaf2

  pub fun main(user: Address, roleIds: [String]): [String] {
    var earnedRoles: [String] = []

    // Barter Yard Club
    if let collection = getAccount(user).getCapability(BarterYardClubWerewolf.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[0])
      }
    } 

    // Flovatar
    if let collection = getAccount(user).getCapability(Flovatar.CollectionPublicPath).borrow<&{Flovatar.CollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[1])
      }
    } 

    // GOOBz
    if let collection = getAccount(user).getCapability(GooberXContract.CollectionPublicPath).borrow<&{GooberXContract.GooberCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[2])
      }
    } 

    // Piggos
    if let collection = getAccount(user).getCapability(CryptoPiggo.CollectionPublicPath).borrow<&{CryptoPiggo.CryptoPiggoCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[3])
      }
    } 

    // Crypto Pharaohs
    if let collection = getAccount(user).getCapability(Momentables.CollectionPublicPath).borrow<&{Momentables.MomentablesCollectionPublic}>() {
      if collection.getIDs().length >= 1 {
        earnedRoles.append(roleIds[4])
      }
    } 

    // .find
    let name = FIND.reverseLookup(user)
    if name != nil {
      earnedRoles.append(roleIds[5])
    }

    return earnedRoles
  } 
  `;
}


const holdingScripts = {
  UFC,
  Flunks,
  IXLabs,
  NFL,
  Driverz,
  Genies,
  NFW,
  EAD,
  WIT,
  InceptionAnimals,
  Flovatar,
  SNKRHUD,
  Bl0x,
  TheFabricant,
  Flowscore,
  MotoGP,
  CNN,
  TSE,
  Gaia,
  Momentables,
  ABD,
  Flow,
  NFTDay,
  Gamisodes
};

module.exports = {
  holdingScripts,
};
