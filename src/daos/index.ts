const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let userDaoPath = './User/user.dao';
let subDaoPath = './Subscription/subscription.dao';

if (usingMockDb === 'true') {
    userDaoPath += '.mock';
    subDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { UserDao } = require(userDaoPath);
export const { SubscriptionDao} = require(subDaoPath);
