import { RequestHandler } from "express";
import { missionInventoryUpdate } from "@/src/services/inventoryService";
import { IMissionInventoryUpdate } from "@/src/types/missionInventoryUpdateType";
/*
- [ ]  crossPlaySetting
- [ ]  rewardsMultiplier
- [ ]  ActiveBoosters
- [x]  LongGuns
- [x]  Pistols
- [x]  Suits
- [x]  Melee
- [x]  RawUpgrades
- [x]  MiscItems
- [x]  RegularCredits
- [ ]  RandomUpgradesIdentified
- [ ]  MissionFailed
- [ ]  MissionStatus
- [ ]  CurrentLoadOutIds
- [ ]  AliveTime
- [ ]  MissionTime
- [ ]  Missions
- [ ]  CompletedAlerts
- [ ]  LastRegionPlayed
- [ ]  GameModeId
- [ ]  hosts
- [x]  ChallengeProgress
- [ ]  SeasonChallengeHistory
- [ ]  PS (Passive anti-cheat data which includes your username, module list, process list, and system name.)
- [ ]  ActiveDojoColorResearch
- [ ]  RewardInfo
- [ ]  ReceivedCeremonyMsg
- [ ]  LastCeremonyResetDate
- [ ]  MissionPTS (Used to validate the mission/alive time above.)
- [ ]  RepHash (A hash from the replication manager/RepMgr Unknown what it does.)
- [ ]  EndOfMatchUpload
- [ ]  ObjectiveReached
- [ ]  FpsAvg
- [ ]  FpsMin
- [ ]  FpsMax
- [ ]  FpsSamples
*/

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const missionInventoryUpdateController: RequestHandler = async (req, res) => {
    const id = req.query.accountId as string;

    const [data] = String(req.body).split("\n");

    try {
        const parsedData = JSON.parse(data) as IMissionInventoryUpdate;
        if (typeof parsedData !== "object") throw new Error("Invalid data format");
        await missionInventoryUpdate(parsedData, id);
    } catch (err) {
        console.error("Error parsing JSON data:", err);
    }

    // TODO - Return the updated inventory the way the game does it.
    res.json({});
};

export { missionInventoryUpdateController };
