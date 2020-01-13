import {v4String} from 'uuid/interfaces';

export enum eNotificationType {
    LIKES,
    RETWEETS,
    FOLLOWS,
}

export interface INotification {
    notifierId: v4String;
    notifiedId: v4String;
    notificationType: eNotificationType;
}

export class NotificationEntity implements INotification {

    public notificationType: eNotificationType;
    public notifierId: v4String;
    public notifiedId: v4String;

    constructor(
        notificationType: eNotificationType,
        notifierId: v4String,
        notifiedId: v4String,
    ) {
        this.notificationType = notificationType;
        this.notifierId = notifierId;
        this.notifiedId = notifiedId;
    }
}
