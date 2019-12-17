import {Container} from 'inversify';
import {interfaces, TYPE} from 'inversify-express-utils';
// import {SubscriptionController} from '../controllers/subscription.controller';
import {UserController} from '../controllers/user.controller';
import {SubscriptionController} from '../controllers/subscription.controller';

const container = new Container();
container.bind<interfaces.Controller>(TYPE.Controller)
    .to(UserController).inSingletonScope().whenTargetNamed(UserController.TARGET_NAME);

container.bind<interfaces.Controller>(TYPE.Controller)
    .to(SubscriptionController).inSingletonScope().whenTargetNamed(SubscriptionController.TARGET_NAME);

export default container;
