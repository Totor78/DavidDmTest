import jwt_decode from 'jwt-decode';
import {v4String} from 'uuid/interfaces';

export const idMatch = (id: string) => {
    return id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
};

export const getIdFromAuthorization = (authorization: string): v4String => {
    const token = authorization.split(' ')[1];
    const decodedToken = jwt_decode(token);
    // @ts-ignore
    return decodedToken.sub;
}
