const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let userDaoPath = './User/UserDao';
let subDaoPath = './Subscription/SubscriptionDao';

if (usingMockDb === 'true') {
    userDaoPath += '.mock';
    subDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
export const { SubscriptionDao} = require(subDaoPath);
