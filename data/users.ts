export function createUser() {
  return {
    first_name: 'Automation',
    last_name: 'Test',
    dob: '1990-01-01',
    address: ['Automation Street', '100'],
    postcode: '12345',
    city: 'Test City',
    state: 'Test State',
    country: 'BR',
    phone: '11999999999',
    email: `automation.${Date.now()}@example.com`,
    password: 'AutoTest#2026!x9',
  };
}
