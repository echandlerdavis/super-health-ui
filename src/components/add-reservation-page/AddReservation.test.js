import {
  validateNumberOfNights, validateCheckInDate, validateGuestEmail, getEmptyFields
} from './AddReservation';

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
