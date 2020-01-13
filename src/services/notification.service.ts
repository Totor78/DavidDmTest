import {INotification} from '../entities/notification.entity';
import {NameCallerArgsReturnLogServicesInfoLevel} from '@shared';
import fetch from 'node-fetch';

export interface INotificationService {
    add: (notification: INotification, authorization: string) => Promise<any>;
}

export class NotificationService implements INotificationService {

    @NameCallerArgsReturnLogServicesInfoLevel('Notification')
    public async add(notification: INotification, authorization: string): Promise<any> {
        return fetch(process.env.MS_NOTIFICATIONS_URL || '', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
            body: JSON.stringify(notification),
        })
        .then((response: any) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.status;
        });
    }
}
