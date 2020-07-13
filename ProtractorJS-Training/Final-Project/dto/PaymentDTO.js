class PaymentDTO {
    constructor(type, cardNumber, cvv, expiryDate) {
        this.type = type;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.expiryDate = expiryDate
    }
}

module.exports = PaymentDTO;