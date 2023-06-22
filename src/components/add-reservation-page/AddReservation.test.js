import {
  validateNumberOfNights, validateCheckInDate, validateGuestEmail, getEmptyFields
} from './AddReservation';
// import Constants from '../../utils/constants';

describe('validateNumberOfNights', () => {
  const expectedFailure = false;
  const expectedSuccess = true;

  it('Returns false if the number of nights is null', () => {
    const nullNightsData = { numberOfNights: null };
    expect(validateNumberOfNights(nullNightsData)).toEqual(expectedFailure);
  });

  it('Returns false if the number of nights is undefined', () => {
    const undefinedNightsData = {};
    expect(validateNumberOfNights(undefinedNightsData)).toEqual(expectedFailure);
  });

  it('Returns false if the number of nights is below zero', () => {
    const negativeNightsData = { numberOfNights: -1 };
    expect(validateNumberOfNights(negativeNightsData)).toEqual(expectedFailure);
  });

  it('Returns true if the number of nights is set and greater than zero', () => {
    const validNightsData = { numberOfNights: 1 };
    expect(validateNumberOfNights(validNightsData)).toEqual(expectedSuccess);
  });
});

describe('validateGuestEmail', () => {
  const expectedFailure = false;
  const expectedSuccess = true;

  it('Returns false if the guest email is null', () => {
    const nullGuestEmail = { guestEmail: null };
    expect(validateGuestEmail(nullGuestEmail)).toEqual(expectedFailure);
  });

  it('Returns false if the guest email is undefined', () => {
    const undefinedGuestEmail = {};
    expect(validateGuestEmail(undefinedGuestEmail)).toEqual(expectedFailure);
  });

  it('Returns false if the guest email is in the wrong format', () => {
    const wrongFormatGuestEmail = { guestEmail: 'Invalid email' };
    expect(validateGuestEmail(wrongFormatGuestEmail)).toEqual(expectedFailure);
  });

  it('Returns true if the guestEmail is set and in the correct format', () => {
    const validGuestEmail = { guestEmail: 'test@test.com' };
    expect(validateGuestEmail(validGuestEmail)).toEqual(expectedSuccess);
  });
});

describe('validateCheckInDate', () => {
  const expectedFailure = false;
  const expectedSuccess = true;

  it('Returns false if the check in date is null', () => {
    const nullCheckInDate = { checkInDate: null };
    expect(validateCheckInDate(nullCheckInDate)).toEqual(expectedFailure);
  });

  it('Returns false if the check in date is undefined', () => {
    const undefinedCheckInDate = {};
    expect(validateCheckInDate(undefinedCheckInDate)).toEqual(expectedFailure);
  });

  it('Returns false if the check in date is in the wrong format', () => {
    const wrongFormatCheckIn = { checkInDate: 'Invalid date' };
    expect(validateCheckInDate(wrongFormatCheckIn)).toEqual(expectedFailure);
  });

  it('Returns true if the check in date is set and in the correct format', () => {
    const validCheckInDate = { checkInDate: '01-22-2023' };
    expect(validateCheckInDate(validCheckInDate)).toEqual(expectedSuccess);
  });
});

describe('getEmptyFields', () => {
  const expectedFailure = false;
  const expectedSuccess = true;

  it('Returns a list with content when items are empty', () => {
    const emptyFieldsObject = {
      user: '',
      guestEmail: '',
      roomTypeId: '',
      checkInDate: '',
      numberOfNights: ''
    };
    expect(getEmptyFields(emptyFieldsObject).length === 0).toEqual(expectedFailure);
  });

  it('Returns an empty list when items are not empty', () => {
    const emptyFieldsObject = {
      user: 'not empty',
      guestEmail: 'not empty',
      roomTypeId: 1,
      checkInDate: 'not empty',
      numberOfNights: 5
    };
    expect(getEmptyFields(emptyFieldsObject).length === 0).toEqual(expectedSuccess);
  });
});

// describe('consolidateOrder', () => {
//   it('reduces the size of
// the list given there are multiples of the same product and keeps the same
// total quantity', () => {
//     const products = [
//       {
//         id: 1,
//         quantity: 2,
//         price: 9.99
//       },
//       {
//         id: 1,
//         quantity: 1,
//         price: 9.99
//       }
//     ];
//     const duplicateProducts = products.filter((p) => p.id === 1);
//     consolidateOrder(products[0], duplicateProducts, products);
//     expect(products.length).toEqual(1);
//     expect(products[0].quantity = 3);
//   });
// });

// describe('haveEnoughInventory', () => {
//   it('returns false if the inventory cannot cover an order', () => {
//     const expectedResult = false;
//     const product = {
//       id: 1,
//       quantity: 2,
//       price: 9.99
//     };
//     const orders = [
//       {
//         id: 1,
//         quantity: 3,
//         price: 9.99
//       },
//       {
//         id: 2,
//         quantity: 1,
//         price: 9.99
//       }
//     ];
//     const result = haveEnoughInventory(product.quantity,
//       orders.filter((p) => p.id === product.id)[0].quantity);
//     expect(result).toEqual(expectedResult);
//   });

//   it('returns true if the inventory can cover an order', () => {
//     const expectedResult = true;
//     const product = {
//       id: 1,
//       quantity: 1,
//       price: 9.99
//     };
//     const orders = [
//       {
//         id: 1,
//         quantity: 1,
//         price: 9.99
//       },
//       {
//         id: 2,
//         quantity: 1,
//         price: 9.99
//       }
//     ];
//     const result = haveEnoughInventory(product.quantity,
//       orders.filter((p) => p.id === product.id)[0].quantity);
//     expect(result).toEqual(expectedResult);
//   });
// });

// describe('validateOrder', () => {
//   const INVENTORY_QTY = 2;
//   const TEST_PRODUCT_ID = 1;
//   const PRICE = 9.99;

//   const product = {};
//   const orders = [
//     {
//     },
//     {
//     }
//   ];
//   beforeEach(() => {
//     // reset objects before each test
//     product.quantity = INVENTORY_QTY;
//     product.id = TEST_PRODUCT_ID;
//     product.price = PRICE;

//     orders[0].id = TEST_PRODUCT_ID;
//     orders[0].quantity = INVENTORY_QTY;
//     orders[0].price = PRICE;

//     orders[1].id = TEST_PRODUCT_ID + 1;
//     orders[1].quantity = INVENTORY_QTY + 1;
//     orders[1].price = PRICE + 1.00;
//   });

//   it('returns false if product has invalid id', () => {
//     const expectedResult = { valid: false, errors: [Constants.PRODUCT_MISSING_ID] };
//     product.id = null;
//     expect(validateOrder(product, orders)).toEqual(expectedResult);
//   });

//   it('returns false if order qty == inventory qty', () => {
//     const expectedResult = { valid: false, errors: [Constants.INSUFFICIENT_INVENTORY] };
//     expect(validateOrder(product, orders)).toEqual(expectedResult);
//   });

//   it('returns true if order qty is 1 less than inventory qty', () => {
//     orders.filter((p) => p.id === product.id)[0].quantity = (product.quantity - 1);
//     const expectedResult = { valid: true, errors: [] };
//     expect(validateOrder(product, orders)).toEqual(expectedResult);
//   });

//   it('returns true given an empty order array and qty is > 0', () => {
//     const emptyOrders = [];
//     const expectedResult = { valid: true, errors: [] };
//     expect(validateOrder(product, emptyOrders)).toEqual(expectedResult);
//   });

//   it('returns false givn an empty order array and inventory is 0', () => {
//     const emptyOrders = [];
//     product.quantity = 0;
//     const expectedResult = { valid: false, errors: [Constants.INSUFFICIENT_INVENTORY] };
//     expect(validateOrder(product, emptyOrders)).toEqual(expectedResult);
//   });
// });
