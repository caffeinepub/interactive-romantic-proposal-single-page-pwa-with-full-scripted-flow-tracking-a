import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  // Define new types for migration scope
  type FileMeta = {
    fileId : Text;
    filename : Text;
    contentType : Text;
    size : Nat;
    uploadTime : Time.Time;
  };

  type TrackedFileEvent = {
    fileMeta : FileMeta;
    uploadTimestamp : Time.Time;
    eventType : Text;
    additionalData : Text;
  };

  type AdminPreference = {
    preferenceType : Text;
    value : Bool;
  };

  type JourneyInteraction = {
    interactionId : Nat;
    timestamp : Time.Time;
    interactionType : Text;
    questionId : Nat;
    response : Text;
    isCorrect : Bool;
  };

  type JourneySession = {
    sessionId : Nat;
    user : Principal;
    state : Text;
  };

  type UserProfile = {
    name : Text;
  };

  type ActivityEvent = {
    userId : Principal;
    timestamp : Time.Time;
    eventType : Text;
    details : Text;
  };

  // Define original (old) actor type
  type OldActor = {
    fileStorage : Map.Map<Text, Blob>;
    externalFiles : Map.Map<Text, FileMeta>;
    userPreferences : Map.Map<Principal, List.List<AdminPreference>>;
    userProfiles : Map.Map<Principal, UserProfile>;
    journeySessions : Map.Map<Nat, JourneySession>;
    nextSessionId : Nat;
  };

  // Define new (current) actor type
  type NewActor = {
    fileStorage : Map.Map<Text, Blob>;
    externalFiles : Map.Map<Text, FileMeta>;
    userPreferences : Map.Map<Principal, List.List<AdminPreference>>;
    userProfiles : Map.Map<Principal, UserProfile>;
    journeySessions : Map.Map<Nat, JourneySession>;
    nextSessionId : Nat;
    activityEvents : Map.Map<Principal, List.List<ActivityEvent>>;
  };

  public func run(old : OldActor) : NewActor {
    let activityEvents = Map.empty<Principal, List.List<ActivityEvent>>();
    { old with activityEvents };
  };
};
