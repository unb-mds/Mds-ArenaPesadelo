import Container from "typedi";

import IHashProvider from "../HashProvider/models/IHashProvider";
import BcryptProvider from "../HashProvider/implementations";
import DiskProvider from "../DiskProvider/implementations/DiskProvider";
import { IDiskProvider } from "../DiskProvider/models/IDiskProvider";

Container.set<IHashProvider>('hashProviders.bcrypt', new BcryptProvider);
Container.set<IDiskProvider>('diskProviders.disk', new DiskProvider);
