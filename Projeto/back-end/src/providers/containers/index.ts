import Container from "typedi";

import IHashProvider from "../HashProvider/models/IHashProvider";
import BcryptProvider from "../HashProvider/implementations";

Container.set<IHashProvider>('hashProviders.bcrypt', new BcryptProvider);
