export function createUser() {
  const uniqueId = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

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
    email: `automation.${uniqueId}@example.com`,
    password: 'AutoTest#2026!x9',
  };
}
