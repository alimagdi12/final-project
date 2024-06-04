class PayementController {
    constructor(payementRepository) {
        this.payementRepository = payementRepository;
    }

    async payment(token, data) {
        try {
            // Include req in the data object
            const result = await this.payementRepository.payment({ ...data, req: data.req }, token);
            return { msg: 'payment added successfully', result };
        } catch (err) {
            console.error(err);
            return { msg: "failed to get payment", err: err.message };
        }
    }


}

module.exports = PayementController;
