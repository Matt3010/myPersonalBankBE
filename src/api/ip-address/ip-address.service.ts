import { ipAdddressIdentity } from "./ip-address.entity";
import { IpAdddress as IpAdddressModel } from "./ip-address.model";

export class IpAddressService {

    async view(ip: string, completed: boolean) {
        const IpAddress = await IpAdddressModel.create({
            ip,
            valid: completed
        });
        return IpAddress;
    }
}

export default new IpAddressService();