import mongoose, { model } from "mongoose";
import { ipAdddressIdentity as iIpIdentity } from "./ip-address.entity";

export const ipIdentitySchema = new mongoose.Schema<iIpIdentity>({
    ip : {type: String},
    accessDate : {type: Date, default: Date.now},
    valid: {type: Boolean},
});



export const IpAdddress = model<iIpIdentity>("IpAddress", ipIdentitySchema)