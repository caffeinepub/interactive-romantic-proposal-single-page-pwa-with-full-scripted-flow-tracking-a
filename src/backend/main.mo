import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Blob "mo:core/Blob";
import Migration "migration";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Use migration via with clause
(with migration = Migration.run)
actor {
  type FileMeta = {
    fileId : Text;
    filename : Text;
    contentType : Text;
    size : Nat;
    uploadTime : Time.Time;
  };

  module FileMeta {
    public func compare(meta1 : FileMeta, meta2 : FileMeta) : Order.Order {
      Text.compare(meta1.fileId, meta2.fileId);
    };
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

  module JourneyInteraction {
    public func compare(interaction1 : JourneyInteraction, interaction2 : JourneyInteraction) : Order.Order {
      Nat.compare(interaction1.questionId, interaction2.questionId);
    };
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

  // Initialize the user system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var fileStorage = Map.empty<Text, Blob>();
  var externalFiles = Map.empty<Text, FileMeta>();

  let userPreferences = Map.empty<Principal, List.List<AdminPreference>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let journeySessions = Map.empty<Nat, JourneySession>();
  var nextSessionId = 0;

  var activityEvents = Map.empty<Principal, List.List<ActivityEvent>>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func recordActivityEvent(_event : {}) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record activity events");
    };
  };

  public shared ({ caller }) func fileUploaded(event : TrackedFileEvent) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can upload files");
    };
    externalFiles.add(event.fileMeta.fileId, event.fileMeta);
    true;
  };

  public shared ({ caller }) func deleteLocalFile(fileId : Text) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete local files");
    };
    var currentFiles = Map.empty<Text, Blob>();
    for ((id, content) in fileStorage.entries()) {
      if (id != fileId) {
        currentFiles.add(id, content);
      };
    };
    fileStorage := currentFiles;
    true;
  };

  public query ({ caller }) func getAllLocalFiles() : async [Text] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all local files");
    };
    fileStorage.keys().toArray();
  };

  public shared ({ caller }) func setUserPreference(preference : AdminPreference) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set preferences");
    };
    let currentPrefs = userPreferences.get(caller);
    let prefsList = switch (currentPrefs) {
      case (?prefs) { prefs };
      case (null) { List.empty<AdminPreference>() };
    };
    prefsList.add(preference);
    userPreferences.add(caller, prefsList);
  };

  public query ({ caller }) func getUserPreferences() : async [AdminPreference] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view preferences");
    };
    switch (userPreferences.get(caller)) {
      case (?prefs) {
        prefs.toArray();
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getJourneySection(_section : Text) : async [JourneyInteraction] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view journey sections");
    };
    [];
  };

  public query ({ caller }) func getJourneyByStatus(_status : Text) : async [{}] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view journeys by status");
    };
    [];
  };

  public query ({ caller }) func getInProgressJourneys() : async [{}] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view in-progress journeys");
    };
    [];
  };

  public query ({ caller }) func getAllFileUploads() : async [FileMeta] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all file uploads");
    };
    externalFiles.values().toArray().sort();
  };

  public shared ({ caller }) func sendNotification(_toUser : Principal, _notificationType : Text, _message : Text) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can send notifications");
    };
    true;
  };

  public shared ({ caller }) func requestDataExport(_request : {}) : async { timestamp : Time.Time; status : { #queued }; message : Text } {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can request data exports");
    };
    {
      timestamp = Time.now();
      status = #queued;
      message = "Export request has been queued";
    };
  };

  public shared ({ caller }) func updateExportStatus(_exportId : Text, _newStatus : {}) : async Bool {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update export status");
    };
    true;
  };

  public shared ({ caller }) func saveJourneyResponse(response : { answerId : Nat }) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save journey responses");
    };
    response.answerId;
  };

  public shared ({ caller }) func createJourneySession(user : Principal, state : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create journey sessions");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only create sessions for yourself");
    };
    let session = {
      sessionId = nextSessionId;
      user;
      state;
    };
    journeySessions.add(nextSessionId, session);
    nextSessionId += 1;
    session.sessionId;
  };

  public query ({ caller }) func getJourneySessionsForUser(user : Principal) : async [JourneySession] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own journey sessions");
    };
    let sessionsArray = journeySessions.values().toArray();
    sessionsArray.filter(func(s) { s.user == user });
  };

  public shared ({ caller }) func recordActivity(event : ActivityEvent) : async () {
    // Allow any user (including guests) to record activities, but only for themselves
    // Admins can record activities for any user (e.g., for system-generated events)
    if (caller != event.userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only record activities for yourself");
    };

    let currentEvents = activityEvents.get(event.userId);
    let eventsList = switch (currentEvents) {
      case (?events) { events };
      case (null) { List.empty<ActivityEvent>() };
    };
    eventsList.add(event);
    activityEvents.add(event.userId, eventsList);
  };

  public query ({ caller }) func getUserActivities(userId : Principal) : async [ActivityEvent] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own activities");
    };
    switch (activityEvents.get(userId)) {
      case (?events) {
        events.toArray();
      };
      case (null) { [] };
    };
  };

  public query ({ caller }) func getAllActivities() : async [ActivityEvent] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all activities");
    };
    var allEvents = List.empty<ActivityEvent>();
    for ((_, events) in activityEvents.entries()) {
      allEvents.addAll(events.values());
    };
    allEvents.toArray();
  };

  public query ({ caller }) func getActivitiesByType(userId : Principal, eventType : Text) : async [ActivityEvent] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own activities");
    };
    switch (activityEvents.get(userId)) {
      case (?events) {
        let filteredEvents = events.filter(
          func(e) { e.eventType == eventType }
        );
        filteredEvents.toArray();
      };
      case (null) { [] };
    };
  };
};
