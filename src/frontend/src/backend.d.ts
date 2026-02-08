import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TrackedFileEvent {
    additionalData: string;
    fileMeta: FileMeta;
    uploadTimestamp: Time;
    eventType: string;
}
export interface JourneySession {
    user: Principal;
    state: string;
    sessionId: bigint;
}
export type Time = bigint;
export interface ActivityEvent {
    userId: Principal;
    timestamp: Time;
    details: string;
    eventType: string;
}
export interface FileMeta {
    contentType: string;
    size: bigint;
    filename: string;
    fileId: string;
    uploadTime: Time;
}
export interface JourneyInteraction {
    interactionType: string;
    isCorrect: boolean;
    response: string;
    timestamp: Time;
    questionId: bigint;
    interactionId: bigint;
}
export interface AdminPreference {
    value: boolean;
    preferenceType: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_queued {
    queued = "queued"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createJourneySession(user: Principal, state: string): Promise<bigint>;
    deleteLocalFile(fileId: string): Promise<boolean>;
    fileUploaded(event: TrackedFileEvent): Promise<boolean>;
    getActivitiesByType(userId: Principal, eventType: string): Promise<Array<ActivityEvent>>;
    getAllActivities(): Promise<Array<ActivityEvent>>;
    getAllFileUploads(): Promise<Array<FileMeta>>;
    getAllLocalFiles(): Promise<Array<string>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInProgressJourneys(): Promise<Array<{
    }>>;
    getJourneyByStatus(_status: string): Promise<Array<{
    }>>;
    getJourneySection(_section: string): Promise<Array<JourneyInteraction>>;
    getJourneySessionsForUser(user: Principal): Promise<Array<JourneySession>>;
    getUserActivities(userId: Principal): Promise<Array<ActivityEvent>>;
    getUserPreferences(): Promise<Array<AdminPreference>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordActivity(event: ActivityEvent): Promise<void>;
    recordActivityEvent(_event: {
    }): Promise<void>;
    requestDataExport(_request: {
    }): Promise<{
        status: Variant_queued;
        message: string;
        timestamp: Time;
    }>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveJourneyResponse(response: {
        answerId: bigint;
    }): Promise<bigint>;
    sendNotification(_toUser: Principal, _notificationType: string, _message: string): Promise<boolean>;
    setUserPreference(preference: AdminPreference): Promise<void>;
    updateExportStatus(_exportId: string, _newStatus: {
    }): Promise<boolean>;
}
