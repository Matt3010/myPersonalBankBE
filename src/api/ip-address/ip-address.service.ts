import { IpAddress } from "./ip-address.entity";
import { IpAddress as IpAddressModel } from "./ip-address.model";

export class IpAddressService {

    async add(ip: string, completed: boolean, description: string) {
        const IpAddress = await IpAddressModel.create({
            ip,
            valid: completed,
            description
        });
        return IpAddress;
    }

    async get() : Promise<IpAddress[]> {
        const list = await IpAddressModel.find();
        return list;
    }
}

export default new IpAddressService();