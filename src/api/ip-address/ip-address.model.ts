import mongoose, { model } from "mongoose";
import { IpAddress as iIpIdentity } from "./ip-address.entity";

export const ipIdentitySchema = new mongoose.Schema<iIpIdentity>({
    ip : {type: String},
    createdAt: { type: Date, default: Date.now },
    valid: {type: Boolean},
    description: {type: String}
});



export const IpAddress = model<iIpIdentity>("IpAddress", ipIdentitySchema)