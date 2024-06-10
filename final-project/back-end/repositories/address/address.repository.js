const Address = require('../../models/address/address.model');
const jwt = require('jsonwebtoken');

class AddressRepository {
    constructor() { }
    
    async addAddress(data, token) {
        const { street, city, state, zip, country } = data;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (!decodedToken) {
            return new Error('no token provided');
        }
        const address = new Address({
            userId,
            street,
            city,
            state,
            zip,
            country
        });
        address.save();
        return address;
    }


    async getAddresses(token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        if (!decodedToken) {
            return new Error('no token provided');
        }
        const addresses = await Address.find({ userId });
        return addresses;
    }

    async deleteAddress(id, token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.userId;
            if (!decodedToken) {
                throw new Error('No token provided');
            }
            const address = await Address.findById(id);
            if (!address) {
                throw new Error('Address not found');
            }
            if (address.userId.toString() !== userId) {
                throw new Error('Unauthorized to delete this address');
            }
            await address.remove();
            return address;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    
}

module.exports = AddressRepository;
