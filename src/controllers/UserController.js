import { User } from "../models/User.js";
import { UserError } from "../classes/UserError.js";

export const updateUser = async (id, firstname, lastname, email, password, photo) => {
    try {
        await User.update({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            photo: photo
        }, {
            where: { id: id }
        });
    } catch (error) {
        throw new UserError(500, error.message);
    }
};

